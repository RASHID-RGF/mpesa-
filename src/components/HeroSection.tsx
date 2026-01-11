import { Search } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1588588786707-8af013227e84?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzYXZhbm5hJTIwYWNhY2lhJTIwdHJlZXMlMjBzdW5zZXQlMjB3aWxkbGlmZSUyMGdyYXNzbGFuZHxlbnwwfDB8fG9yYW5nZXwxNzYyNTQxMzYwfDA&ixlib=rb-4.1.0&q=85')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="heading-display text-white mb-6 animate-fade-in">
          Discover Kenya's Hidden Gems
        </h1>
        <p className="body-lg text-white/90 mb-12 max-w-2xl mx-auto">
          Experience the magic of Africa's most diverse destination. From pristine beaches to majestic wildlife, your adventure awaits.
        </p>

        {/* Search Bar with Glassmorphism */}
        <div className="glassmorphism rounded-2xl p-6 max-w-3xl mx-auto shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
            <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg">
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="heading-lg text-white mb-2">50+</div>
            <div className="body-sm text-white/80">Destinations</div>
          </div>
          <div className="text-center">
            <div className="heading-lg text-white mb-2">10K+</div>
            <div className="body-sm text-white/80">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="heading-lg text-white mb-2">4.9★</div>
            <div className="body-sm text-white/80">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}