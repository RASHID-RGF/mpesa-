import { useState, useEffect } from 'react'
import { Smartphone, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { MpesaApiClient } from '../../lib/mpesaApiClient'

interface MpesaPaymentModalProps {
  isOpen: boolean
  phoneNumber: string
  amount: number
  accountReference?: string
  transactionDesc?: string
  onSuccess: (receiptNumber?: string, checkoutRequestId?: string) => void
  onCancel: () => void
  onError: (error: string) => void
}

export default function MpesaPaymentModal({
  isOpen,
  phoneNumber,
  amount,
  accountReference = 'Booking Payment',
  transactionDesc = 'Payment for booking',
  onSuccess,
  onCancel,
  onError
}: MpesaPaymentModalProps) {
  const [status, setStatus] = useState<'initiating' | 'pending' | 'success' | 'failed' | 'cancelled'>('initiating')
  const [message, setMessage] = useState('Initiating payment...')
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    if (!isOpen) return

    // Reset state when modal opens
    setStatus('initiating')
    setMessage('Initiating payment...')
    setCountdown(60)

    // Initiate payment with backend API
    const initiatePayment = async () => {
      try {
        setStatus('initiating')
        setMessage('Initiating payment...')

        // Call backend API to initiate STK Push
        const result = await MpesaApiClient.initiateSTKPush({
          phoneNumber,
          amount,
          accountReference,
          transactionDesc
        })

        if (!result.success) {
          throw new Error(result.error || 'Failed to initiate payment')
        }

        const checkoutRequestId = result.checkoutRequestId!
        
        setStatus('pending')
        setMessage('Check your phone for M-Pesa prompt')
        
        // Start countdown
        const countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval)
              return 0
            }
            return prev - 1
          })
        }, 1000)

        // Poll for payment status
        try {
          const queryResult = await MpesaApiClient.pollTransactionStatus(checkoutRequestId, 20, 3000)
          
          clearInterval(countdownInterval)
          
          if (queryResult.resultCode === '0') {
            setStatus('success')
            setMessage('Payment completed successfully!')
            
            // Get transaction details to retrieve receipt number
            const details = await MpesaApiClient.getTransactionDetails(checkoutRequestId)
            
            setTimeout(() => {
              onSuccess(details.transaction?.mpesaReceiptNumber, checkoutRequestId)
            }, 1500)
          } else {
            throw new Error(queryResult.resultDesc || 'Payment failed')
          }
        } catch (pollError) {
          clearInterval(countdownInterval)
          throw pollError
        }

      } catch (error) {
        setStatus('failed')
        const errorMessage = error instanceof Error ? error.message : 'Payment failed'
        setMessage(errorMessage)
        onError(errorMessage)
      }
    }

    initiatePayment()
  }, [isOpen, phoneNumber, amount, onSuccess, onError])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            {status === 'initiating' || status === 'pending' ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Loader2 size={40} className="text-green-600 animate-spin" />
              </div>
            ) : status === 'success' ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={40} className="text-green-600" />
              </div>
            ) : status === 'failed' ? (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle size={40} className="text-red-600" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle size={40} className="text-yellow-600" />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <h3 className="heading-lg text-gray-900 mb-2">
              {status === 'initiating' && 'Processing Payment'}
              {status === 'pending' && 'M-Pesa Payment'}
              {status === 'success' && 'Payment Successful!'}
              {status === 'failed' && 'Payment Failed'}
              {status === 'cancelled' && 'Payment Cancelled'}
            </h3>
            <p className="body-md text-gray-600">{message}</p>
          </div>

          {/* Phone Animation */}
          {status === 'pending' && (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Smartphone size={24} className="text-green-600 animate-bounce" />
                <span className="font-semibold text-green-800">{phoneNumber}</span>
              </div>
              <div className="space-y-2">
                <div className="body-sm text-green-700">
                  1. Enter your M-Pesa PIN
                </div>
                <div className="body-sm text-green-700">
                  2. Confirm the payment
                </div>
              </div>
              {countdown > 0 && (
                <div className="mt-4 text-gray-600 body-sm">
                  Time remaining: {countdown}s
                </div>
              )}
            </div>
          )}

          {/* Amount Display */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="body-sm text-gray-600 mb-1">Amount to Pay</div>
            <div className="heading-xl text-orange-600">
              KSh {amount.toLocaleString()}
            </div>
          </div>

          {/* Actions */}
          {status === 'pending' && (
            <button
              onClick={onCancel}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel Payment
            </button>
          )}

          {(status === 'failed' || status === 'cancelled') && (
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setStatus('initiating')
                  setMessage('Initiating payment...')
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-600 transition-all"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}