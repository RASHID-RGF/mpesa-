import { useState } from 'react'
import { X } from 'lucide-react'
import type { DestinationDetail, BookingData, PaymentData, SigningData } from '../../types/booking'
import { BookingStep, PackageType, PaymentMethod } from '../../types/booking'
import DateSelection from './steps/DateSelection'
import GuestInformation from './steps/GuestInformation'
import PackageSelection from './steps/PackageSelection'
import SigningAgreement from './steps/SigningAgreement'
import PaymentMethodStep from './steps/PaymentMethodStep'
import BookingConfirmation from './steps/BookingConfirmation'
import ProgressIndicator from './ProgressIndicator'
import PriceBreakdown from './PriceBreakdown'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  destination: DestinationDetail
}

export default function BookingModal({ isOpen, onClose, destination }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.DATES)
  const [bookingData, setBookingData] = useState<BookingData>({
    checkInDate: null,
    checkOutDate: null,
    adults: 2,
    children: 0,
    selectedPackage: PackageType.STANDARD,
    guestInfo: {
      fullName: '',
      email: '',
      phone: '',
      specialRequests: ''
    }
  })
  const [paymentData, setPaymentData] = useState<PaymentData>({
    selectedMethod: PaymentMethod.MPESA
  })
  const [signingData, setSigningData] = useState<SigningData>({
    agreedToTerms: false,
    agreedToCancellationPolicy: false,
    agreedToPrivacyPolicy: false
  })
  const [, setBookingConfirmed] = useState(false)
  const [bookingReference, setBookingReference] = useState<string>()

  if (!isOpen) return null

  const steps = [
    BookingStep.DATES,
    BookingStep.GUESTS,
    BookingStep.PACKAGE,
    BookingStep.SIGNING,
    BookingStep.PAYMENT,
    BookingStep.CONFIRMATION
  ]

  const currentStepIndex = steps.indexOf(currentStep)

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex])
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex])
    }
  }

  const handleConfirmBooking = (reference?: string) => {
    if (reference) {
      setBookingReference(reference)
    }
    setBookingConfirmed(true)
    setCurrentStep(BookingStep.CONFIRMATION)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="heading-lg text-gray-900">{destination.name}</h2>
            <p className="body-sm text-gray-600">{destination.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicator */}
        {currentStep !== BookingStep.CONFIRMATION && (
          <ProgressIndicator currentStep={currentStep} />
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === BookingStep.DATES && (
                <DateSelection
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onNext={handleNext}
                />
              )}
              {currentStep === BookingStep.GUESTS && (
                <GuestInformation
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === BookingStep.PACKAGE && (
                <PackageSelection
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === BookingStep.SIGNING && (
                <SigningAgreement
                  signingData={signingData}
                  setSigningData={setSigningData}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === BookingStep.PAYMENT && (
                <PaymentMethodStep
                  paymentData={paymentData}
                  setPaymentData={setPaymentData}
                  onConfirm={handleConfirmBooking}
                  onBack={handleBack}
                  bookingData={bookingData}
                  destination={destination}
                />
              )}
              {currentStep === BookingStep.CONFIRMATION && (
                <BookingConfirmation
                  destination={destination}
                  bookingData={bookingData}
                  paymentData={paymentData}
                  onClose={onClose}
                  bookingReference={bookingReference}
                />
              )}
            </div>

            {/* Price Breakdown Sidebar */}
            {currentStep !== BookingStep.CONFIRMATION && (
              <div className="lg:col-span-1">
                <PriceBreakdown
                  destination={destination}
                  bookingData={bookingData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}