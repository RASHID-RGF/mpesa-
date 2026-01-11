import { Compass, Waves, Mountain, Users } from 'lucide-react'

const experiences = [
  {
    icon: Compass,
    title: 'Wildlife Safari',
    description: 'Get up close with the Big Five and witness the Great Migration in world-renowned national parks',
    color: 'from-gray-900 to-black'
  },
  {
    icon: Waves,
    title: 'Beach Retreats',
    description: 'Unwind on pristine white-sand beaches along the Indian Ocean coastline',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Mountain,
    title: 'Mountain Adventures',
    description: 'Trek through alpine forests and conquer peaks with stunning panoramic views',
    color: 'from-green-600 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Cultural Tours',
    description: 'Immerse yourself in rich Swahili heritage and traditional Maasai culture',
    color: 'from-purple-500 to-pink-500'
  }
]

export default function ExperiencesShowcase() {
  return (
    <section id="experiences" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-gray-900 mb-4">Unforgettable Experiences</h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Choose your adventure and create memories that will last a lifetime
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((experience, index) => {
            const Icon = experience.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Diagonal Background Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${experience.color} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`}></div>

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${experience.color} mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <Icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="heading-sm text-gray-900 mb-3">{experience.title}</h3>
                <p className="body-md text-gray-600 leading-relaxed">
                  {experience.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-orange-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="body-sm">Explore</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </section>
  )
}