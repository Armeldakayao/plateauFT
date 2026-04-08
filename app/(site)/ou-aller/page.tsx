// // "use client"

// // import type React from "react"

// // import Image from "next/image"
// // import { motion } from "framer-motion"
// // import { Hotel, Utensils, Sparkles, Star, MapPin } from "lucide-react"
// // import { Card, CardContent, CardFooter } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { useState, useRef } from "react"

// // // --- PandaAvatar Component ---
// // interface PandaAvatarProps {
// //   size?: "sm" | "md" | "lg"
// // }

// // function PandaAvatar({ size = "md" }: PandaAvatarProps) {
// //   const sizeClasses = {
// //     sm: "w-10 h-10",
// //     md: "w-12 h-12",
// //     lg: "w-16 h-16",
// //   }

// //   const avatarSize = sizeClasses[size]

// //   return (
// //     <motion.div
// //       className={`relative rounded-full overflow-hidden border-4 border-white shadow-lg ${avatarSize}`}
// //       initial={{ scale: 0.8, opacity: 0 }}
// //       animate={{ scale: 1, opacity: 1 }}
// //       transition={{ type: "spring", stiffness: 200, damping: 10 }}
// //       whileHover={{ scale: 1.1 }}
// //     >
// //       <Image src="/placeholder.svg?height=64&width=64" alt="Panda Avatar" fill style={{ objectFit: "cover" }} />
// //     </motion.div>
// //   )
// // }

// // // --- HeroSection Component ---
// // function HeroSection() {
// //   const cardVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// //     hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" },
// //   }

// //   const sphereVariants = {
// //     animate: {
// //       y: ["0%", "10%", "-5%", "0%"],
// //       x: ["0%", "-5%", "5%", "0%"],
// //       rotate: [0, 360],
// //       transition: {
// //         duration: 10,
// //         repeat: Number.POSITIVE_INFINITY,
// //         ease: "easeInOut",
// //         repeatType: "reverse",
// //       },
// //     },
// //   }

// //   return (
// //    <section className="relative overflow-hidden py-20 md:py-40 text-white">
// //   {/* Background image */}
// //   <div className="absolute inset-0 z-0">
// //    <Image
// //               src="/images/service2.svg" // ← Remplace par ton image réelle
// //               alt="Image de fond section services"
// //               fill
// //               className="object-cover  z-0"
// //               priority
// //             />
// //     {/* Gradient overlay */}
// //     {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-purple-800 opacity-80" /> */}
// //   </div>

// //   {/* Background spheres */}


// //   {/* Content */}
// //   <div className="relative z-20 container py-32 mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-16">
// //     <motion.div
// //       initial={{ opacity: 0, x: -50 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       transition={{ duration: 0.8 }}
// //       className="max-w-4xl text-center lg:text-left"
// //     >
// //       <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-4">Explorez le Plateau autrement !</h1>
// //       <p className="text-lg md:text-2xl opacity-90">
// //         Découvrez les meilleures adresses pour vous restaurer, séjourner ou sortir dans le panorama du Plateau.
// //       </p>
// //     </motion.div>

// //     <div className="relative w-full max-w-md lg:max-w-none lg:w-auto flex flex-col items-center lg:items-end gap-4 mt-8 lg:mt-0">
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.8 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.6, delay: 0.2 }}
// //         className="absolute -top-16 right-0 lg:-right-16 z-30"
// //       >
// //         <PandaAvatar size="lg" />
// //       </motion.div>

// //     <div className="grid grid-cols-2 gap-4 w-full max-w-xs md:max-w-sm lg:max-w-none">
// //   {/* Carte 1 en haut à gauche */}
// //   <motion.div
// //     className="bg-white text-blue-800 p-7 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer"
// //     variants={cardVariants}
// //     initial="hidden"
// //     animate="visible"
// //     whileHover="hover"
// //     transition={{ delay: 0.4 }}
// //   >
// //     <div className="py-4">
// //       <Hotel className="w-16 h-16" />
// //       <div className="pt-7">
// //         <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
// //           Voir les <span className="font-bold">Hôtels</span>
// //         </span>
// //       </div>
// //     </div>
// //   </motion.div>

// //   {/* Carte 3 à droite, centrée verticalement sur deux lignes */}
// //   <motion.div
// //     className="bg-white text-blue-800 p-7 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer row-span-2 self-center"
// //     variants={cardVariants}
// //     initial="hidden"
// //     animate="visible"
// //     whileHover="hover"
// //     transition={{ delay: 0.4 }}
// //   >
// //     <div className="py-4">
// //       <Hotel className="w-16 h-16" />
// //       <div className="pt-7">
// //         <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
// //           Voir les <span className="font-bold">Hôtels</span>
// //         </span>
// //       </div>
// //     </div>
// //   </motion.div>

// //   {/* Carte 2 en bas à gauche */}
// //   <motion.div
// //     className="bg-white text-blue-800 p-10 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer"
// //     variants={cardVariants}
// //     initial="hidden"
// //     animate="visible"
// //     whileHover="hover"
// //     transition={{ delay: 0.4 }}
// //   >
// //     <div className="py-4">
// //       <Hotel className="w-16 h-16" />
// //       <div className="pt-7">
// //         <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
// //           Voir les <span className="font-bold">Hôtels</span>
// //         </span>
// //       </div>
// //     </div>
// //   </motion.div>
// // </div>

// //     </div>
// //   </div>
// // </section>

// //   )
// // }

// // // --- SectionHeader Component ---
// // interface SectionHeaderProps {
// //   icon?: string
// //   title: string
// //   description?: string
// //   bgColor?: string
// //   textColor?: string
// //   descriptionColor?: string
// //   pandaIcon?: boolean
// // }

// // function SectionHeader({
// //   icon,
// //   title,
// //   description,
// //   bgColor = "bg-transparent",
// //   textColor = "text-gray-900",
// //   descriptionColor = "text-gray-600",
// //   pandaIcon = false,
// // }: SectionHeaderProps) {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, amount: 0.5 }}
// //       transition={{ duration: 0.6 }}
// //       className={`relative flex flex-row items-center justify-center py-4 px-4 rounded-[8px] mb-8 ${bgColor}`}
// //     >
// //       {icon && (
// //         <div className="">
// //           <Image
// //             src={'/images/dev.svg'}
// //             alt="Section Icon"
// //             width={48}
// //             height={48}
// //             className="w-12 h-12 md:w-40 md:h-40"
// //           />
// //         </div>
// //       )}
// //       <h2 className={`${textColor} text-2xl md:text-5xl font-bold text-center`}>{title}</h2>
// //       {description && <p className={`${descriptionColor} mt-2 text-center text-sm md:text-base`}>{description}</p>}
      
// //     </motion.div>
// //   )
// // }

// // // --- CardCarousel Component ---
// // interface CardCarouselProps {
// //   children: React.ReactNode
// // }

// // function CardCarousel({ children }: CardCarouselProps) {
// //   const [currentIndex, setCurrentIndex] = useState(0)
// //   const scrollRef = useRef<HTMLDivElement>(null)

