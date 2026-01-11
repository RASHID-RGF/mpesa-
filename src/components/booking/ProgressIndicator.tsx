import { Calendar, Users, Package, FileText, CreditCard } from 'lucide-react'
import { BookingStep } from '../../types/booking'
import { cn } from '../../lib/utils'

interface ProgressIndicatorProps {
  currentStep: BookingStep
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { id: BookingStep.DATES, label: 'Dates', icon: Calendar },
    { id: BookingStep.GUESTS, label: 'Guests', icon: Users },
    { id: BookingStep.PACKAGE, label: 'Package', icon: Package },
    { id: BookingStep.SIGNING, label: 'Agreement', icon: FileText },
    { id: BookingStep.PAYMENT, label: 'Payment', icon: CreditCard }
  ]

  const currentIndex = steps.findIndex(s => s.id === currentStep)

  return (
    <div className="px-6 py-4 bg-gray-50">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === currentIndex
          const isCompleted = index < currentIndex

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    isActive && 'bg-orange-600 text-white ring-4 ring-orange-200',
                    isCompleted && 'bg-green-600 text-white',
                    !isActive && !isCompleted && 'bg-gray-200 text-gray-500'
                  )}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium',
                    isActive && 'text-orange-600',
                    isCompleted && 'text-green-600',
                    !isActive && !isCompleted && 'text-gray-500'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 rounded transition-all',
                    isCompleted ? 'bg-green-600' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}