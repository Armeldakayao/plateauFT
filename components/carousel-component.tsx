// "use client"

// import * as React from "react"
// import Image from "next/image"
// import { Card } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi,
// } from "@/components/ui/carousel"

// type Slide = {
//   type: "food-ad" | "city-info"
//   imageSrc: string
//   alt: string
//   title?: string
//   description?: string
//   cta?: string
//   address?: string
//   social?: string
// }

// const slides: Slide[] = [
//   {
//    type:"city-info",
//     imageSrc: "https://lh4.googleusercontent.com/proxy/ZqWR9v2ZG1Y4eHOknDXk1EnKeErM6U4tEMWv4880LkwG6TkeQFuZPxZXWGo-hNw8hDw6ImxDMsogTsQZvGtdoTY7XQH_s9KDam_D0I5CUDjkAkALIKqy",
//     alt: "Food advertisement with rice and chicken",
//     title: "Rice So Nice, You'll Come Twice!",
//     description: "One plate and you're hooked!",
//     cta: "Order now!",
//     social: "@rolandmoot",
//     address: "Location: 23, Aroma Street, Lagos",
//   },
//   {
//    type:"city-info",
//     imageSrc: "https://www.climate-chance.org/wp-content/uploads/2020/02/800px-abidjan.jpg",
//     alt: "Stade Félix-Houphouët-Boigny",
//     title: "Stade Félix-Houphouët-Boigny",
//     description:
//       "Le Stade Félix-Houphouët-Boigny, surnommé « Le Félicia », est le premier stade national polyvalent (football, rugby, athlétisme) de Côte d'Ivoire. Il fut nommé du premier Président de la Côte d'Ivoire, Félix Houphouët-Boigny. Situé dans la commune du Plateau d'Abidjan, sa capacité d'accueil précédente est de 35 000 places.",
//   },
//   {
//     type:"city-info",
//     imageSrc: "https://www.climate-chance.org/wp-content/uploads/2020/02/800px-abidjan.jpg",
//     alt: "Abidjan city view",
//     title: "Abidjan, La Perle des Lagunes",
//     description:
//       "Abidjan est la capitale économique de la Côte d'Ivoire et l'une des villes les plus peuplées d'Afrique de l'Ouest. Elle est connue pour ses gratte-ciel, ses marchés animés et sa vie nocturne trépidante. La ville est un carrefour culturel et économique majeur de la région.",
//   },
// ]

// export default function CarouselComponent() {
//   const [api, setApi] = React.useState<CarouselApi>()
//   const [current, setCurrent] = React.useState(0)
//   const [count, setCount] = React.useState(0)

//   React.useEffect(() => {
//     if (!api) {
//       return
//     }

//     setCount(api.scrollSnapList().length)
//     setCurrent(api.selectedScrollSnap() + 1)

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1)
//     })
//   }, [api])

//   return (
//     <div className=" w-screen h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
     
//       <div className="relative w-screen z-10  h-full">
//         <Carousel setApi={setApi} className="w-screen m">
//           <CarouselContent>
//             {slides.map((slide, index) => (
//               <CarouselItem key={index}>
//                 {slide.type === "food-ad" && (
//                   <div className="p-4 md:p-8 flex items-center justify-center h-full">
//                     <Card className="relative w-full max-w-4xl h-[400px] md:h-[500px] lg:h-[600px] bg-red-700 rounded-lg overflow-hidden shadow-lg">
//                       <Image
//                         src={slide.imageSrc || "/placeholder.svg"}
//                         alt={slide.alt}
//                         fill
//                         sizes="100vw"
//                         style={{ objectFit: "contain" }}
//                         className="absolute inset-0"
//                       />
//                       <div className="absolute bottom-4 left-4 text-white text-sm md:text-base">
//                         <p className="font-bold">{slide.social}</p>
//                         <p>{slide.address}</p>
//                       </div>
//                     </Card>
//                   </div>
//                 )}
//                 {slide.type === "city-info" && (
//                   <div className="p-4 md:p-8 flex items-center justify-center h-full">
//                    <Card className="relative w-full p-7 h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">