// //   const handleDotClick = (index: number) => {
// //     setCurrentIndex(index)
// //     if (scrollRef.current) {
// //       // Calculate scroll position based on the width of the first child card
// //       // and the gap between cards. Assuming a consistent card width and gap.
// //       const firstChild = scrollRef.current.children[0] as HTMLElement
// //       if (firstChild) {
// //         const cardWidth = firstChild.offsetWidth // Includes padding/border if any
// //         const gap = 16 // Tailwind 'px-2' on child means 8px padding on each side, so 16px total gap between cards
// //         const scrollPosition = index * (cardWidth + gap)
// //         scrollRef.current.scrollTo({
// //           left: scrollPosition,
// //           behavior: "smooth",
// //         })
// //       }
// //     }
// //   }

// //   const totalCards = Array.isArray(children) ? children.length : 1
// //   const dots = Array.from({ length: totalCards }, (_, i) => i)

// //   return (
// //     <div className="relative">
// //       <div
// //         ref={scrollRef}
// //         className="flex overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
// //         onScroll={() => {
// //           if (scrollRef.current) {
// //             const scrollLeft = scrollRef.current.scrollLeft
// //             const firstChild = scrollRef.current.children[0] as HTMLElement
// //             if (firstChild) {
// //               const cardWidth = firstChild.offsetWidth
// //               const gap = 16 // Same gap as used in handleDotClick
// //               setCurrentIndex(Math.round(scrollLeft / (cardWidth + gap)))
// //             }
// //           }
// //         }}
// //       >
// //         {Array.isArray(children) ? (
// //           children.map((child, index) => (
// //             <motion.div
// //               key={index}
// //               className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2 snap-center"
// //               initial={{ opacity: 0, y: 50 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.5, delay: index * 0.1 }}
// //             >
// //               {child}
// //             </motion.div>
// //           ))
// //         ) : (
// //           <motion.div
// //             className="flex-shrink-0 w-full px-2 snap-center"
// //             initial={{ opacity: 0, y: 50 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             {children}
// //           </motion.div>
// //         )}
// //       </div>
// //       <div className="flex justify-center mt-4 space-x-2">
// //         {dots.map((index) => (
// //           <button
// //             key={index}
// //             className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-gray-800" : "bg-gray-300"}`}
// //             onClick={() => handleDotClick(index)}
// //             aria-label={`Go to slide ${index + 1}`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // // --- RestaurantCard Component ---
// // interface RestaurantCardProps {
// //   image: string
// //   title: string
// //   description: string
// //   rating: number
// //   reviews: number
// // }

// // function RestaurantCard({ image, title, description, rating, reviews }: RestaurantCardProps) {
// //   return (
// //     <Card className="w-full rounded-lg  shadow-md hover:shadow-lg transition-shadow duration-300">
// //       <Image
// //         src={"https://toohotel.com/wp-content/uploads/2025/06/TOO_restaurant_Panoramique_vue_Paris_nuit_v2.jpg"}
// //         alt={title}
// //         width={300}
// //         height={200}
// //         className="w-full h-48 object-cover"
// //       />
// //       <CardContent className="p-4">
// //         <div className="flex items-center justify-between mb-2">
// //             <h3 className="text-xl text-primary font-semibold mb-1">{title}</h3>
// //             <div className="flex items-center text-sm text-gray-700">
// //           <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
// //           <span>{rating.toFixed(1)}</span>
// //           <span className="ml-2 text-gray-500">({reviews} avis)</span>
// //         </div>
// //         </div>
        
// //         <p className="text-sm text-gray-600 mb-2">{description}</p>
        
// //       </CardContent>
// //       <CardFooter className="p-4 pt-0">
// //         <Button className="w-fit bg-orange-500 hover:bg-orange-600 text-white rounded-[5px]">Plus d'infos</Button>
// //       </CardFooter>
// //     </Card>
// //   )
// // }

// // // --- HotelCard Component ---
// // interface HotelCardProps {
// //   image: string
// //   title: string
// //   description: string
// //   rating: number
// //   reviews: number
// // }

// // function HotelCard({ image, title, description, rating, reviews }: HotelCardProps) {
// //   return (
// //     <Card className="w-full rounded-[8px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
// //       <Image
// //         src={"https://brigade-hocare.com/info/wp-content/uploads/2024/09/decoration-restaurant.png"}
// //         alt={title}
// //         width={300}
// //         height={200}
// //         className="w-full h-48 object-cover"
// //       />
// //       <CardContent className="p-4">
// //         <h3 className="text-2xl font-bold text-primary mb-1">{title}</h3>
// //         <p className="text-lg text-gray-600 mb-2">{description}</p>
// //         <div className="flex items-center text-sm text-gray-700">
// //           <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
// //           <span>{rating.toFixed(1)}</span>
// //           <span className="ml-2 text-gray-500">({reviews} avis)</span>
// //         </div>
// //       </CardContent>
// //       <CardFooter className="p-4 pt-0">
// //         <Button className="w-fit bg-secondary hover:bg-secondary text-white rounded-[4px]">Plus d'infos</Button>
// //       </CardFooter>
// //     </Card>
// //   )
// // }

// // // --- ActivityCard Component ---
// // interface ActivityCardProps {
// //   image: string
// //   title: string
// //   location: string
// // }

// // function ActivityCard({ image, title, location }: ActivityCardProps) {
// //   return (
// //     <Card className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
// //       <Image
// //         src={image || "/placeholder.svg"}
// //         alt={title}
// //         width={300}
// //         height={200}
// //         className="w-full h-48 object-cover"
// //       />
// //       <CardContent className="p-4">
// //         <h3 className="text-lg font-semibold mb-1">{title}</h3>
// //         <div className="flex items-center text-sm text-gray-600">
// //           <MapPin className="w-4 h-4 mr-1 text-gray-500" />
// //           <span>{location}</span>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   )
// // }

// // // --- MapSection Component ---
// // function MapSection() {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 50 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, amount: 0.3 }}
// //       transition={{ duration: 0.6 }}
// //       className="relative w-full h-[400px] md:h-[700px] rounded-lg overflow-hidden "
// //     >
// //       {/* Iframe de la carte */}
// //       <iframe
// //         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.021286271501!2d-4.016107524225443!3d5.324698935535924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1edf6f6d6df9f%3A0xbac527e7b5c6fc97!2sM%C3%B6venpick%20Hotel%20Abidjan!5e0!3m2!1sfr!2sci!4v1690102063412!5m2!1sfr!2sci"
// //         allowFullScreen
// //         loading="lazy"
// //         referrerPolicy="no-referrer-when-downgrade"
// //         className="absolute inset-0 w-full h-full border-0"
// //       ></iframe>

// //       {/* Marqueur 1 : Mairie du Plateau */}
// //       <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 bg-white p-2 rounded-full shadow-md z-10">
// //         <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
// //         <span className="font-semibold text-sm md:text-base">Mairie du Plateau</span>
// //       </div>

// //       {/* Avatar au centre */}
// //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
// //         <PandaAvatar size="lg" />
// //       </div>

// //       {/* Marqueur 2 : Mövenpick */}
// //       <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 flex items-center space-x-2 bg-white p-2 rounded-full shadow-md z-10">
// //         <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
// //         <span className="font-semibold text-sm md:text-base">Mövenpick Hotel Abidjan</span>
// //       </div>
// //     </motion.div>
// //   )
// // }

