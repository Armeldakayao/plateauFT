"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import { getImageUrl } from "@/lib/api/client"
import { motion, AnimatePresence } from "framer-motion"

interface ImagePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  selectedIndex?: number   // <-- nouvel index sélectionné
}

export function ImagePreviewModal({ isOpen, onClose, images, selectedIndex = 0 }: ImagePreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(selectedIndex)
      setZoom(1)
    }
  }, [isOpen, selectedIndex])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setZoom(1)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setZoom(1)
  }

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3))
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5))

  if (!images.length) return null

  // Animation avec clip-path
  const variants = {
    initial: {
      opacity: 0,
      clipPath: "circle(0% at 50% 50%)",
      scale: 0.95
    },
    animate: {
      opacity: 1,
      clipPath: "circle(150% at 50% 50%)",
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    exit: {
      opacity: 0,
      clipPath: "circle(0% at 50% 50%)",
      scale: 0.95,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[70vw] h-[80vh] p-0 bg-black/10 backdrop-blur-xl flex items-center justify-center overflow-hidden rounded-2xl">
        <div className="relative w-full h-full flex items-center justify-center bg-primary/10">
          
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 rounded-full"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 rounded-full backdrop-blur-sm"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 rounded-full backdrop-blur-sm"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={zoomOut}
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
            <span className="text-white px-3 py-2 bg-black/50 rounded text-sm">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={zoomIn}
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Main image avec animation clip-path */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden select-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={getImageUrl(images[currentIndex]) || "/placeholder.svg"}
                alt={`Image ${currentIndex + 1}`}
                 //@ts-ignore
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-300 ease-in-out"
                style={{ transform: `scale(${zoom})` }}
              />
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
