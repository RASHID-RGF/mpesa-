import { Calendar, User, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'The Best Time to Visit Kenya: A Seasonal Guide',
    excerpt: 'Discover when to plan your Kenyan adventure for optimal weather, wildlife viewing, and fewer crowds.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxrZW55YSUyMHNhZmFyaXxlbnwwfHx8fDE3MzU5NjY5NTJ8MA&ixlib=rb-4.0.3&q=80&w=1080',
    category: 'Travel Tips'
  },
  {
    id: 2,
    title: 'Hidden Gems: Underrated Destinations in Kenya',
    excerpt: 'Beyond the popular spots, explore these lesser-known but equally spectacular locations.',
    author: 'Michael Chen',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHttb3VudCUyMGtlbnlhfGVufDB8fHx8MTczNTk2Njk1M3ww&ixlib=rb-4.0.3&q=80&w=1080',
    category: 'Destinations'
  },
  {
    id: 3,
    title: 'Sustainable Tourism: How to Travel Responsibly in Kenya',
    excerpt: 'Learn about eco-friendly practices and how your travels can support local communities.',
    author: 'Emma Williams',
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHtlbGVwaGFudHxlbnwwfHx8fDE3MzU5NjY5NTN8MA&ixlib=rb-4.0.3&q=80&w=1080',
    category: 'Conservation'
  }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-xl text-gray-900 mb-4">Travel Blog</h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and stories from our adventures across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="heading-sm text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h3>
                <p className="body-sm text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-all transform hover:scale-105">
            View All Posts
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}