// // // --- Main Page Component ---
// // export default function HomePage() {
// //   const restaurants = [
// //     {
// //       id: "1",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Le Régal du Plateau",
// //       description: "Cuisine ivoirienne, Buffet - €€",
// //       rating: 4.5,
// //       reviews: 123,
// //     },
// //     {
// //       id: "2",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Ambiance Chez Kaffi",
// //       description: "Africaine, Grillades - €€€",
// //       rating: 4.8,
// //       reviews: 89,
// //     },
// //     {
// //       id: "3",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Le Bistrot du Plateau",
// //       description: "Française, Brasserie - €€",
// //       rating: 4.2,
// //       reviews: 150,
// //     },
// //     {
// //       id: "4",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Saveurs d'Abidjan",
// //       description: "Fusion, Gastronomique - €€€€",
// //       rating: 4.7,
// //       reviews: 75,
// //     },
// //   ]

// //   const hotels = [
// //     {
// //       id: "1",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Hôtel Pullman Abidjan",
// //       description: "Hôtel de luxe avec vue sur la lagune",
// //       rating: 4.6,
// //       reviews: 250,
// //     },
// //     {
// //       id: "2",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Résidence Le Plateau",
// //       description: "Appartements modernes pour séjours",
// //       rating: 4.3,
// //       reviews: 180,
// //     },
// //     {
// //       id: "3",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Hôtel Tiama",
// //       description: "Hôtel 5 étoiles au cœur du Plateau",
// //       rating: 4.7,
// //       reviews: 300,
// //     },
// //   ]

// //   const activities = [
// //     {
// //       id: "1",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "La Galerie Cécile Fakhoury",
// //       location: "Rue des Jardins, Plateau",
// //     },
// //     {
// //       id: "2",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Le District d'Abidjan Fakhoury",
// //       location: "Rue du Commerce, Plateau",
// //     },
// //     {
// //       id: "3",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Cathédrale Saint-Paul d'Abidjan",
// //       location: "Boulevard de la République",
// //     },
// //     {
// //       id: "4",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Musée des Civilisations de Côte d'Ivoire",
// //       location: "Avenue du 26 Septembre",
// //     },
// //   ]

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <HeroSection />

// //       <main className=" mx-auto  py-8 space-y-16">
// //         <section className="px-20">
// //           <SectionHeader
// //             icon="/placeholder.svg?height=48&width=48"
// //             title="Les meilleures tables du Plateau"
// //             bgColor="bg-orange-400"
// //             textColor="text-white"
// //           />
// //           <CardCarousel>
// //             {restaurants.map((restaurant) => (
// //               <RestaurantCard key={restaurant.id} {...restaurant} />
// //             ))}
// //           </CardCarousel>
// //         </section>

// //        <section className="relative w-full h-[800px] py-10 overflow-hidden">

// //   {/* Vidéo de fond */}
// //   <video
// //     autoPlay
// //     muted
// //     loop
// //     playsInline
// //     className="absolute top-0 left-0 w-full h-full object-cover z-0"
// //   >
// //     <source src="/videos/blue-digital.mp4" type="video/mp4" />
// //     Votre navigateur ne supporte pas la vidéo HTML5.
// //   </video>

// //   {/* Overlay sombre pour meilleure lisibilité */}
// //   {/* <div className="absolute inset-0 bg-black bg-opacity-10 z-10" /> */}

// //   {/* Contenu du carousel */}
// //           <h1 className="text-5xl font-bold text-white text-center">Ou dromir sur le Plateau</h1>
// //   <div className="relative z-20 m-20 bg-white rounded-[8px] px-4  py-20">
// //     <CardCarousel>
// //       {hotels.map((hotel) => (
// //         <HotelCard key={hotel.id} {...hotel} />
// //       ))}
// //     </CardCarousel>
// //   </div>
// // </section>


// //         <section className="px-20">
// //           <SectionHeader
// //             title="Activités & Découvertes"
// //             description=""
// //             textColor="text-green-600"
// //             descriptionColor="text-gray-700"
// //           />
// //           <CardCarousel>
// //             {activities.map((activity) => (
// //               <ActivityCard key={activity.id} {...activity} />
// //             ))}
// //           </CardCarousel>
// //         </section>

// //         <section>
// //           <MapSection />
// //         </section>
// //       </main>
// //     </div>
// //   )
// // // }
// // "use client"

// // import type React from "react"
// // import Image from "next/image"
// // import Link from "next/link" // Import Link
// // import { motion } from "framer-motion"
// // import { Hotel, Star, MapPin } from "lucide-react"
// // import { Card, CardContent, CardFooter } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { useState, useRef } from "react"

// // // --- PandaAvatar Component ---
// // interface PandaAvatarProps {
// //   size?: "sm" | "md" | "lg"
// // }

// // function PandaAvatar({ size = "md" }: PandaAvatarProps) {
// //   const sizeClasses = {
// //     sm: "w-10 h-10",
// //     md: "w-12 h-12",
// //     lg: "w-16 h-16",
// //   }
// //   const avatarSize = sizeClasses[size]
// //   return (
// //     <motion.div
// //       className={`relative rounded-full overflow-hidden border-4 border-white shadow-lg ${avatarSize}`}
// //       initial={{ scale: 0.8, opacity: 0 }}
// //       animate={{ scale: 1, opacity: 1 }}
// //       transition={{ type: "spring", stiffness: 200, damping: 10 }}
// //       whileHover={{ scale: 1.1 }}
// //     >
// //       <Image src="/placeholder.svg?height=64&width=64" alt="Panda Avatar" fill style={{ objectFit: "cover" }} />
// //     </motion.div>
// //   )
// // }

// // // --- HeroSection Component ---
// // function HeroSection() {
// //   const cardVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// //     hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" },
// //   }
// //   const sphereVariants = {
// //     animate: {
// //       y: ["0%", "10%", "-5%", "0%"],
// //       x: ["0%", "-5%", "5%", "0%"],
// //       rotate: [0, 360],
// //       transition: {
// //         duration: 10,
// //         repeat: Number.POSITIVE_INFINITY,
// //         ease: "easeInOut",
// //         repeatType: "reverse",
// //       },
// //     },
// //   }
// //   return (
// //     <section className="relative overflow-hidden py-20 md:py-40 text-white">
// //       {/* Background image */}
// //       <div className="absolute inset-0 z-0">
// //         <Image
// //           src="/images/service2.svg" // ← Remplace par ton image réelle
// //           alt="Image de fond section services"
// //           fill
// //           className="object-cover  z-0"
// //           priority
// //         />
// //         {/* Gradient overlay */}
// //         {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-purple-800 opacity-80" /> */}
// //       </div>
// //       {/* Background spheres */}
// //       {/* Content */}
// //       <div className="relative z-20 container py-32 mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-16">
// //         <motion.div
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.8 }}
// //           className="max-w-4xl text-center lg:text-left"
// //         >
// //           <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-4">Explorez le Plateau autrement !</h1>
// //           <p className="text-lg md:text-2xl opacity-90">
// //             Découvrez les meilleures adresses pour vous restaurer, séjourner ou sortir dans le panorama du Plateau.
// //           </p>
// //         </motion.div>
// //         <div className="relative w-full max-w-md lg:max-w-none lg:w-auto flex flex-col items-center lg:items-end gap-4 mt-8 lg:mt-0">
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //             className="absolute -top-16 right-0 lg:-right-16 z-30"
// //           >
// //             <PandaAvatar size="lg" />
// //           </motion.div>
// //           <div className="grid grid-cols-2 gap-4 w-full max-w-xs md:max-w-sm lg:max-w-none">
// //             {/* Carte 1 en haut à gauche */}
// //             <motion.div
// //               className="bg-white text-blue-800 p-7 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer"
// //               variants={cardVariants}
// //               initial="hidden"
// //               animate="visible"
// //               whileHover="hover"
// //               transition={{ delay: 0.4 }}
// //             >
// //               <div className="py-4">
// //                 <Hotel className="w-16 h-16" />
// //                 <div className="pt-7">
// //                   <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
// //                     Voir les <span className="font-bold">Hôtels</span>
// //                   </span>
// //                 </div>
// //               </div>
// //             </motion.div>
// //             {/* Carte 3 à droite, centrée verticalement sur deux lignes */}
// //             <motion.div
// //               className="bg-white text-blue-800 p-7 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer row-span-2 self-center"
// //               variants={cardVariants}
// //               initial="hidden"
// //               animate="visible"
// //               whileHover="hover"
// //               transition={{ delay: 0.4 }}
// //             >
// //               <div className="py-4">
// //                 <Hotel className="w-16 h-16" />
// //                 <div className="pt-7">
// //                   <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
// //                     Voir les <span className="font-bold">Hôtels</span>
// //                   </span>
// //                 </div>
// //               </div>
// //             </motion.div>
// //             {/* Carte 2 en bas à gauche */}
// //             <motion.div
// //               className="bg-white text-blue-800 p-10 rounded-[5px] shadow-lg flex flex-col gap-2 cursor-pointer"
// //               variants={cardVariants}
// //               initial="hidden"
// //               animate="visible"
// //               whileHover="hover"
// //               transition={{ delay: 0.4 }}
// //             >
// //               <div className="py-4">
// //                 <Hotel className="w-16 h-16" />
// //                 <div className="pt-7">
// //                   <span className="font-medium text-sm md:text-2xl pt-10 pl-2">
// //                     Voir les <span className="font-bold">Hôtels</span>
// //                   </span>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// // // --- SectionHeader Component ---
// // interface SectionHeaderProps {
// //   icon?: string
// //   title: string
// //   description?: string
// //   bgColor?: string
// //   textColor?: string
// //   descriptionColor?: string
// //   pandaIcon?: boolean
// // }

