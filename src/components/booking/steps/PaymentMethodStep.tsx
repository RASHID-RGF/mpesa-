import { useState } from 'react'
import { Smartphone, Building2, CreditCard, Check } from 'lucide-react'
import type { PaymentData, BookingData, DestinationDetail } from '../../../types/booking'
import { PaymentMethod, KenyanBank } from '../../../types/booking'
import { cn } from '../../../lib/utils'
import MpesaPaymentModal from '../MpesaPaymentModal'

interface PaymentMethodStepProps {
  paymentData: PaymentData
  setPaymentData: (data: PaymentData) => void
  onConfirm: () => void
  onBack: () => void
  bookingData: BookingData
  destination: DestinationDetail
}

const kenyanBanks = [
  { id: KenyanBank.EQUITY, name: 'Equity Bank', account: '0123456789' },
  { id: KenyanBank.KCB, name: 'KCB Bank', account: '1234567890' },
  { id: KenyanBank.COOPERATIVE, name: 'Co-operative Bank', account: '2345678901' },
  { id: KenyanBank.NCBA, name: 'NCBA Bank', account: '3456789012' },
  { id: KenyanBank.STANBIC, name: 'Stanbic Bank', account: '4567890123' },
  { id: KenyanBank.STANDARD_CHARTERED, name: 'Standard Chartered', account: '5678901234' }
]

