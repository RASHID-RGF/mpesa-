import HeroSection from '../components/HeroSection'
import FeaturedDestinations from '../components/FeaturedDestinations'
import SearchFilter from '../components/SearchFilter'
import ExperiencesShowcase from '../components/ExperiencesShowcase'
import Testimonials from '../components/Testimonials'
import AboutSection from '../components/AboutSection'
import BlogSection from '../components/BlogSection'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-light relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative z-10">
      <Navigation />
      <HeroSection />
      <SearchFilter />
      <FeaturedDestinations />
      <ExperiencesShowcase />
      <Testimonials />
      <AboutSection />
      <BlogSection />
        <Footer />
      </div>
    </div>
  )
}