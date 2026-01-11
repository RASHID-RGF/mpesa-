import { CheckCircle, Download, Calendar, Users, Package } from 'lucide-react'
import type { DestinationDetail, BookingData, PaymentData } from '../../../types/booking'
import { BookingStatus } from '../../../types/booking'
import { formatDate, formatPrice } from '../../../utils/formatters'
import { mockPackages } from '../../../data/destinationDetailMockData'
import { BookingService } from '../../../lib/bookingService'

interface BookingConfirmationProps {
  destination: DestinationDetail
  bookingData: BookingData
  paymentData: PaymentData
  onClose: () => void
  bookingReference?: string
}

export default function BookingConfirmation({
  destination,
  bookingData,
  paymentData,
  onClose,
  bookingReference
}: BookingConfirmationProps) {
  // Use provided booking reference or create local booking
  const savedBooking = bookingReference
    ? {
        bookingId: Math.floor(Math.random() * 900000) + 100000,
        reference: bookingReference,
        status: BookingStatus.CONFIRMED,
        destination: destination.name,
        checkIn: bookingData.checkInDate!,
        checkOut: bookingData.checkOutDate!,
        guests: bookingData.adults + bookingData.children,
        totalAmount: (() => {
          const selectedPackage = mockPackages.find(p => p.type === bookingData.selectedPackage)
          const basePrice = selectedPackage?.price || destination.price
          const totalGuests = bookingData.adults + bookingData.children
          return basePrice * totalGuests * 1.15
        })(),
        paymentMethod: paymentData.selectedMethod,
        destinationDetail: destination,
        bookingData,
        paymentData,
        signingData: {
          agreedToTerms: true,
          agreedToCancellationPolicy: true,
          agreedToPrivacyPolicy: true,
          signedAt: new Date()
        },
        createdAt: new Date()
      }
    : BookingService.saveBooking(destination, bookingData, paymentData, {
        agreedToTerms: true,
        agreedToCancellationPolicy: true,
        agreedToPrivacyPolicy: true,
        signedAt: new Date()
      })

  const selectedPackage = mockPackages.find(p => p.type === bookingData.selectedPackage)
  const totalGuests = bookingData.adults + bookingData.children
  const basePrice = selectedPackage?.price || destination.price
  const total = basePrice * totalGuests * 1.15 // Including fees and taxes

  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle size={48} className="text-green-600" />
        </div>
      </div>

      <div>
        <h2 className="heading-xl text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="body-lg text-gray-600">
          Your adventure to {destination.name} is all set
        </p>
      </div>

      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
        <div className="body-sm text-orange-800 mb-2">Booking Reference</div>
        <div className="heading-lg text-orange-600 font-mono">{savedBooking.reference}</div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4">
        <h3 className="heading-sm mb-4">Booking Details</h3>
        
        <div className="flex items-start gap-3">
          <Calendar size={20} className="text-orange-600 mt-1" />
          <div>
            <div className="body-sm text-gray-600">Dates</div>
            <div className="font-semibold">
              {bookingData.checkInDate && bookingData.checkOutDate &&
                `${formatDate(bookingData.checkInDate)} - ${formatDate(bookingData.checkOutDate)}`
              }
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users size={20} className="text-orange-600 mt-1" />
          <div>
            <div className="body-sm text-gray-600">Guests</div>
            <div className="font-semibold">
              {bookingData.adults} {bookingData.adults === 1 ? 'Adult' : 'Adults'}
              {bookingData.children > 0 && `, ${bookingData.children} ${bookingData.children === 1 ? 'Child' : 'Children'}`}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Package size={20} className="text-orange-600 mt-1" />
          <div>
            <div className="body-sm text-gray-600">Package</div>
            <div className="font-semibold">{selectedPackage?.name}</div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="heading-sm">Total Paid</span>
            <span className="heading-md text-orange-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="body-sm text-blue-800">
          A confirmation email has been sent to <strong>{bookingData.guestInfo.email}</strong>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all">
          <Download size={20} />
          Download Receipt
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl font-semibold transition-all"
        >
          Close
        </button>
      </div>
    </div>
  )
}