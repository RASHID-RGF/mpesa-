import { useState } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import type { BookingData } from '../../../types/booking'

interface DateSelectionProps {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  onNext: () => void
}

export default function DateSelection({ bookingData, setBookingData, onNext }: DateSelectionProps) {
  const [checkIn, setCheckIn] = useState(bookingData.checkInDate || new Date())
  const [checkOut, setCheckOut] = useState(bookingData.checkOutDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000))

  const handleContinue = () => {
    setBookingData({
      ...bookingData,
      checkInDate: checkIn,
      checkOutDate: checkOut
    })
    onNext()
  }

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const minCheckOut = new Date(checkIn)
  minCheckOut.setDate(minCheckOut.getDate() + 1)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="heading-md mb-2">Select Your Dates</h3>
        <p className="body-md text-gray-600">Choose your check-in and check-out dates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block body-sm font-semibold text-gray-700 mb-2">
            Check-in Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={formatDateForInput(checkIn)}
              onChange={(e) => setCheckIn(new Date(e.target.value))}
              min={formatDateForInput(new Date())}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div>
          <label className="block body-sm font-semibold text-gray-700 mb-2">
            Check-out Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={formatDateForInput(checkOut)}
              onChange={(e) => setCheckOut(new Date(e.target.value))}
              min={formatDateForInput(minCheckOut)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="body-sm text-blue-800">
          <strong>Note:</strong> Minimum stay is 2 nights. Free cancellation up to 48 hours before check-in.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!checkIn || !checkOut}
          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  )
}