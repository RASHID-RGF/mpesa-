import type { BookingData, DestinationDetail, PaymentData, SigningData, BookingConfirmation } from '../types/booking'
import { BookingStatus } from '../types/booking'
import { mockPackages } from '../data/destinationDetailMockData'

export interface StoredBooking extends BookingConfirmation {
  destinationDetail: DestinationDetail
  bookingData: BookingData
  paymentData: PaymentData
  signingData: SigningData
  createdAt: Date
}

const BOOKINGS_KEY = 'booking_app_bookings'

export class BookingService {
  static saveBooking(
    destination: DestinationDetail,
    bookingData: BookingData,
    paymentData: PaymentData,
    signingData: SigningData
  ): StoredBooking {
    const bookingId = Math.floor(Math.random() * 900000) + 100000
    const reference = `BK${bookingId.toString().padStart(6, '0')}`

    const selectedPackage = mockPackages.find(p => p.type === bookingData.selectedPackage)
    const basePrice = selectedPackage?.price || destination.price
    const totalGuests = bookingData.adults + bookingData.children
    const totalAmount = basePrice * totalGuests * 1.15 // Including fees and taxes

    const booking: StoredBooking = {
      bookingId,
      reference,
      status: BookingStatus.CONFIRMED,
      destination: destination.name,
      checkIn: bookingData.checkInDate!,
      checkOut: bookingData.checkOutDate!,
      guests: totalGuests,
      totalAmount,
      paymentMethod: paymentData.selectedMethod,
      destinationDetail: destination,
      bookingData,
      paymentData,
      signingData,
      createdAt: new Date()
    }

    const existingBookings = this.getBookings()
    existingBookings.push(booking)
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(existingBookings))

    return booking
  }

  static getBookings(): StoredBooking[] {
    try {
      const stored = localStorage.getItem(BOOKINGS_KEY)
      if (!stored) return []

      const bookings = JSON.parse(stored)
      // Convert date strings back to Date objects
      return bookings.map((booking: any) => ({
        ...booking,
        checkIn: new Date(booking.checkIn),
        checkOut: new Date(booking.checkOut),
        createdAt: new Date(booking.createdAt),
        bookingData: {
          ...booking.bookingData,
          checkInDate: booking.bookingData.checkInDate ? new Date(booking.bookingData.checkInDate) : null,
          checkOutDate: booking.bookingData.checkOutDate ? new Date(booking.bookingData.checkOutDate) : null
        }
      }))
    } catch (error) {
      console.error('Error loading bookings:', error)
      return []
    }
  }

  static getBookingById(bookingId: number): StoredBooking | null {
    const bookings = this.getBookings()
    return bookings.find(booking => booking.bookingId === bookingId) || null
  }

  static cancelBooking(bookingId: number): boolean {
    const bookings = this.getBookings()
    const bookingIndex = bookings.findIndex(booking => booking.bookingId === bookingId)

    if (bookingIndex === -1) return false

    bookings[bookingIndex].status = BookingStatus.CANCELLED
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
    return true
  }
}