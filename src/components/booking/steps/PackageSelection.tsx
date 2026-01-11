import { Check } from 'lucide-react'
import type { BookingData } from '../../../types/booking'
import { PackageType } from '../../../types/booking'
import { mockPackages } from '../../../data/destinationDetailMockData'
import { formatPrice } from '../../../utils/formatters'
import { cn } from '../../../lib/utils'

interface PackageSelectionProps {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  onNext: () => void
  onBack: () => void
}

export default function PackageSelection({ bookingData, setBookingData, onNext, onBack }: PackageSelectionProps) {
  const handleSelectPackage = (packageType: PackageType) => {
    setBookingData({
      ...bookingData,
      selectedPackage: packageType
    })
  }

  const handleContinue = () => {
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="heading-md mb-2">Choose Your Package</h3>
        <p className="body-md text-gray-600">Select the package that best suits your needs</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockPackages.map((pkg) => (
          <div
            key={pkg.type}
            onClick={() => handleSelectPackage(pkg.type)}
            className={cn(
              'relative border-2 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg',
              bookingData.selectedPackage === pkg.type
                ? 'border-orange-600 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="heading-sm">{pkg.name}</h4>
                  {bookingData.selectedPackage === pkg.type && (
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="heading-md text-orange-600 mb-4">{formatPrice(pkg.price)}</div>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 body-sm text-gray-700">
                      <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
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