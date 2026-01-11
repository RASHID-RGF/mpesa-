import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="heading-md mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Discover Kenya
            </h3>
            <p className="body-sm text-gray-300 mb-6 leading-relaxed">
              Your gateway to unforgettable African adventures. Experience the magic of Kenya with expert guides and personalized service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 hover:bg-gray-600 rounded-full transition-all transform hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-gray-600 rounded-full transition-all transform hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-gray-600 rounded-full transition-all transform hover:scale-110">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-sm mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">About Us</a></li>
              <li><a href="#destinations" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Destinations</a></li>
              <li><a href="#experiences" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Experiences</a></li>
              <li><a href="#" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Travel Guide</a></li>
              <li><a href="#blog" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="heading-sm mb-6">Popular Destinations</h4>
            <ul className="space-y-3">
              <li><a href="#" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Masai Mara</a></li>
              <li><a href="#" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Mount Kenya</a></li>
              <li><a href="#" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Diani Beach</a></li>
              <li><a href="#" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Amboseli</a></li>
              <li><a href="#" className="body-sm text-gray-300 hover:text-gray-300 transition-colors">Lamu Island</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="heading-sm mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-300 flex-shrink-0 mt-1" />
                <span className="body-sm text-gray-300">Nairobi, Kenya</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-gray-300 flex-shrink-0 mt-1" />
                <span className="body-sm text-gray-300">+254 700 123 456</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-gray-300 flex-shrink-0 mt-1" />
                <span className="body-sm text-gray-300">info@discoverkenya.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="body-md font-semibold mb-3">Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button className="px-4 py-2 bg-black hover:bg-gray-800 rounded-lg transition-colors">
                  <Mail size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="body-sm text-gray-400">
              © 2024 Discover Kenya. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="body-sm text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="body-sm text-gray-400 hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="body-sm text-gray-400 hover:text-gray-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}