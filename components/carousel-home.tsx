"use client"

import * as React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import { QRCodeSVG } from 'qrcode.react'
import { getImageUrl } from "@/lib/api/client"

type Restaurant = {
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

type Slide = {
  type: "restaurant"
  imageSrc: string
  alt: string
  title: string
  description: string
  cta?: string
  qrData?: string
  qrLabel?: string
  restaurantId: string
}

interface CarouselComponentProps {
  restaurantsData?: Restaurant[]
  restaurantsLoading?: boolean
}

export default function CarouselComponent({ restaurantsData, restaurantsLoading }: CarouselComponentProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  // Convertir les données de restaurant en slides
  const slides: Slide[] = React.useMemo(() => {
    if (!restaurantsData) return []
    
    return restaurantsData.map((restaurant) => ({
      type: "restaurant" as const,
      imageSrc: restaurant.poster || restaurant.gallery[0] || "/placeholder.jpg",
      alt: `${restaurant.title} - Restaurant`,
      title: restaurant.title,
      description: restaurant.description,
      cta: "Voir le menu",
      qrData: restaurant.website || null, // Seulement le site web
      qrLabel: restaurant.website ? "Site web" : null, // Pas de QR si pas de site
      restaurantId: restaurant.id
    }))
  }, [restaurantsData])

  React.useEffect(() => {
    if (!api || slides.length === 0) return

    setCurrent(api.selectedScrollSnap())
    const handleSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", handleSelect)

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => {
      clearInterval(interval)
      api.off("select", handleSelect)
    }
  }, [api, slides.length])

  const handleSlideClick = (restaurantId: string) => {
    window.location.href = `ou-aller/${restaurantId}`
  }

  // Afficher un loader si les données sont en cours de chargement
  if (restaurantsLoading) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  // Afficher un message si aucun restaurant n'est trouvé
  if (!slides.length) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <div className="flex items-center justify-center h-full text-center">
          <div className="text-gray-500">
            <h3 className="text-2xl font-semibold mb-2">Aucun restaurant disponible</h3>
            <p>Les restaurants seront bientôt affichés ici.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <div className="relative z-10 flex items-center justify-center h-full">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem 
                key={slide.restaurantId} 
                className="cursor-pointer" 
                onClick={() => handleSlideClick(slide.restaurantId)}
              >
                <motion.div
                  className="p-4 md:p-8 flex items-center justify-center h-full"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Card className="relative w-full border-none max-w-4xl h-[400px] md:h-[500px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={getImageUrl(slide.imageSrc)}
                      alt={slide.alt}
                      fill
                      sizes="100vw"
                      className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.src = "/placeholder.jpg"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* QR Code dans le coin supérieur droit - seulement si un site web existe */}
                    {slide.qrData && slide.qrLabel && (
                      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20">
                        <motion.div
                          className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <QRCodeSVG
                            value={slide.qrData}
                            size={64}
                            level="M"
                            includeMargin={false}
                            className="w-16 h-16"
                          />
                          <p className="text-xs text-gray-700 text-center mt-1 font-medium">
                            {slide.qrLabel}
                          </p>
                        </motion.div>
                      </div>
                    )}

                    <div className="absolute bottom-6 left-6 text-white z-10 max-w-3xl space-y-2">
                      <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
                        {slide.title}
                      </h2>
                      <p className="text-sm md:text-base opacity-90 line-clamp-2">
                        {slide.description}
                      </p>
                      {slide.cta && (
                        <button className="mt-3 px-6 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                          {slide.cta}
                        </button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
          <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
        </Carousel>
      </div>

      {/* Dots indicateurs */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? "bg-blue-500 scale-110" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}