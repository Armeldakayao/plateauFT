"use client"

import { FileText, Lightbulb, MapPin, Globe, Building } from "lucide-react"
import { motion } from "framer-motion"

const values = [
  { icon: FileText, title: "Transparence" },
  { icon: Lightbulb, title: "Innovation" },
  { icon: MapPin, title: "Proximité" },
  { icon: Globe, title: "Développement durable" },
  { icon: Building, title: "Respect des institutions" },
]

export default function ValuesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="px-4 md:px-56 text-center">
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Nos valeurs</h2>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            La mairie du Plateau défend une vision moderne, inclusive et citoyenne fondée sur :
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="size-36 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <value.icon className="size-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
