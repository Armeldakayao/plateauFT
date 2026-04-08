"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { getImageUrl } from "@/lib/api/client"

type Landmark = {
  id: string
  title: string
  description: string
  details: string
  gallery: string[]
  reviews: string[]
  phone: string
  website: string
  address: string
  features: string[]
  specialties: string[]
  openingHours: string
  poster: string
  type: string
  createdAt: string
  updatedAt: string
}

interface InfiniteCarouselProps {
  landmarks?: Landmark[]
  landmarksLoading?: boolean
}

export default function InfiniteCarousel({ landmarks, landmarksLoading }: InfiniteCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Convertir les données de restaurant en slides
  const slides = landmarks?.map((restaurant) => ({
    id: restaurant.id,
    image: restaurant.poster || restaurant.gallery[0] || "/placeholder.jpg",
    title: restaurant.title,
    description: restaurant.description,
  })) || []

  useEffect(() => {
    if (slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [slides.length])

  const handleSlideClick = (restaurantId: string) => {
    window.location.href = `ou-aller/${restaurantId}`
  }

  // Afficher un loader si les données sont en cours de chargement
  if (landmarksLoading) {
    return (
      <motion.div
        className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center rounded-lg bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="animate-spin rounded-full h-16 w-16 md:h-24 md:w-24 border-b-2 border-blue-500"></div>
      </motion.div>
    )
  }

  // Afficher un message si aucun restaurant n'est trouvé
  if (slides.length === 0) {
    return (
      <motion.div
        className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center rounded-lg bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center text-gray-500">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">Aucun restaurant disponible</h3>
          <p className="text-sm md:text-base">Les restaurants seront bientôt affichés ici.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-lg relative h-[400px] md:h-[600px] lg:h-[700px] cursor-pointer">
        {/* Image Container */}
        <div 
          className="absolute inset-0 w-full h-full"
          onClick={() => handleSlideClick(slides[currentSlide].id)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Image Slide */}
              <Image
                src={getImageUrl(slides[currentSlide].image) || "/placeholder.jpg"}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.src = "/placeholder.jpg"
                }}
              />

              {/* Overlay par-dessus l'image */}
              <div className="absolute inset-0 bg-black/40 z-10" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* LEFT Overlay - Responsive */}
        <div className="absolute top-0 left-0 z-10 h-full w-8 md:w-16 lg:w-32 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />

        {/* RIGHT Overlay - Responsive */}
        <div className="absolute top-0 right-0 z-10 h-full w-8 md:w-16 lg:w-32 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />

        {/* Text Overlay - Responsive */}
        <div className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8 lg:p-12 xl:px-20 z-20">
          <div className="mx-2 md:mx-8 lg:mx-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl"
              >
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 leading-tight">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-sm md:text-lg lg:text-xl xl:text-2xl opacity-90 leading-relaxed line-clamp-3">
                  {slides[currentSlide].description}
                </p>
                <button className="mt-3 md:mt-4 px-4 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30">
                  Découvrir →
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }}
          className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-2 lg:p-3 rounded-full backdrop-blur-sm transition-all duration-300 items-center justify-center"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          }}
          className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-2 lg:p-3 rounded-full backdrop-blur-sm transition-all duration-300 items-center justify-center"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Navigation - Responsive */}
      <motion.div
        className="flex justify-center mt-4 md:mt-6 lg:mt-10 space-x-2 md:space-x-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-blue-600 scale-125" 
                : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
            }`}
            whileHover={{ scale: currentSlide === index ? 1.25 : 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>

      {/* Slide Counter - Visible on mobile */}
      <div className="md:hidden text-center mt-3 text-gray-600 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </motion.div>
  )
}