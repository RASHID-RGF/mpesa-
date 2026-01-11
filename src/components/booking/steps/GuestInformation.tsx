import { useState } from 'react'
import { Users, Mail, Phone, MessageSquare } from 'lucide-react'
import type { BookingData } from '../../../types/booking'

interface GuestInformationProps {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  onNext: () => void
  onBack: () => void
}

export default function GuestInformation({ bookingData, setBookingData, onNext, onBack }: GuestInformationProps) {
  const [formData, setFormData] = useState(bookingData.guestInfo)
  const [adults, setAdults] = useState(bookingData.adults)
  const [children, setChildren] = useState(bookingData.children)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+254|0)[17]\d{8}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const handleContinue = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Kenyan phone number'
    }
    if (adults < 1) {
      newErrors.adults = 'At least one adult is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setBookingData({
      ...bookingData,
      adults,
      children,
      guestInfo: formData
    })
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="heading-md mb-2">Guest Information</h3>
        <p className="body-md text-gray-600">Please provide your contact details</p>
      </div>

      {/* Number of Guests */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} className="text-orange-600" />
          <span className="font-semibold">Number of Guests</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block body-sm text-gray-700 mb-2">Adults</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold">{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block body-sm text-gray-700 mb-2">Children</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold">{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
        {errors.adults && <p className="text-red-600 body-sm mt-2">{errors.adults}</p>}
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div>
          <label className="block body-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.fullName && <p className="text-red-600 body-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block body-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {errors.email && <p className="text-red-600 body-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block body-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+254 712 345 678"
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {errors.phone && <p className="text-red-600 body-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block body-sm font-semibold text-gray-700 mb-2">
            Special Requests (Optional)
          </label>
          <div className="relative">
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Any dietary requirements, accessibility needs, etc."
              rows={4}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 font-semibold transition-all"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
        >
          Continue
        </button>
      </div>
    </div>
  )
}