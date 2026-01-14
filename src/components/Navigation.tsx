import { useState } from 'react'
import { Menu, X, Heart, Calendar } from 'lucide-react'
import { cn } from '../lib/utils'
import { Link } from 'react-router-dom'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Discover Kenya
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-gray-300 transition-colors body-md">
                Home
              </Link>
              <a href="#destinations" className="text-white hover:text-gray-300 transition-colors body-md">
                Destinations
              </a>
              <a href="#experiences" className="text-white hover:text-gray-300 transition-colors body-md">
                Experiences
              </a>
              <a href="#about" className="text-white hover:text-gray-300 transition-colors body-md">
                About
              </a>
              <a href="#blog" className="text-white hover:text-gray-300 transition-colors body-md">
                Blog
              </a>
              <Link to="/bookings" className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                <Calendar size={20} />
                <span>My Bookings</span>
              </Link>
              <Link to="/dashboard" className="text-white hover:text-gray-300 transition-colors body-md">
                Dashboard
              </Link>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Heart size={24} />
              </button>
              <button
                onClick={() => alert('Sign in functionality coming soon!')}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 body-md font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange-300 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 glassmorphism-dark">
          <Link to="/" className="block text-white hover:text-gray-300 transition-colors body-md py-2">
            Home
          </Link>
          <a href="#destinations" className="block text-white hover:text-gray-300 transition-colors body-md py-2">
            Destinations
          </a>
          <a href="#experiences" className="block text-white hover:text-gray-300 transition-colors body-md py-2">
            Experiences
          </a>
          <a href="#about" className="block text-white hover:text-gray-300 transition-colors body-md py-2">
            About
          </a>
          <a href="#blog" className="block text-white hover:text-gray-300 transition-colors body-md py-2">
            Blog
          </a>
          <Link to="/bookings" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors body-md py-2">
            <Calendar size={20} />
            <span>My Bookings</span>
          </Link>
          <div className="flex items-center space-x-4 pt-2">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Heart size={24} />
            </button>
            <button
              onClick={() => alert('Sign in functionality coming soon!')}
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full transition-all body-md font-semibold flex-1"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}