// // function SectionHeader({
// //   icon,
// //   title,
// //   description,
// //   bgColor = "bg-transparent",
// //   textColor = "text-gray-900",
// //   descriptionColor = "text-gray-600",
// //   pandaIcon = false,
// // }: SectionHeaderProps) {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, amount: 0.5 }}
// //       transition={{ duration: 0.6 }}
// //       className={`relative flex flex-row items-center justify-center py-4 px-4 rounded-[8px] mb-8 ${bgColor}`}
// //     >
// //       {icon && (
// //         <div className="">
// //           <Image
// //             src={"/images/dev.svg"}
// //             alt="Section Icon"
// //             width={48}
// //             height={48}
// //             className="w-12 h-12 md:w-40 md:h-40"
// //           />
// //         </div>
// //       )}
// //       <h2 className={`${textColor} text-2xl md:text-5xl font-bold text-center`}>{title}</h2>
// //       {description && <p className={`${descriptionColor} mt-2 text-center text-sm md:text-base`}>{description}</p>}
// //     </motion.div>
// //   )
// // }

// // // --- CardCarousel Component ---
// // interface CardCarouselProps {
// //   children: React.ReactNode
// // }

// // function CardCarousel({ children }: CardCarouselProps) {
// //   const [currentIndex, setCurrentIndex] = useState(0)
// //   const scrollRef = useRef<HTMLDivElement>(null)

// //   const handleDotClick = (index: number) => {
// //     setCurrentIndex(index)
// //     if (scrollRef.current) {
// //       // Calculate scroll position based on the width of the first child card
// //       // and the gap between cards. Assuming a consistent card width and gap.
// //       const firstChild = scrollRef.current.children[0] as HTMLElement
// //       if (firstChild) {
// //         const cardWidth = firstChild.offsetWidth // Includes padding/border if any
// //         const gap = 16 // Tailwind 'px-2' on child means 8px padding on each side, so 16px total gap between cards
// //         const scrollPosition = index * (cardWidth + gap)
// //         scrollRef.current.scrollTo({
// //           left: scrollPosition,
// //           behavior: "smooth",
// //         })
// //       }
// //     }
// //   }

// //   const totalCards = Array.isArray(children) ? children.length : 1
// //   const dots = Array.from({ length: totalCards }, (_, i) => i)

// //   return (
// //     <div className="relative">
// //       <div
// //         ref={scrollRef}
// //         className="flex overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
// //         onScroll={() => {
// //           if (scrollRef.current) {
// //             const scrollLeft = scrollRef.current.scrollLeft
// //             const firstChild = scrollRef.current.children[0] as HTMLElement
// //             if (firstChild) {
// //               const cardWidth = firstChild.offsetWidth
// //               const gap = 16 // Same gap as used in handleDotClick
// //               setCurrentIndex(Math.round(scrollLeft / (cardWidth + gap)))
// //             }
// //           }
// //         }}
// //       >
// //         {Array.isArray(children) ? (
// //           children.map((child, index) => (
// //             <motion.div
// //               key={index}
// //               className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2 snap-center"
// //               initial={{ opacity: 0, y: 50 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.5, delay: index * 0.1 }}
// //             >
// //               {child}
// //             </motion.div>
// //           ))
// //         ) : (
// //           <motion.div
// //             className="flex-shrink-0 w-full px-2 snap-center"
// //             initial={{ opacity: 0, y: 50 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             {children}
// //           </motion.div>
// //         )}
// //       </div>
// //       <div className="flex justify-center mt-4 space-x-2">
// //         {dots.map((index) => (
// //           <button
// //             key={index}
// //             className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-gray-800" : "bg-gray-300"}`}
// //             onClick={() => handleDotClick(index)}
// //             aria-label={`Go to slide ${index + 1}`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // // --- RestaurantCard Component ---
// // interface RestaurantCardProps {
// //   id: string // Added id prop
// //   image: string
// //   title: string
// //   description: string
// //   rating: number
// //   reviews: number
// // }

// // function RestaurantCard({ id, image, title, description, rating, reviews }: RestaurantCardProps) {
// //   return (
// //     <Card className="w-full rounded-lg  shadow-md hover:shadow-lg transition-shadow duration-300">
// //       <Image
// //         src={"https://toohotel.com/wp-content/uploads/2025/06/TOO_restaurant_Panoramique_vue_Paris_nuit_v2.jpg"}
// //         alt={title}
// //         width={300}
// //         height={200}
// //         className="w-full h-48 object-cover"
// //       />
// //       <CardContent className="p-4">
// //         <div className="flex items-center justify-between mb-2">
// //           <h3 className="text-xl text-primary font-semibold mb-1">{title}</h3>
// //           <div className="flex items-center text-sm text-gray-700">
// //             <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
// //             <span>{rating.toFixed(1)}</span>
// //             <span className="ml-2 text-gray-500">({reviews} avis)</span>
// //           </div>
// //         </div>
// //         <p className="text-sm text-gray-600 mb-2">{description}</p>
// //       </CardContent>
// //       <CardFooter className="p-4 pt-0">
// //         <Link href={`/ou-aller/${id}`}>
// //           <Button className="w-fit bg-orange-500 hover:bg-orange-600 text-white rounded-[5px]">Plus d'infos</Button>
// //         </Link>
// //       </CardFooter>
// //     </Card>
// //   )
// // }