//                       <Image
//                         src={slide.imageSrc || "/placeholder.svg"}
//                         alt={slide.alt}
//                         fill
//                         sizes="100vw"
//                         style={{ objectFit: "cover" }}
//                         className="absolute inset-0"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:p-10 text-white">
//                         <div className="max-w-2xl">
//                           <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
//                           <p className="text-sm md:text-base opacity-90">{slide.description}</p>
//                         </div>
//                       </div>
//                     </Card>
//                   </div>
//                 )}
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
//           <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
//         </Carousel>
//       </div>
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
//         {Array.from({ length: count }).map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//               current === index + 1 ? "bg-blue-500" : "bg-white opacity-50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { getImageUrl } from "@/lib/api/client"

type Slide = {
  id: string
  type: "food-ad" | "city-info"
  imageSrc: string
  alt: string
  title?: string
  description?: string
  cta?: string
  address?: string
  social?: string
}

const slides: Slide[] = [
  {
    id: "rice-restaurant",
    type: "food-ad",
    imageSrc: "/placeholder.svg?height=600&width=800",
    alt: "Food advertisement with rice and chicken",
    title: "Rice So Nice, You'll Come Twice!",
    description: "One plate and you're hooked!",
    cta: "Order now!",
    social: "@rolandmoot",
    address: "Location: 23, Aroma Street, Lagos",
  },
  {
    id: "stade-felix",
    type: "city-info",
    imageSrc: "/placeholder.svg?height=600&width=800",
    alt: "Stade Félix-Houphouët-Boigny",
    title: "Stade Félix-Houphouët-Boigny",
    description:
      "Le Stade Félix-Houphouët-Boigny, surnommé « Le Félicia », est le premier stade national polyvalent (football, rugby, athlétisme) de Côte d'Ivoire. Il fut nommé du premier Président de la Côte d'Ivoire, Félix Houphouët-Boigny. Situé dans la commune du Plateau d'Abidjan, sa capacité d'accueil précédente est de 35 000 places.",
  },
  {
    id: "abidjan-city",
    type: "city-info",
    imageSrc: "/placeholder.svg?height=600&width=800",
    alt: "Abidjan city view",
    title: "Abidjan, La Perle des Lagunes",
    description:
      "Abidjan est la capitale économique de la Côte d'Ivoire et l'une des villes les plus peuplées d'Afrique de l'Ouest. Elle est connue pour ses gratte-ciel, ses marchés animés et sa vie nocturne trépidante. La ville est un carrefour culturel et économique majeur de la région.",
  },
]

export default function CarouselComponent() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="w-screen h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <div className="relative w-screen z-10 h-full">
        <Carousel setApi={setApi} className="w-screen">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <Link href={`/restaurant/${slide.id}`}>
                  {slide.type === "food-ad" && (
                    <div className="p-4 md:p-8 flex items-center justify-center h-full cursor-pointer">
                      <Card className="relative w-full max-w-4xl h-[400px] md:h-[500px] lg:h-[600px] bg-red-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <Image
                          src={getImageUrl(slide.imageSrc) || "/placeholder.svg"}
                          alt={slide.alt}
                          fill
                          sizes="100vw"
                          style={{ objectFit: "contain" }}
                          className="absolute inset-0"
                        />
                        <div className="absolute bottom-4 left-4 text-white text-sm md:text-base">
                          <p className="font-bold">{slide.social}</p>
                          <p>{slide.address}</p>
                        </div>
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="bg-white/90 px-4 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-gray-800 font-medium">Voir les détails</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                  {slide.type === "city-info" && (
                    <div className="p-4 md:p-8 flex items-center justify-center h-full cursor-pointer">
                      <Card className="relative w-full p-7 h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <Image
                          src={slide.imageSrc || "/placeholder.svg"}
                          alt={slide.alt}
                          fill
                          sizes="100vw"
                          style={{ objectFit: "cover" }}
                          className="absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:p-10 text-white">
                          <div className="max-w-2xl">
                            <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                            <p className="text-sm md:text-base opacity-90 line-clamp-3">{slide.description}</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="bg-white/90 px-4 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-gray-800 font-medium">Voir les détails</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
          <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white hover:text-black rounded-full p-2 md:p-3 transition-colors" />
        </Carousel>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              current === index + 1 ? "bg-blue-500" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
