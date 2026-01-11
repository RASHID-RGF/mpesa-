import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, CreditCard, X, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { BookingService, type StoredBooking } from '../lib/bookingService'
import { formatDate, formatPrice } from '../utils/formatters'
import { BookingStatus } from '../types/booking'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<StoredBooking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<StoredBooking | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  useEffect(() => {
    const loadedBookings = BookingService.getBookings()
    setBookings(loadedBookings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
  }, [])

  const handleCancelBooking = (bookingId: number) => {
    if (BookingService.cancelBooking(bookingId)) {
      setBookings(prev => prev.map(booking =>
        booking.bookingId === bookingId
          ? { ...booking, status: BookingStatus.CANCELLED }
          : booking
      ))
      setShowCancelConfirm(false)
      setSelectedBooking(null)
    }
  }

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return <CheckCircle size={20} className="text-green-600" />
      case BookingStatus.PENDING:
        return <Clock size={20} className="text-yellow-600" />
      case BookingStatus.CANCELLED:
        return <X size={20} className="text-red-600" />
      case BookingStatus.COMPLETED:
        return <CheckCircle size={20} className="text-blue-600" />
      default:
        return <AlertCircle size={20} className="text-gray-600" />
    }
  }

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return 'bg-green-100 text-green-800'
      case BookingStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800'
      case BookingStatus.CANCELLED:
        return 'bg-red-100 text-red-800'
      case BookingStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="heading-xl text-gray-900 mb-2">My Bookings</h1>
            <p className="body-lg text-gray-600">Manage your adventure bookings</p>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <h2 className="heading-md text-gray-900 mb-2">No bookings yet</h2>
              <p className="body-md text-gray-600 mb-6">Start planning your next adventure!</p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl font-semibold transition-all"
              >
                Explore Destinations
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bookings List */}
              <div className="lg:col-span-2 space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.bookingId}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="heading-md text-gray-900 mb-1">{booking.destination}</h3>
                        <div className="flex items-center gap-2 text-gray-600 body-sm">
                          <MapPin size={16} />
                          <span>{booking.destinationDetail.location}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="capitalize">{booking.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-orange-600" />
                        <div>
                          <div className="body-sm text-gray-600">Check-in</div>
                          <div className="font-semibold text-sm">{formatDate(booking.checkIn)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-orange-600" />
                        <div>
                          <div className="body-sm text-gray-600">Guests</div>
                          <div className="font-semibold text-sm">{booking.guests}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-orange-600" />
                        <div>
                          <div className="body-sm text-gray-600">Total</div>
                          <div className="font-semibold text-sm">{formatPrice(booking.totalAmount)}</div>
                        </div>
                      </div>
                      <div>
                        <div className="body-sm text-gray-600">Reference</div>
                        <div className="font-mono text-sm font-semibold text-orange-600">{booking.reference}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="body-sm text-gray-500">
                        Booked on {formatDate(booking.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Details Sidebar */}
              <div className="lg:col-span-1">
                {selectedBooking ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                    <h3 className="heading-md mb-6">Booking Details</h3>

                    <div className="space-y-4">
                      <div>
                        <div className="body-sm text-gray-600 mb-1">Destination</div>
                        <div className="font-semibold">{selectedBooking.destination}</div>
                        <div className="text-sm text-gray-600">{selectedBooking.destinationDetail.location}</div>
                      </div>

                      <div>
                        <div className="body-sm text-gray-600 mb-1">Booking Reference</div>
                        <div className="font-mono font-semibold text-orange-600">{selectedBooking.reference}</div>
                      </div>

                      <div>
                        <div className="body-sm text-gray-600 mb-1">Status</div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                          {getStatusIcon(selectedBooking.status)}
                          <span className="capitalize">{selectedBooking.status}</span>
                        </div>
                      </div>

                      <div>
                        <div className="body-sm text-gray-600 mb-1">Travel Dates</div>
                        <div className="font-semibold">
                          {formatDate(selectedBooking.checkIn)} - {formatDate(selectedBooking.checkOut)}
                        </div>
                      </div>

                      <div>
                        <div className="body-sm text-gray-600 mb-1">Guests</div>
                        <div className="font-semibold">
                          {selectedBooking.bookingData.adults} Adults
                          {selectedBooking.bookingData.children > 0 && `, ${selectedBooking.bookingData.children} Children`}
                        </div>
                      </div>

                      <div>
                        <div className="body-sm text-gray-600 mb-1">Package</div>
                        <div className="font-semibold capitalize">{selectedBooking.bookingData.selectedPackage}</div>
                      </div>

                      <div>
                        <div className="body-sm text-gray-600 mb-1">Payment Method</div>
                        <div className="font-semibold capitalize">{selectedBooking.paymentMethod.replace('_', ' ')}</div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="body-sm text-gray-600">Total Paid</span>
                          <span className="heading-sm text-orange-600">{formatPrice(selectedBooking.totalAmount)}</span>
                        </div>
                      </div>

                      {selectedBooking.status === BookingStatus.CONFIRMED && (
                        <button
                          onClick={() => setShowCancelConfirm(true)}
                          className="w-full mt-4 px-4 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24 text-center">
                    <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="body-md text-gray-600">Select a booking to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="heading-md mb-2">Cancel Booking?</h3>
              <p className="body-md text-gray-600 mb-6">
                Are you sure you want to cancel your booking for {selectedBooking.destination}?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => handleCancelBooking(selectedBooking.bookingId)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}