// // // --- HotelCard Component ---
// // interface HotelCardProps {
// //   id: string // Added id prop
// //   image: string
// //   title: string
// //   description: string
// //   rating: number
// //   reviews: number
// // }

// // function HotelCard({ id, image, title, description, rating, reviews }: HotelCardProps) {
// //   return (
// //     <Card className="w-full rounded-[8px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
// //       <Image
// //         src={"https://brigade-hocare.com/info/wp-content/uploads/2024/09/decoration-restaurant.png"}
// //         alt={title}
// //         width={300}
// //         height={200}
// //         className="w-full h-48 object-cover"
// //       />
// //       <CardContent className="p-4">
// //         <h3 className="text-2xl font-bold text-primary mb-1">{title}</h3>
// //         <p className="text-lg text-gray-600 mb-2">{description}</p>
// //         <div className="flex items-center text-sm text-gray-700">
// //           <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
// //           <span>{rating.toFixed(1)}</span>
// //           <span className="ml-2 text-gray-500">({reviews} avis)</span>
// //         </div>
// //       </CardContent>
// //       <CardFooter className="p-4 pt-0">
// //         <Link href={`/ou-aller/${id}`}>
// //           <Button className="w-fit bg-secondary hover:bg-secondary text-white rounded-[4px]">Plus d'infos</Button>
// //         </Link>
// //       </CardFooter>
// //     </Card>
// //   )
// // }

// // // --- ActivityCard Component ---
// // interface ActivityCardProps {
// //   id: string // Added id prop
// //   image: string
// //   title: string
// //   location: string
// // }

// // function ActivityCard({ id, image, title, location }: ActivityCardProps) {
// //   return (
// //     <Card className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
// //       <Image
// //         src={image || "/placeholder.svg"}
// //         alt={title}
// //         width={300}
// //         height={200}
// //         className="w-full h-48 object-cover"
// //       />
// //       <CardContent className="p-4">
// //         <h3 className="text-lg font-semibold mb-1">{title}</h3>
// //         <div className="flex items-center text-sm text-gray-600">
// //           <MapPin className="w-4 h-4 mr-1 text-gray-500" />
// //           <span>{location}</span>
// //         </div>
// //       </CardContent>
// //       <CardFooter className="p-4 pt-0">
// //         <Link href={`/ou-aller/${id}`}>
// //           <Button className="w-fit bg-gray-800 hover:bg-gray-700 text-white rounded-[5px]">Plus d'infos</Button>
// //         </Link>
// //       </CardFooter>
// //     </Card>
// //   )
// // }

// // // --- MapSection Component ---
// // function MapSection() {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 50 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, amount: 0.3 }}
// //       transition={{ duration: 0.6 }}
// //       className="relative w-full h-[400px] md:h-[700px] rounded-lg overflow-hidden "
// //     >
// //       {/* Iframe de la carte */}
// //       <iframe
// //         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.021286271501!2d-4.016107524225443!3d5.324698935535924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1edf6f6d6df9f%3A0xbac527e7b5c6fc97!2sM%C3%B6venpick%20Hotel%20Abidjan!5e0!3m2!1sfr!2sci!4v1690102063412!5m2!1sfr!2sci"
// //         allowFullScreen
// //         loading="lazy"
// //         referrerPolicy="no-referrer-when-downgrade"
// //         className="absolute inset-0 w-full h-full border-0"
// //       ></iframe>
// //       {/* Marqueur 1 : Mairie du Plateau */}
// //       <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 bg-white p-2 rounded-full shadow-md z-10">
// //         <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
// //         <span className="font-semibold text-sm md:text-base">Mairie du Plateau</span>
// //       </div>
// //       {/* Avatar au centre */}
// //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
// //         <PandaAvatar size="lg" />
// //       </div>
// //       {/* Marqueur 2 : Mövenpick */}
// //       <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 flex items-center space-x-2 bg-white p-2 rounded-full shadow-md z-10">
// //         <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
// //         <span className="font-semibold text-sm md:text-base">Mövenpick Hotel Abidjan</span>
// //       </div>
// //     </motion.div>
// //   )
// // }

// // // --- Main Page Component ---
// // export default function HomePage() {
// //   const restaurants = [
// //     {
// //       id: "restaurant-1",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Le Régal du Plateau",
// //       description: "Cuisine ivoirienne, Buffet - €€",
// //       rating: 4.5,
// //       reviews: 123,
// //     },
// //     {
// //       id: "restaurant-2",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Ambiance Chez Kaffi",
// //       description: "Africaine, Grillades - €€€",
// //       rating: 4.8,
// //       reviews: 89,
// //     },
// //     {
// //       id: "restaurant-3",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Le Bistrot du Plateau",
// //       description: "Française, Brasserie - €€",
// //       rating: 4.2,
// //       reviews: 150,
// //     },
// //     {
// //       id: "restaurant-4",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Saveurs d'Abidjan",
// //       description: "Fusion, Gastronomique - €€€€",
// //       rating: 4.7,
// //       reviews: 75,
// //     },
// //   ]
// //   const hotels = [
// //     {
// //       id: "hotel-1",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Hôtel Pullman Abidjan",
// //       description: "Hôtel de luxe avec vue sur la lagune",
// //       rating: 4.6,
// //       reviews: 250,
// //     },
// //     {
// //       id: "hotel-2",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Résidence Le Plateau",
// //       description: "Appartements modernes pour séjours",
// //       rating: 4.3,
// //       reviews: 180,
// //     },
// //     {
// //       id: "hotel-3",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Hôtel Tiama",
// //       description: "Hôtel 5 étoiles au cœur du Plateau",
// //       rating: 4.7,
// //       reviews: 300,
// //     },
// //   ]
// //   const activities = [
// //     {
// //       id: "activity-1",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "La Galerie Cécile Fakhoury",
// //       location: "Rue des Jardins, Plateau",
// //     },
// //     {
// //       id: "activity-2",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Le District d'Abidjan Fakhoury",
// //       location: "Rue du Commerce, Plateau",
// //     },
// //     {
// //       id: "activity-3",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Cathédrale Saint-Paul d'Abidjan",
// //       location: "Boulevard de la République",
// //     },
// //     {
// //       id: "activity-4",
// //       image: "/placeholder.svg?height=200&width=300",
// //       title: "Musée des Civilisations de Côte d'Ivoire",
// //       location: "Avenue du 26 Septembre",
// //     },
// //   ]
// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <HeroSection />
// //       <main className=" mx-auto  py-8 space-y-16">
// //         <section className="px-20">
// //           <SectionHeader
// //             icon="/placeholder.svg?height=48&width=48"
// //             title="Les meilleures tables du Plateau"
// //             bgColor="bg-orange-400"
// //             textColor="text-white"
// //           />
// //           <CardCarousel>
// //             {restaurants.map((restaurant) => (
// //               <RestaurantCard key={restaurant.id}
// //               //@ts-ignore
// //                id={restaurant.id} {...restaurant} />
// //             ))}
// //           </CardCarousel>
// //         </section>
// //         <section className="relative w-full h-[800px] py-10 overflow-hidden">
// //           {/* Vidéo de fond */}
// //           <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
// //             <source src="/videos/blue-digital.mp4" type="video/mp4" />
// //             Votre navigateur ne supporte pas la vidéo HTML5.
// //           </video>
// //           {/* Overlay sombre pour meilleure lisibilité */}
// //           {/* <div className="absolute inset-0 bg-black bg-opacity-10 z-10" /> */}
// //           {/* Contenu du carousel */}
// //           <h1 className="text-5xl font-bold text-white text-center">Ou dromir sur le Plateau</h1>
// //           <div className="relative z-20 m-20 mb-20 bg-white rounded-[8px] px-4  py-10">
// //              <SectionHeader
// //             title="Ou Sejourner au Plateau ?"
// //             description=""
// //             textColor="text-green-600"
// //             descriptionColor="text-gray-700"
// //           />
// //             <CardCarousel>
// //               {hotels.map((hotel) => (
// //                 <HotelCard key={hotel.id}
// //                 //@ts-ignore
// //                  id={hotel.id} {...hotel} />
// //               ))}
// //             </CardCarousel>
// //           </div>
// //         </section>
// //         <section className="px-20">
// //           <SectionHeader
// //             title="Activités & Découvertes"
// //             description=""
// //             textColor="text-green-600"
// //             descriptionColor="text-gray-700"
// //           />
// //           <CardCarousel>
// //             {activities.map((activity) => (
// //               <ActivityCard key={activity.id}
// //               //@ts-ignore
// //                id={activity.id} {...activity} />
// //             ))}
// //           </CardCarousel>
// //         </section>
// //         <section>
// //           <MapSection />
// //         </section>
// //       </main>
// //     </div>
// //   )
// // }




















