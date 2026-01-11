import { useState } from 'react'
import { FileText, Check, AlertCircle } from 'lucide-react'
import type { SigningData } from '../../../types/booking'

interface SigningAgreementProps {
  signingData: SigningData
  setSigningData: (data: SigningData) => void
  onNext: () => void
  onBack: () => void
}

export default function SigningAgreement({
  signingData,
  setSigningData,
  onNext,
  onBack
}: SigningAgreementProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCheckboxChange = (field: keyof SigningData, value: boolean) => {
    setSigningData({
      ...signingData,
      [field]: value
    })
    // Clear error when user checks the box
    if (value && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleNext = () => {
    const newErrors: Record<string, string> = {}

    if (!signingData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms and conditions'
    }
    if (!signingData.agreedToCancellationPolicy) {
      newErrors.agreedToCancellationPolicy = 'You must agree to the cancellation policy'
    }
    if (!signingData.agreedToPrivacyPolicy) {
      newErrors.agreedToPrivacyPolicy = 'You must agree to the privacy policy'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Set signed timestamp
    setSigningData({
      ...signingData,
      signedAt: new Date()
    })

    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="heading-md mb-2">Terms & Agreements</h3>
        <p className="body-md text-gray-600">
          Please review and agree to our terms before proceeding with your booking
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <FileText size={24} className="text-orange-600 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Terms and Conditions</h4>
            <div className="body-sm text-gray-700 space-y-2">
              <p>
                By booking with us, you agree to our standard terms and conditions for adventure travel packages.
                This includes acceptance of our liability limitations, travel insurance requirements, and code of conduct.
              </p>
              <p>
                All bookings are subject to availability and confirmation. Prices may change without notice.
                We reserve the right to cancel or modify itineraries due to unforeseen circumstances.
              </p>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={signingData.agreedToTerms}
            onChange={(e) => handleCheckboxChange('agreedToTerms', e.target.checked)}
            className="mt-1 w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <div className="flex-1">
            <span className="body-sm text-gray-700">
              I have read and agree to the{' '}
              <a href="#" className="text-orange-600 hover:underline">Terms and Conditions</a>
            </span>
            {errors.agreedToTerms && (
              <div className="flex items-center gap-1 mt-1">
                <AlertCircle size={14} className="text-red-600" />
                <span className="body-xs text-red-600">{errors.agreedToTerms}</span>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <FileText size={24} className="text-orange-600 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h4>
            <div className="body-sm text-gray-700 space-y-2">
              <p>
                <strong>Free cancellation:</strong> Up to 30 days before departure
              </p>
              <p>
                <strong>50% cancellation fee:</strong> 15-29 days before departure
              </p>
              <p>
                <strong>100% cancellation fee:</strong> Less than 15 days before departure
              </p>
              <p>
                No refunds for no-shows or early departures. Travel insurance is highly recommended.
              </p>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={signingData.agreedToCancellationPolicy}
            onChange={(e) => handleCheckboxChange('agreedToCancellationPolicy', e.target.checked)}
            className="mt-1 w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <div className="flex-1">
            <span className="body-sm text-gray-700">
              I understand and accept the{' '}
              <a href="#" className="text-orange-600 hover:underline">Cancellation Policy</a>
            </span>
            {errors.agreedToCancellationPolicy && (
              <div className="flex items-center gap-1 mt-1">
                <AlertCircle size={14} className="text-red-600" />
                <span className="body-xs text-red-600">{errors.agreedToCancellationPolicy}</span>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Privacy Policy */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <FileText size={24} className="text-orange-600 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Privacy Policy</h4>
            <div className="body-sm text-gray-700 space-y-2">
              <p>
                We collect personal information to process your booking and provide travel services.
                Your data is protected under Kenyan data protection laws and our privacy policy.
              </p>
              <p>
                We may share necessary information with service providers, airlines, and hotels.
                Your information will not be sold to third parties for marketing purposes.
              </p>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={signingData.agreedToPrivacyPolicy}
            onChange={(e) => handleCheckboxChange('agreedToPrivacyPolicy', e.target.checked)}
            className="mt-1 w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <div className="flex-1">
            <span className="body-sm text-gray-700">
              I have read and agree to the{' '}
              <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
            </span>
            {errors.agreedToPrivacyPolicy && (
              <div className="flex items-center gap-1 mt-1">
                <AlertCircle size={14} className="text-red-600" />
                <span className="body-xs text-red-600">{errors.agreedToPrivacyPolicy}</span>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Digital Signature */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Check size={20} className="text-blue-600" />
          <h4 className="font-semibold text-blue-900">Digital Agreement</h4>
        </div>
        <p className="body-sm text-blue-800">
          By checking the boxes above and proceeding, you are electronically signing this agreement.
          This has the same legal effect as a handwritten signature.
        </p>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 font-semibold transition-all"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  )
}