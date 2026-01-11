import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 h-[500px]">
        {/* Main Image */}
        <div
          className="col-span-4 md:col-span-3 rounded-2xl overflow-hidden cursor-pointer group relative"
          onClick={() => {
            setSelectedImage(0)
            setIsLightboxOpen(true)
          }}
        >
          <img
            src={images[0]}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
              View Gallery
            </span>
          </div>
          {/* Hover overlay with zoom effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Thumbnail Images */}
      <div className="col-span-4 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-4">
        {images.slice(1, 3).map((image, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden cursor-pointer group relative h-full"
            onClick={() => {
              setSelectedImage(index + 1)
              setIsLightboxOpen(true)
            }}
          >
            <img
              src={image}
              alt={`${alt} ${index + 2}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover overlay for thumbnails */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-sm">
                View
              </span>
            </div>
            {index === 1 && images.length > 3 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                <span className="text-white font-semibold text-xl">+{images.length - 3} more</span>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight size={40} />
          </button>

          <div className="max-w-6xl max-h-[90vh] px-16">
            <img
              src={images[selectedImage]}
              alt={`${alt} ${selectedImage + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImage ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}