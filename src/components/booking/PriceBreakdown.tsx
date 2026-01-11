import type { DestinationDetail, BookingData } from '../../types/booking'
import { mockPackages } from '../../data/destinationDetailMockData'
import { formatPrice } from '../../utils/formatters'

interface PriceBreakdownProps {
  destination: DestinationDetail
  bookingData: BookingData
}

export default function PriceBreakdown({ destination, bookingData }: PriceBreakdownProps) {
  const selectedPackage = mockPackages.find(p => p.type === bookingData.selectedPackage)
  const basePrice = selectedPackage?.price || destination.price
  const totalGuests = bookingData.adults + bookingData.children
  const subtotal = basePrice * totalGuests
  const serviceFee = subtotal * 0.1
  const taxes = subtotal * 0.05
  const total = subtotal + serviceFee + taxes

  const nights = bookingData.checkInDate && bookingData.checkOutDate
    ? Math.ceil((bookingData.checkOutDate.getTime() - bookingData.checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    : 3

  return (
    <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
      <h3 className="heading-sm mb-4">Price Breakdown</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between body-md">
          <span className="text-gray-600">
            {formatPrice(basePrice)} x {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
          </span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        
        {nights > 0 && (
          <div className="flex justify-between body-sm text-gray-600">
            <span>{nights} {nights === 1 ? 'night' : 'nights'}</span>
          </div>
        )}
        
        <div className="flex justify-between body-md">
          <span className="text-gray-600">Service fee</span>
          <span className="font-semibold">{formatPrice(serviceFee)}</span>
        </div>
        
        <div className="flex justify-between body-md">
          <span className="text-gray-600">Taxes</span>
          <span className="font-semibold">{formatPrice(taxes)}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-300 pt-4">
        <div className="flex justify-between items-center">
          <span className="heading-sm">Total</span>
          <span className="heading-md text-orange-600">{formatPrice(total)}</span>
        </div>
      </div>

      {selectedPackage && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <div className="body-sm font-semibold text-orange-900 mb-2">{selectedPackage.name}</div>
          <ul className="space-y-1">
            {selectedPackage.features.map((feature, index) => (
              <li key={index} className="body-sm text-orange-700 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}