// "use client"

// import type React from "react"

// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
// import { useState, useRef, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Hotel, Star, MapPin, Utensils, Camera, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

// // Animation variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 60 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -60 },
// }

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// }

// const scaleOnHover = {
//   whileHover: {
//     scale: 1.05,
//     transition: { type: "spring", stiffness: 300, damping: 20 },
//   },
//   whileTap: { scale: 0.95 },
// }

// // Floating Avatar Component
// function FloatingAvatar() {
//   return (
//     <motion.div
//       className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl"
//       animate={{
//         y: [0, -10, 0],
//         rotate: [0, 5, -5, 0],
//       }}
//       transition={{
//         duration: 4,
//         repeat: Number.POSITIVE_INFINITY,
//         ease: "easeInOut",
//       }}
//       whileHover={{ scale: 1.1 }}
//     >
//       <Image src="/cute-panda-avatar.png" alt="Panda Avatar" fill className="object-cover" />
//     </motion.div>
//   )
// }

// // Hero Section
// function HeroSection() {
//   const { scrollYProgress } = useScroll()
//   const y = useTransform(scrollYProgress, [0, 1], [0, -100])
//   const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

//   const categoryCards = [
//     { icon: Utensils, title: "Restaurants", color: "bg-orange-500", delay: 0.2 },
//     { icon: Hotel, title: "Hôtels", color: "bg-blue-500", delay: 0.4 },
//     { icon: Camera, title: "Activités", color: "bg-green-500", delay: 0.6 },
//   ]

//   return (
//     <motion.section
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
//       style={{ y, opacity }}
//     >
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full opacity-20"
//             animate={{
//               x: [0, Math.random() * 100 - 50],
//               y: [0, Math.random() * 100 - 50],
//               opacity: [0.2, 0.8, 0.2],
//             }}
//             transition={{
//               duration: Math.random() * 3 + 2,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left content */}
//           <motion.div
//             variants={staggerContainer}
//             initial="initial"
//             animate="animate"
//             className="text-center lg:text-left"
//           >
//             <motion.h1
//               variants={fadeInUp}
//               className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
//             >
//               Explorez le{" "}
//               <motion.span
//                 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"
//                 animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
//                 transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//               >
//                 Plateau
//               </motion.span>{" "}
//               autrement !
//             </motion.h1>

//             <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
//               Découvrez les meilleures adresses pour vous restaurer, séjourner ou sortir dans le panorama du Plateau.
//             </motion.p>

//             <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center lg:justify-start">
//               <motion.button
//                 className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg"
//                 whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Commencer l'exploration
//               </motion.button>
//             </motion.div>
//           </motion.div>

//           {/* Right content - Category cards */}
//           <motion.div variants={staggerContainer} initial="initial" animate="animate" className="relative">
//             <div className="absolute -top-8 -right-8 z-20">
//               <FloatingAvatar />
//             </div>

//             <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//               {categoryCards.map((card, index) => (
//                 <motion.div
//                   key={card.title}
//                   variants={fadeInUp}
//                   transition={{ delay: card.delay }}
//                   className={`${card.color} ${index === 2 ? "col-span-2" : ""} p-6 rounded-2xl text-white cursor-pointer group`}
//                   {...scaleOnHover}
//                 >
//                   <card.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
//                   <h3 className="font-semibold text-lg">{card.title}</h3>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.section>
//   )
// }

// // Modern Card Component
// interface ModernCardProps {
//   image: string
//   title: string
//   description: string
//   rating?: number
//   reviews?: number
//   location?: string
//   category: "restaurant" | "hotel" | "activity"
//   id: string
// }

// function ModernCard({ image, title, description, rating, reviews, location, category, id }: ModernCardProps) {
//   const [isHovered, setIsHovered] = useState(false)

//   const categoryColors = {
//     restaurant: "from-orange-500 to-red-500",
//     hotel: "from-blue-500 to-indigo-500",
//     activity: "from-green-500 to-teal-500",
//   }

//   return (
//     <motion.div
//       className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       whileHover={{ y: -8 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//     >
//       <div className="relative h-48 overflow-hidden">
//         <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
//           <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
//         </motion.div>

//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-t ${categoryColors[category]} opacity-0 group-hover:opacity-20 transition-opacity`}
//         />

//         {rating && (
//           <motion.div
//             className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//             <span className="text-sm font-semibold">{rating}</span>
//           </motion.div>
//         )}
//       </div>

//       <div className="p-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>

//         <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

//         {location && (
//           <div className="flex items-center text-gray-500 mb-4">
//             <MapPin className="w-4 h-4 mr-2" />
//             <span className="text-sm">{location}</span>
//           </div>
//         )}

//         {reviews && <p className="text-sm text-gray-500 mb-4">({reviews} avis)</p>}

//         <Link href={`/ou-aller/${id}`}>
//           <motion.button
//             className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${categoryColors[category]}`}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Plus d'infos
//           </motion.button>
//         </Link>
//       </div>
//     </motion.div>
//   )
// }

// // Modern Carousel Component
// interface ModernCarouselProps {
//   title: string
//   subtitle?: string
//   children: React.ReactNode[]
//   bgColor?: string
// }

// function ModernCarousel({ title, subtitle, children, bgColor = "bg-gray-50" }: ModernCarouselProps) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
//   const scrollRef = useRef<HTMLDivElement>(null)

//   const totalSlides = Math.ceil(children.length / 3) // 3 cards per slide on desktop

//   useEffect(() => {
//     if (!isAutoPlaying) return

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % totalSlides)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [isAutoPlaying, totalSlides])

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index)
//     if (scrollRef.current) {
//       const slideWidth = scrollRef.current.offsetWidth
//       scrollRef.current.scrollTo({
//         left: index * slideWidth,
//         behavior: "smooth",
//       })
//     }
//   }

//   return (
//     <section className={`py-20 ${bgColor}`}>
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
//           {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
//         </motion.div>

//         {/* Carousel */}
//         <div className="relative">
//           <div
//             ref={scrollRef}
//             className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             {children.map((child, index) => (
//               <motion.div
//                 key={index}
//                 className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center"
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 {child}
//               </motion.div>
//             ))}
//           </div>

