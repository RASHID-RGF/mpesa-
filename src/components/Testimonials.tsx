import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'The Masai Mara safari was absolutely breathtaking! Our guide was knowledgeable and we saw all of the Big Five. This trip exceeded all our expectations.',
    destination: 'Masai Mara Safari'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Singapore',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Mount Kenya trek was challenging but incredibly rewarding. The alpine scenery was stunning and the team made sure we were safe throughout.',
    destination: 'Mount Kenya Trek'
  },
  {
    id: 3,
    name: 'Emma Williams',
    location: 'London, UK',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Diani Beach was paradise! Crystal clear waters, white sand, and amazing hospitality. Perfect for a relaxing getaway.',
    destination: 'Diani Beach'
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied adventurers who have discovered Kenya with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-gradient-to-br from-white to-orange-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 opacity-10 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500"></div>
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote size={64} className="text-orange-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="body-md text-gray-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* Destination Badge */}
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full body-sm font-semibold mb-6">
                {testimonial.destination}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-200 group-hover:ring-4 group-hover:ring-orange-400 transition-all duration-300"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="body-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="heading-lg text-orange-600 mb-2">10,000+</div>
            <div className="body-sm text-gray-600">Happy Travelers</div>
          </div>
          <div>
            <div className="heading-lg text-orange-600 mb-2">50+</div>
            <div className="body-sm text-gray-600">Destinations</div>
          </div>
          <div>
            <div className="heading-lg text-orange-600 mb-2">4.9★</div>
            <div className="body-sm text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="heading-lg text-orange-600 mb-2">15+</div>
            <div className="body-sm text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}