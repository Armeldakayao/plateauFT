"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function ServiceCard() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className="w-full bg-cover pt-10  bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/bg-service-card.svg')", // change with your image path
      }}
    >
      <Card className="w-full border-none px-20 shadow-none mx-auto  rounded-lg backdrop-blur-sm  overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image à gauche */}
          {/* <div className="relative h-48 md:h-[810px]  flex "> */}
            <motion.div
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative h-48 md:h-[810px] flex"
>
            <Image
              src="/images/mariage.svg" // change with your image path
              alt="Placeholder image for service"
             fill
              className="object-cover w-full h-full"
            />
            </motion.div>
          {/* </div> */}

          {/* Contenu à droite */}
          <motion.div
  initial={{ opacity: 0, x: 100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  viewport={{ once: true }}
  className="px-6 flex flex-col justify-center"
>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-5xl font-bold text-v0-green pb-4">
                <span className="text-primary">Demande de celebration de </span>{" "}
                <span className="text-[#EF9213]">mariage civil</span>
              </CardTitle>
              <CardDescription className="text-gray-600  bg-white border-l-8 p-2 border-l-secondary text-xl   mt-2">
               Vous souhaitez vous marier au Plateau ?
Lancez votre pré-demande en ligne et gagnez du temps.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mb-6">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-v0-blue text-2xl my-4 text-primary font-semibold hover:underline focus:outline-none"
                aria-expanded={isOpen}
                aria-controls="documents-list"
              >
                Liste des pièces à fournir
                {isOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>
              <div
                id="documents-list"
                className={cn("grid gap-2 text-xl mt-3 transition-all duration-300 ease-in-out overflow-hidden", {
                  "max-h-0 opacity-0": !isOpen,
                  "max-h-full opacity-100": isOpen,
                })}
              >
                {[
                  "Choix de la date souhaitée",
                  "Accompagnement d'un agent disponible",
                  "Pièces justificatives à fournir",
                  "Dossier de mariage",
                  "Dossier de mariage",
                  "Dossier de mariage",
                ].map((text, i) => (
                  <div key={i} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-v0-green mr-2" />
                    {text}
                  </div>
                ))}
              </div>
            </CardContent>
            <Button onClick={()=>window.location.href="/services/acte-mariage"} className=" rounded-[5px] w-full bg-[#EF9213] hover:bg-[#EF9213] text-white py-7 text-xl  font-semibold">
              Faire ma demande de mariage
            </Button>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}