//           {/* Navigation */}
//           <div className="flex items-center justify-center gap-4 mt-8">
//             <motion.button
//               onClick={() => goToSlide(Math.max(0, currentIndex - 1))}
//               className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </motion.button>

//             <div className="flex gap-2">
//               {[...Array(totalSlides)].map((_, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//                   }`}
//                   whileHover={{ scale: 1.2 }}
//                 />
//               ))}
//             </div>

//             <motion.button
//               onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//               className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//             </motion.button>

//             <motion.button
//               onClick={() => goToSlide(Math.min(totalSlides - 1, currentIndex + 1))}
//               className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronRight className="w-5 h-5" />
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// // Interactive Map Section
// function InteractiveMap() {
//   const [selectedMarker, setSelectedMarker] = useState<string | null>(null)

//   const markers = [
//     { id: "mairie", name: "Mairie du Plateau", x: 25, y: 30, color: "bg-red-500" },
//     { id: "movenpick", name: "Mövenpick Hotel", x: 75, y: 70, color: "bg-blue-500" },
//     { id: "restaurant", name: "Restaurant Le Plateau", x: 50, y: 45, color: "bg-green-500" },
//   ]

//   return (
//     <section className="py-20 bg-slate-900">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Explorez la carte</h2>
//           <p className="text-xl text-gray-300">Découvrez tous les lieux incontournables</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
//         >
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.021286271501!2d-4.016107524225443!3d5.324698935535924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1edf6f6d6df9f%3A0xbac527e7b5c6fc97!2sM%C3%B6venpick%20Hotel%20Abidjan!5e0!3m2!1sfr!2sci!4v1690102063412!5m2!1sfr!2sci"
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             className="w-full h-full border-0"
//           />

//           {/* Interactive markers */}
//           {markers.map((marker) => (
//             <motion.div
//               key={marker.id}
//               className={`absolute w-4 h-4 ${marker.color} rounded-full cursor-pointer z-10`}
//               style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
//               animate={{
//                 scale: selectedMarker === marker.id ? 1.5 : 1,
//                 boxShadow: selectedMarker === marker.id ? "0 0 20px rgba(255,255,255,0.8)" : "0 0 10px rgba(0,0,0,0.3)",
//               }}
//               onClick={() => setSelectedMarker(selectedMarker === marker.id ? null : marker.id)}
//               whileHover={{ scale: 1.3 }}
//             >
//               <AnimatePresence>
//                 {selectedMarker === marker.id && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
//                   >
//                     <span className="text-sm font-semibold text-gray-900">{marker.name}</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))}

//           {/* Floating avatar */}
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
//             <FloatingAvatar />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// // Main Page Component
// export default function HomePage() {
//   const restaurants = [
//     {
//       id: "restaurant-1",
//       image: "https://toohotel.com/wp-content/uploads/2025/06/TOO_restaurant_Panoramique_vue_Paris_nuit_v2.jpg",
//       title: "Le Régal du Plateau",
//       description: "Cuisine ivoirienne authentique avec vue panoramique",
//       rating: 4.5,
//       reviews: 123,
//       category: "restaurant" as const,
//     },
//     {
//       id: "restaurant-2",
//       image: "https://brigade-hocare.com/info/wp-content/uploads/2024/09/decoration-restaurant.png",
//       title: "Ambiance Chez Kaffi",
//       description: "Spécialités africaines et grillades dans un cadre chaleureux",
//       rating: 4.8,
//       reviews: 89,
//       category: "restaurant" as const,
//     },
//     {
//       id: "restaurant-3",
//       image: "/elegant-french-bistrot.png",
//       title: "Le Bistrot du Plateau",
//       description: "Cuisine française raffinée au cœur d'Abidjan",
//       rating: 4.2,
//       reviews: 150,
//       category: "restaurant" as const,
//     },
//     {
//       id: "restaurant-4",
//       image: "/placeholder-m6pts.png",
//       title: "Saveurs d'Abidjan",
//       description: "Fusion gastronomique entre tradition et modernité",
//       rating: 4.7,
//       reviews: 75,
//       category: "restaurant" as const,
//     },
//   ]

//   const hotels = [
//     {
//       id: "hotel-1",
//       image: "/luxury-hotel-lobby.png",
//       title: "Hôtel Pullman Abidjan",
//       description: "Hôtel de luxe avec vue imprenable sur la lagune",
//       rating: 4.6,
//       reviews: 250,
//       category: "hotel" as const,
//     },
//     {
//       id: "hotel-2",
//       image: "/modern-apartment-building.png",
//       title: "Résidence Le Plateau",
//       description: "Appartements modernes pour séjours d'affaires",
//       rating: 4.3,
//       reviews: 180,
//       category: "hotel" as const,
//     },
//     {
//       id: "hotel-3",
//       image: "/luxurious-hotel-exterior.png",
//       title: "Hôtel Tiama",
//       description: "Excellence 5 étoiles au cœur du quartier d'affaires",
//       rating: 4.7,
//       reviews: 300,
//       category: "hotel" as const,
//     },
//   ]

//   const activities = [
//     {
//       id: "activity-1",
//       image: "/art-gallery-interior.png",
//       title: "Galerie Cécile Fakhoury",
//       description: "Art contemporain africain",
//       location: "Rue des Jardins, Plateau",
//       category: "activity" as const,
//     },
//     {
//       id: "activity-2",
//       image: "/modern-cathedral.png",
//       title: "Cathédrale Saint-Paul",
//       description: "Architecture moderne emblématique",
//       location: "Boulevard de la République",
//       category: "activity" as const,
//     },
//     {
//       id: "activity-3",
//       image: "/museum-exhibition-hall.png",
//       title: "Musée des Civilisations",
//       description: "Patrimoine culturel ivoirien",
//       location: "Avenue du 26 Septembre",
//       category: "activity" as const,
//     },
//     {
//       id: "activity-4",
//       image: "/cultural-center-exterior.png",
//       title: "Centre Culturel Français",
//       description: "Événements et expositions",
//       location: "Cocody-Les Deux Plateaux",
//       category: "activity" as const,
//     },
//   ]

//   return (
//     <div className="min-h-screen">
//       <HeroSection />

//       <ModernCarousel
//         title="Les meilleures tables du Plateau"
//         subtitle="Découvrez une cuisine d'exception dans un cadre unique"
//         bgColor="bg-orange-50"
//       >
//         {restaurants.map((restaurant) => (
//           <ModernCard key={restaurant.id} {...restaurant} />
//         ))}
//       </ModernCarousel>

//       <ModernCarousel
//         title="Où séjourner au Plateau"
//         subtitle="Confort et élégance pour un séjour inoubliable"
//         bgColor="bg-blue-50"
//       >
//         {hotels.map((hotel) => (
//           <ModernCard key={hotel.id} {...hotel} />
//         ))}
//       </ModernCarousel>

//       <ModernCarousel
//         title="Activités & Découvertes"
//         subtitle="Explorez la richesse culturelle du Plateau"
//         bgColor="bg-green-50"
//       >
//         {activities.map((activity) => (
//           <ModernCard key={activity.id} {...activity} />
//         ))}
//       </ModernCarousel>

//       <InteractiveMap />
//     </div>
//   )
// }
"use client"

