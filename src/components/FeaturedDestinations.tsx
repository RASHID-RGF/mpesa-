import { Heart, Star, MapPin } from 'lucide-react'
import { destinations } from '../data/destinations'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'

export default function FeaturedDestinations() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<number[]>([])
  const featuredDestinations = destinations.filter(d => d.featured)
  const allDestinations = destinations

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-gray-900 mb-4">Featured Destinations</h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of Kenya's most breathtaking locations
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className={cn(
                "group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105",
                index === 0 && "lg:col-span-2 lg:row-span-2",
                index === 2 && "lg:row-span-2"
              )}
            >
              {/* Image with Enhanced Hover Effect */}
              <div className="relative h-full min-h-[400px] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.imageAlt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2 group-hover:brightness-110"
                />
                
                {/* Gradient Overlay with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500"></div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(destination.id)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                >
                  <Heart
                    size={24}
                    className={cn(
                      "transition-all",
                      favorites.includes(destination.id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    )}
                  />
                </button>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-orange-400" />
                    <span className="body-sm text-white/90">{destination.location}</span>
                  </div>
                  
                  <h3 className="heading-md mb-2">{destination.name}</h3>
                  <p className="body-sm text-white/80 mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star size={18} className="fill-yellow-400 text-yellow-400" />
                      <span className="body-sm font-semibold">{destination.rating}</span>
                      <span className="body-sm text-white/70">({destination.reviews} reviews)</span>
                    </div>
                    <div className="heading-sm text-orange-400">
                      {destination.price}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/destination/${destination.id}`)
                    }}
                    className="mt-4 w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Destinations Section */}
        <div className="mt-20">
          <h3 className="heading-lg text-gray-900 mb-8 text-center">More Amazing Places</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allDestinations.filter(d => !d.featured).map((destination) => (
              <div
                key={destination.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.imageAlt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
                  
                  <button
                    onClick={() => toggleFavorite(destination.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
                  >
                    <Heart
                      size={20}
                      className={cn(
                        "transition-all",
                        favorites.includes(destination.id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      )}
                    />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin size={14} className="text-orange-400" />
                      <span className="body-sm text-white/90">{destination.location}</span>
                    </div>
                    
                    <h4 className="heading-sm mb-2">{destination.name}</h4>
                    <p className="body-sm text-white/80 mb-3 line-clamp-2">
                      {destination.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="body-sm font-semibold">{destination.rating}</span>
                      </div>
                      <div className="heading-sm text-orange-400">
                        {destination.price}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/destination/${destination.id}`)
                      }}
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-2 rounded-lg font-semibold transition-all transform hover:scale-105 text-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}