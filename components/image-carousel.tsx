"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface CarouselItem {
  src: string
  alt: string
  title?: string
  description?: string
  bubbles?: {
    text: string
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  }[]
}

interface Props {
  images: CarouselItem[]
}

export default function ImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % images.length)
  }

  const prev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + images.length) % images.length)
  }

  const jump = (i: number) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? "100%" : "-100%", opacity: 0 }),
  }

  const current = images[index]

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl group">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={current.src || "/placeholder.svg"}
              alt={current.alt}
              fill
              className="object-cover object-center"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6 text-white">
              {current.title && <h3 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{current.title}</h3>}
              {current.description && <p className="text-base md:text-lg drop-shadow-md">{current.description}</p>}

              {current.bubbles?.map((b, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`absolute bg-red-500 text-white px-3 py-1 rounded-full text-sm shadow-md pointer-events-none
                    ${b.position === "top-left" && "top-4 left-4"}
                    ${b.position === "top-right" && "top-4 right-4"}
                    ${b.position === "bottom-left" && "bottom-4 left-4"}
                    ${b.position === "bottom-right" && "bottom-4 right-4"}`}
                >
                  {b.text}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => jump(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
