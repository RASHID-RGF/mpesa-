import { Calendar, Users, DollarSign, MapPin } from 'lucide-react'

export default function SearchFilter() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="glassmorphism rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/30">
          <h2 className="heading-md text-gray-800 mb-6">Find Your Perfect Adventure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Destination Type */}
            <div className="space-y-2">
              <label className="body-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin size={18} className="text-orange-600" />
                Destination Type
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                <option>All Destinations</option>
                <option>Safari</option>
                <option>Beach</option>
                <option>Mountain</option>
                <option>Cultural</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="body-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={18} className="text-orange-600" />
                Travel Dates
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="body-sm font-semibold text-gray-700 flex items-center gap-2">
                <Users size={18} className="text-orange-600" />
                Guests
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3-5 Guests</option>
                <option>6+ Guests</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="body-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign size={18} className="text-orange-600" />
                Budget
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all">
                <option>Any Budget</option>
                <option>$500 - $1000</option>
                <option>$1000 - $2000</option>
                <option>$2000+</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}