import { Award, Users, Globe, Heart } from 'lucide-react'

const stats = [
  { icon: Users, value: '10,000+', label: 'Happy Travelers' },
  { icon: Globe, value: '50+', label: 'Destinations' },
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Heart, value: '4.9★', label: 'Average Rating' }
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-gray-900 mb-4">About Discover Kenya</h2>
          <p className="body-lg text-gray-600 max-w-3xl mx-auto">
            For over 15 years, we've been connecting travelers with the incredible beauty and culture of Kenya.
            Our mission is to create unforgettable experiences while supporting local communities and conservation efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <h3 className="heading-lg text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 body-md text-gray-600">
              <p>
                Founded in 2009, Discover Kenya began as a small tour operator with a big dream: to showcase
                the incredible diversity of Kenya's landscapes, wildlife, and cultures to the world.
              </p>
              <p>
                Today, we're proud to be Kenya's leading adventure travel company, having helped over 10,000
                travelers create memories that last a lifetime. From the savannas of the Maasai Mara to the
                peaks of Mount Kenya, we offer authentic experiences that go beyond tourism.
              </p>
              <p>
                We're committed to sustainable tourism practices that benefit local communities and protect
                Kenya's precious wildlife and natural resources for future generations.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxrZW55YSUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3MzU5NjY5NTN8MA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Kenya landscape"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
                  <Icon size={32} className="text-white" />
                </div>
                <div className="heading-lg text-gray-900 mb-1">{stat.value}</div>
                <div className="body-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Values */}
        <div className="mt-16">
          <h3 className="heading-lg text-gray-900 text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={40} className="text-white" />
              </div>
              <h4 className="heading-md text-gray-900 mb-2">Sustainability</h4>
              <p className="body-sm text-gray-600">
                We prioritize eco-friendly practices and support conservation initiatives across Kenya.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={40} className="text-white" />
              </div>
              <h4 className="heading-md text-gray-900 mb-2">Community</h4>
              <p className="body-sm text-gray-600">
                We work closely with local communities to ensure tourism benefits everyone involved.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={40} className="text-white" />
              </div>
              <h4 className="heading-md text-gray-900 mb-2">Authenticity</h4>
              <p className="body-sm text-gray-600">
                We provide genuine cultural experiences and authentic connections with Kenya's people and wildlife.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}