export default function PaymentMethodStep({ 
  paymentData, 
  setPaymentData, 
  onConfirm, 
  onBack,
  bookingData,
  destination 
}: PaymentMethodStepProps) {
  const [mpesaNumber, setMpesaNumber] = useState(paymentData.mpesaNumber || '')
  const [selectedBank, setSelectedBank] = useState(paymentData.selectedBank)
  const [cardDetails, setCardDetails] = useState(paymentData.cardDetails || {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showMpesaModal, setShowMpesaModal] = useState(false)

  const handleMethodChange = (method: PaymentMethod) => {
    setPaymentData({ ...paymentData, selectedMethod: method })
    setErrors({})
  }

  const validateMpesa = () => {
    const phoneRegex = /^(\+254|0)[17]\d{8}$/
    if (!phoneRegex.test(mpesaNumber.replace(/\s/g, ''))) {
      setErrors({ mpesa: 'Please enter a valid M-Pesa number' })
      return false
    }
    return true
  }

  const validateCard = () => {
    const newErrors: Record<string, string> = {}
    if (cardDetails.number.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Expiry must be MM/YY format'
    }
    if (cardDetails.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits'
    }
    if (!cardDetails.name.trim()) {
      newErrors.name = 'Cardholder name is required'
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }
    return true
  }

  const handleMpesaSuccess = (receiptNumber?: string) => {
    setShowMpesaModal(false)
    setPaymentData({
      ...paymentData,
      mpesaNumber,
      mpesaReceiptNumber: receiptNumber
    })
    onConfirm()
  }

  const handleMpesaCancel = () => {
    setShowMpesaModal(false)
  }

  const handleMpesaError = (error: string) => {
    setShowMpesaModal(false)
    setErrors({ mpesa: error })
  }

  const handleConfirm = () => {
    if (paymentData.selectedMethod === PaymentMethod.MPESA) {
      if (!validateMpesa()) return
      setPaymentData({ ...paymentData, mpesaNumber })
      setShowMpesaModal(true)
    } else if (paymentData.selectedMethod === PaymentMethod.BANK_TRANSFER) {
      if (!selectedBank) {
        setErrors({ bank: 'Please select a bank' })
        return
      }
      setPaymentData({ ...paymentData, selectedBank })
      onConfirm()
    } else if (paymentData.selectedMethod === PaymentMethod.CARD) {
      if (!validateCard()) return
      setPaymentData({ ...paymentData, cardDetails })
      onConfirm()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="heading-md mb-2">Payment Method</h3>
        <p className="body-md text-gray-600">Choose how you'd like to pay</p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        {/* M-Pesa */}
        <div
          onClick={() => handleMethodChange(PaymentMethod.MPESA)}
          className={cn(
            'border-2 rounded-xl p-4 cursor-pointer transition-all',
            paymentData.selectedMethod === PaymentMethod.MPESA
              ? 'border-orange-600 bg-orange-50'
              : 'border-gray-200 hover:border-orange-300'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Smartphone size={24} className="text-green-600" />
              </div>
              <div>
                <div className="font-semibold">M-Pesa</div>
                <div className="body-sm text-gray-600">Pay with mobile money</div>
              </div>
            </div>
            {paymentData.selectedMethod === PaymentMethod.MPESA && (
              <Check size={24} className="text-orange-600" />
            )}
          </div>
        </div>

        {/* Bank Transfer */}
        <div
          onClick={() => handleMethodChange(PaymentMethod.BANK_TRANSFER)}
          className={cn(
            'border-2 rounded-xl p-4 cursor-pointer transition-all',
            paymentData.selectedMethod === PaymentMethod.BANK_TRANSFER
              ? 'border-orange-600 bg-orange-50'
              : 'border-gray-200 hover:border-orange-300'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 size={24} className="text-blue-600" />
              </div>
              <div>
                <div className="font-semibold">Bank Transfer</div>
                <div className="body-sm text-gray-600">Transfer from your bank</div>
              </div>
            </div>
            {paymentData.selectedMethod === PaymentMethod.BANK_TRANSFER && (
              <Check size={24} className="text-orange-600" />
            )}
          </div>
        </div>

        {/* Card Payment */}
        <div
          onClick={() => handleMethodChange(PaymentMethod.CARD)}
          className={cn(
            'border-2 rounded-xl p-4 cursor-pointer transition-all',
            paymentData.selectedMethod === PaymentMethod.CARD
              ? 'border-orange-600 bg-orange-50'
              : 'border-gray-200 hover:border-orange-300'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard size={24} className="text-purple-600" />
              </div>
              <div>
                <div className="font-semibold">Credit/Debit Card</div>
                <div className="body-sm text-gray-600">Pay with card</div>
              </div>
            </div>
            {paymentData.selectedMethod === PaymentMethod.CARD && (
              <Check size={24} className="text-orange-600" />
            )}
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 rounded-xl p-6">
        {paymentData.selectedMethod === PaymentMethod.MPESA && (
          <div>
            <label className="block body-sm font-semibold text-gray-700 mb-2">
              M-Pesa Phone Number
            </label>
            <input
              type="tel"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              placeholder="+254 712 345 678"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.mpesa && <p className="text-red-600 body-sm mt-1">{errors.mpesa}</p>}
            <p className="body-sm text-gray-600 mt-2">
              You'll receive an STK push notification to complete the payment
            </p>
          </div>
        )}

        {paymentData.selectedMethod === PaymentMethod.BANK_TRANSFER && (
          <div>
            <label className="block body-sm font-semibold text-gray-700 mb-3">
              Select Your Bank
            </label>
            <div className="space-y-2">
              {kenyanBanks.map((bank) => (
                <div
                  key={bank.id}
                  onClick={() => setSelectedBank(bank.id)}
                  className={cn(
                    'border-2 rounded-lg p-3 cursor-pointer transition-all',
                    selectedBank === bank.id
                      ? 'border-orange-600 bg-white'
                      : 'border-gray-200 hover:border-orange-300'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{bank.name}</div>
                      <div className="body-sm text-gray-600">Account: {bank.account}</div>
                    </div>
                    {selectedBank === bank.id && (
                      <Check size={20} className="text-orange-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.bank && <p className="text-red-600 body-sm mt-2">{errors.bank}</p>}
          </div>
        )}

        {paymentData.selectedMethod === PaymentMethod.CARD && (
          <div className="space-y-4">
            <div>
              <label className="block body-sm font-semibold text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim() })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.cardNumber && <p className="text-red-600 body-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block body-sm font-semibold text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.expiry && <p className="text-red-600 body-sm mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <label className="block body-sm font-semibold text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.cvv && <p className="text-red-600 body-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
            <div>
              <label className="block body-sm font-semibold text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                placeholder="JOHN DOE"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.name && <p className="text-red-600 body-sm mt-1">{errors.name}</p>}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 font-semibold transition-all"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
        >
          Confirm Booking
        </button>
      </div>

      {/* M-Pesa Payment Modal */}
      {bookingData && destination && (
        <MpesaPaymentModal
          isOpen={showMpesaModal}
          phoneNumber={mpesaNumber}
          amount={(() => {
            const totalGuests = bookingData.adults + bookingData.children
            return destination.price * totalGuests * 1.15
          })()}
          onSuccess={handleMpesaSuccess}
          onCancel={handleMpesaCancel}
          onError={handleMpesaError}
        />
      )}
    </div>
  )
}