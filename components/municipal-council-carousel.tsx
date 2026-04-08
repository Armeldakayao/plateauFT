// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"

// const councilMembers = [
//   { id: 1, name: "Jacques Ehouo", title: "Le Maire", image: "/placeholder.svg?height=200&width=200" },
//   { id: 2, name: "Jean Kouassi", title: "Adjoint au Maire", image: "/placeholder.svg?height=200&width=200" },
//   { id: 3, name: "Marie Konan", title: "Conseillère", image: "/placeholder.svg?height=200&width=200" },
//   { id: 4, name: "Paul N’Guessan", title: "Conseiller", image: "/placeholder.svg?height=200&width=200" },
// ]

// export default function MunicipalCouncilCarousel() {
//   const [index, setIndex] = useState(0)

//   // Pour avancer automatiquement (optionnel, tu peux enlever useEffect si tu veux uniquement manuel)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % councilMembers.length)
//     }, 6000)
//     return () => clearInterval(interval)
//   }, [])

//   const getSlide = (offset: number) => {
//     const length = councilMembers.length
//     return councilMembers[(index + offset + length) % length]
//   }

//   const prevSlide = () => {
//     setIndex((prev) => (prev - 1 + councilMembers.length) % councilMembers.length)
//   }
//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % councilMembers.length)
//   }

//   return (
//     <section className="relative w-full py-12 md:py-24 lg:py-32 bg-primary text-white overflow-hidden">
//       <Image
//         src="/images/abidjan.svg"
//         alt="City skyline background"
//         fill
//         className="absolute inset-0 object-cover opacity-30"
//         priority
//       />
//       <div className="relative z-10 px-4 md:px-6 text-center">
//         <div className="space-y-4 mb-8">
//           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Votre Conseil Municipal</h2>
//           <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">Le Conseil Municipal élu en 2023</p>
//         </div>

//         <div className="flex items-center justify-center gap-6 max-w-7xl mx-auto overflow-visible relative">
//           {/* Bouton précédent */}
//           <button
//             aria-label="Précédent"
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center z-20"
//           >
//             &#8592;
//           </button>

//           {/* Slides */}
//           {[ -1, 0, 1 ].map((offset) => {
//             const member = getSlide(offset)
//             const isCenter = offset === 0
//             return (
//               <motion.div
//                 key={member.id}
//                 animate={{ scale: isCenter ? 1.25 : 0.85, opacity: isCenter ? 1 : 0.5 }}
//                 transition={{ duration: 0.5 }}
//                 className={`relative bg-white/10 p-6 rounded-lg border border-white/20 backdrop-blur-sm shadow-lg ${
//                   isCenter ? "z-10" : "z-0"
//                 }`}
//                 style={{ width: isCenter ? 280 : 220 }}
//               >
//                 <div className="flex flex-col items-center">
//                   <div className="relative w-40 h-40 rounded-md overflow-hidden border-2 border-white mb-4">
//                     <Image
//                       src={member.image}
//                       alt={member.name}
//                       width={160}
//                       height={160}
//                       className="object-cover"
//                     />
//                   </div>
//                   <h3 className="text-xl font-semibold">{member.name}</h3>
//                   <p className="text-sm text-gray-300">{member.title}</p>
//                 </div>
//               </motion.div>
//             )
//           })}

//           {/* Bouton suivant */}
//           <button
//             aria-label="Suivant"
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center z-20"
//           >
//             &#8594;
//           </button>
//         </div>

//         <div className="mt-12">
//           <Button className="px-8 py-4 text-lg bg-transparent border border-white text-white hover:bg-gray-200 rounded-[4px]">
//             Voir l'administration de la mairie
//           </Button>
//         </div>
//       </div>
//     </section>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const councilMembers = [
  { id: 1, name: "Jacques Ehouo", title: "Le Maire", image: "https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1215,fit=cover/https://prod.cdn-medias.jeuneafrique.com/medias/2021/09/29/jad20210929-ass-ci-jacquesehouo.jpg" },
  { id: 2, name: "Jean Kouassi", title: "Adjoint au Maire", image: "/images/r1.svg" },
  { id: 3, name: "Marie Konan", title: "Conseillère", image: "/images/r2.svg" },
  { id: 4, name: "Paul N’Guessan", title: "Conseiller", image: "/images/r3.svg" },
]

export default function MunicipalCouncilCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % councilMembers.length)
    }, 8000) // défilement plus lent (8 secondes)
    return () => clearInterval(interval)
  }, [])

  const getSlide = (offset: number) => {
    const length = councilMembers.length
    return councilMembers[(index + offset + length) % length]
  }

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + councilMembers.length) % councilMembers.length)
  }
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % councilMembers.length)
  }

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-primary text-white overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src="/videos/blue-digital.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo HTML5.
          </video>
          <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 px-4 md:px-6 text-center">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Votre Conseil Municipal</h2>
          <p className="mx-auto max-w-[700px] text-gray-300 pb-10 md:text-xl">Le Conseil Municipal élu en 2023</p>
        </div>

        <div className="flex items-center justify-center gap-6 max-w-[1500px] mx-auto overflow-visible relative">
          {/* Bouton précédent */}
          <button
            aria-label="Précédent"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center z-20"
          >
            &#8592;
          </button>

          {/* Slides */}
          {[ -1, 0, 1 ].map((offset) => {
            const member = getSlide(offset)
            const isCenter = offset === 0
            return (
              <motion.div
                key={member.id}
                animate={{ scale: isCenter ? 1.25 : 0.85, opacity: isCenter ? 1 : 0.5 }}
                transition={{ duration: 1.2, ease: "easeInOut" }} // transition plus lente et douce
                className={`mx-4 relative  p-10 rounded-lg  ${
                  isCenter ? "z-10" : "z-0"
                }`}
                style={{ width: isCenter ? 400 : 350 }}
              >
                <div className="flex flex-col w-[350px] h-[350px] items-center">
                  <div className="relative w-[350px] h-[350px]  rounded-t-[7px] overflow-hidden  ">
                    <Image
                      src={member.image}
                      alt={member.name}
                     fill
                      className="object-cover"
                    />
                  </div>
                 <div className="flex  w-full">
<div className="bg-secondary absolute bottom-4 text-left rounded-b-[7px]  p-4 pr-28 pl-4  ">
                   <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.title}</p>
                 </div>
<div className="w-10"></div>
                 </div>
                </div>
              </motion.div>
            )
          })}

          {/* Bouton suivant */}
          <button
            aria-label="Suivant"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center z-20"
          >
            &#8594;
          </button>
        </div>

        <div className="mt-20">
          <Button onClick={() => { window.location.href = "/organisation" }} className="px-8 py-6 text-lg bg-transparent border border-white text-white hover:bg-gray-200 rounded-[4px]">
            Voir l'administration de la mairie
          </Button>
        </div>
      </div>
    </section>
  )
}
