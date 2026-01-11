import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, MapPin, Clock, Calendar, TrendingUp, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageGallery from '../components/destination/ImageGallery'
import ReviewsList from '../components/destination/ReviewsList'
import BookingModal from '../components/booking/BookingModal'
import { mockDestinationDetails, mockReviews } from '../data/destinationDetailMockData'
import { formatPrice } from '../utils/formatters'

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const destination = id ? mockDestinationDetails[parseInt(id)] : null

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-xl mb-4">Destination Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl"
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation />
      
      {/* Hero Section with Image Gallery */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span className="body-md font-semibold">Back to Destinations</span>
          </button>

          <ImageGallery images={destination.images} alt={destination.name} />

          {/* Destination Header */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin size={20} className="text-orange-600" />
                  <span className="body-md">{destination.location}</span>
                </div>
                <h1 className="heading-xl text-gray-900 mb-4">{destination.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star size={20} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span className="text-gray-600">({destination.reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{destination.category}</span>
                </div>
                <p className="body-lg text-gray-700 leading-relaxed">{destination.longDescription}</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Clock size={24} className="text-orange-600 mb-2" />
                  <div className="body-sm text-gray-600">Duration</div>
                  <div className="font-semibold">{destination.duration}</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <TrendingUp size={24} className="text-orange-600 mb-2" />
                  <div className="body-sm text-gray-600">Difficulty</div>
                  <div className="font-semibold">{destination.difficulty}</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Calendar size={24} className="text-orange-600 mb-2" />
                  <div className="body-sm text-gray-600">Best Time</div>
                  <div className="font-semibold">{destination.bestTime}</div>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="heading-md mb-4">What's Included</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="body-md text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="heading-md mb-6">Itinerary</h2>
                <div className="space-y-6">
                  {destination.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-orange-600">D{day.day}</span>
                      </div>
                      <div>
                        <h3 className="heading-sm mb-2">{day.title}</h3>
                        <p className="body-md text-gray-600">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to Bring */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="heading-md mb-4">What to Bring</h2>
                <div className="flex flex-wrap gap-2">
                  {destination.whatToBring.map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full body-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <ReviewsList reviews={mockReviews} />
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="heading-lg text-orange-600">{formatPrice(destination.price)}</span>
                    <span className="text-gray-600 body-sm">per person</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 body-sm">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span>({destination.reviewCount} reviews)</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg mb-4"
                >
                  Book Now
                </button>

                <p className="text-center body-sm text-gray-600">
                  Free cancellation up to 48 hours before departure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        destination={destination}
      />
    </div>
  )
}