import type React from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Hotel, Star, MapPin, Utensils, Camera, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useRestaurantsQuery, useHotelsQuery, useActivitiesQuery } from "@/hooks/places/use-places-queries"
import { Skeleton } from "@/components/ui/skeleton"
import { getImageUrl } from "@/lib/api/client"
import { link } from "fs"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  whileTap: { scale: 0.95 },
}

// Floating Avatar Component
function FloatingAvatar() {
  return (
    <motion.div
      className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.1 }}
    >
      <Image src="/cute-panda-avatar.png" alt="Panda Avatar" fill className="object-cover" />
    </motion.div>
  )
}

// Hero Section
function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const categoryCards = [
    { icon: Utensils, title: "Restaurants", color: "bg-orange-500", delay: 0.2 ,link:"/ou-aller/places?type=restaurants"},
    { icon: Hotel, title: "Hôtels", color: "bg-blue-500", delay: 0.4,link:"/ou-aller/places?type=hotels" },
    { icon: Camera, title: "Activités", color: "bg-green-500", delay: 0.6 ,link:"/ou-aller/places?type=activites"},
  ]

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      style={{ y, opacity }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Explorez le{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Plateau
              </motion.span>{" "}
              autrement !
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
              Découvrez les meilleures adresses pour vous restaurer, séjourner ou sortir dans le panorama du Plateau.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Commencer l'exploration
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right content - Category cards */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="relative">
            <div className="absolute -top-8 -right-8 z-20">
              <FloatingAvatar />
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {categoryCards.map((card, index) => (
                 //@ts-ignore
                <motion.div
                  onClick={()=>window.location.href=card.link}
                  key={card.title}
                  variants={fadeInUp}
                  transition={{ delay: card.delay }}
                  className={`${card.color} ${index === 2 ? "col-span-2" : ""} p-6 rounded-2xl text-white cursor-pointer group`}
                  {...scaleOnHover}
                >
                  <card.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// Modern Card Component
interface ModernCardProps {
  image: string
  title: string
  description: string
  rating?: number
  reviews?: number
  location?: string
  category: "restaurant" | "hotel" | "activity"
  id: string
}

function ModernCard({ image, title, description, rating, reviews, location, category, id }: ModernCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const categoryColors = {
    restaurant: "from-orange-500 to-red-500",
    hotel: "from-blue-500 to-indigo-500",
    activity: "from-green-500 to-teal-500",
  }

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
          <Image src={getImageUrl(image) || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </motion.div>

        <motion.div
          className={`absolute inset-0 bg-gradient-to-t ${categoryColors[category]} opacity-0 group-hover:opacity-20 transition-opacity`}
        />

        {rating && (
          <motion.div
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">{rating}</span>
          </motion.div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        {location && (
          <div className="flex items-center text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
        )}

        {reviews && <p className="text-sm text-gray-500 mb-4">({reviews} avis)</p>}

        <Link href={`/ou-aller/${id}`}>
          <motion.button
            className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${categoryColors[category]}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Plus d'infos
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

// Modern Carousel Component
interface ModernCarouselProps {
  title: string
  subtitle?: string
  children: React.ReactNode[]
  bgColor?: string
}

function ModernCarousel({ title, subtitle, children, bgColor = "bg-gray-50" }: ModernCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const totalSlides = Math.ceil(children.length / 3) // 3 cards per slide on desktop

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.offsetWidth
      scrollRef.current.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {children.map((child, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {child}
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => goToSlide(Math.max(0, currentIndex - 1))}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {[...Array(totalSlides)].map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </motion.button> */}

            <motion.button
              onClick={() => goToSlide(Math.min(totalSlides - 1, currentIndex + 1))}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Interactive Map Section
function InteractiveMap() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)

  const markers = [
    { id: "mairie", name: "Mairie du Plateau", x: 25, y: 30, color: "bg-red-500" },
    { id: "movenpick", name: "Mövenpick Hotel", x: 75, y: 70, color: "bg-blue-500" },
    { id: "restaurant", name: "Restaurant Le Plateau", x: 50, y: 45, color: "bg-green-500" },
  ]

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Explorez la carte</h2>
          <p className="text-xl text-gray-300">Découvrez tous les lieux incontournables</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.021286271501!2d-4.016107524225443!3d5.324698935535924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1edf6f6d6df9f%3A0xbac527e7b5c6fc97!2sM%C3%B6venpick%20Hotel%20Abidjan!5e0!3m2!1sfr!2sci!4v1690102063412!5m2!1sfr!2sci"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />

          {/* Interactive markers */}
          {markers.map((marker) => (
            <motion.div
              key={marker.id}
              className={`absolute w-4 h-4 ${marker.color} rounded-full cursor-pointer z-10`}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              animate={{
                scale: selectedMarker === marker.id ? 1.5 : 1,
                boxShadow: selectedMarker === marker.id ? "0 0 20px rgba(255,255,255,0.8)" : "0 0 10px rgba(0,0,0,0.3)",
              }}
              onClick={() => setSelectedMarker(selectedMarker === marker.id ? null : marker.id)}
              whileHover={{ scale: 1.3 }}
            >
              <AnimatePresence>
                {selectedMarker === marker.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
                  >
                    <span className="text-sm font-semibold text-gray-900">{marker.name}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Floating avatar */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <FloatingAvatar />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component with real data
export default function HomePage() {
  const { data: restaurantsData, isLoading: restaurantsLoading } = useRestaurantsQuery({ limit: 8 })
  const { data: hotelsData, isLoading: hotelsLoading } = useHotelsQuery({ limit: 6 })
  const { data: activitiesData, isLoading: activitiesLoading } = useActivitiesQuery({ limit: 8 })

  const restaurants = restaurantsData?.data || []
  const hotels = hotelsData?.data || []
  const activities = activitiesData?.data || []

  return (
    <div className="min-h-screen">
      <HeroSection />

      <ModernCarousel
        title="Les meilleures tables du Plateau"
        subtitle="Découvrez une cuisine d'exception dans un cadre unique"
        bgColor="bg-orange-50"
      >
        {restaurantsLoading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          : restaurants.map((restaurant) => (
              <ModernCard
                key={restaurant.id}
                id={restaurant.id}
                image={restaurant.poster || "/placeholder.svg"}
                title={restaurant.title}
                description={restaurant.description}
                location={restaurant.address}
                category="restaurant"
              />
            ))}
      </ModernCarousel>

      <ModernCarousel
        title="Où séjourner au Plateau"
        subtitle="Confort et élégance pour un séjour inoubliable"
        bgColor="bg-blue-50"
      >
        {hotelsLoading
          ? [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          : hotels.map((hotel) => (
              <ModernCard
                key={hotel.id}
                id={hotel.id}
                image={hotel.poster || "/placeholder.svg"}
                title={hotel.title}
                description={hotel.description}
                location={hotel.address}
                category="hotel"
              />
            ))}
      </ModernCarousel>

      <ModernCarousel
        title="Activités & Découvertes"
        subtitle="Explorez la richesse culturelle du Plateau"
        bgColor="bg-green-50"
      >
        {activitiesLoading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          : activities.map((activity) => (
              <ModernCard
                key={activity.id}
                id={activity.id}
                image={activity.poster || "/placeholder.svg"}
                title={activity.title}
                description={activity.description}
                location={activity.address}
                category="activity"
              />
            ))}
      </ModernCarousel>

      <InteractiveMap />
    </div>
  )
}
