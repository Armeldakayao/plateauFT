// "use client"

// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Star, MapPin, Phone, Globe, Info } from "lucide-react"
// import { Badge } from "@/components/ui/badge"

// // Define the data structure for a detail item
// interface DetailItem {
//   id: string
//   type: "restaurant" | "hotel" | "activity"
//   image: string
//   title: string
//   description: string
//   rating?: number
//   reviews?: number
//   location?: string // For activities
//   address?: string
//   phone?: string
//   website?: string
//   // Add more specific details as needed
// }

// // Fake data for demonstration
// const allItems: DetailItem[] = [
//   {
//     id: "restaurant-1",
//     type: "restaurant",
//     image: "/placeholder.svg?height=400&width=600&text=Le+Régal+du+Plateau",
//     title: "Le Régal du Plateau",
//     description:
//       "Découvrez une cuisine ivoirienne authentique et savoureuse dans un cadre chaleureux. Notre buffet varié et nos spécialités locales raviront vos papilles. Idéal pour les déjeuners d'affaires et les dîners en famille.",
//     rating: 4.5,
//     reviews: 123,
//     address: "Rue du Commerce, Immeuble Le Régal, Plateau, Abidjan",
//     phone: "+225 07 07 07 07 07",
//     website: "https://www.leregalduplateau.ci",
//   },
//   {
//     id: "restaurant-2",
//     type: "restaurant",
//     image: "/placeholder.svg?height=400&width=600&text=Ambiance+Chez+Kaffi",
//     title: "Ambiance Chez Kaffi",
//     description:
//       "Un lieu emblématique pour les grillades africaines et une ambiance conviviale. Venez déguster nos brochettes et poissons braisés dans une atmosphère festive.",
//     rating: 4.8,
//     reviews: 89,
//     address: "Boulevard de la République, Plateau, Abidjan",
//     phone: "+225 05 05 05 05 05",
//     website: "https://www.chezkaffi.ci",
//   },
//   {
//     id: "restaurant-3",
//     type: "restaurant",
//     image: "/placeholder.svg?height=400&width=600&text=Le+Bistrot+du+Plateau",
//     title: "Le Bistrot du Plateau",
//     description:
//       "Cuisine française classique et brasserie élégante. Profitez d'un cadre raffiné pour vos repas d'affaires ou vos dîners romantiques.",
//     rating: 4.2,
//     reviews: 150,
//     address: "Avenue Chardy, Plateau, Abidjan",
//     phone: "+225 01 01 01 01 01",
//     website: "https://www.lebistrotduplateau.ci",
//   },
//   {
//     id: "restaurant-4",
//     type: "restaurant",
//     image: "/placeholder.svg?height=400&width=600&text=Saveurs+d'Abidjan",
//     title: "Saveurs d'Abidjan",
//     description:
//       "Une expérience culinaire fusion, mêlant saveurs locales et internationales. Un restaurant gastronomique pour une soirée inoubliable.",
//     rating: 4.7,
//     reviews: 75,
//     address: "Rue des Banques, Plateau, Abidjan",
//     phone: "+225 03 03 03 03 03",
//     website: "https://www.saveursdabidjan.ci",
//   },
//   {
//     id: "hotel-1",
//     type: "hotel",
//     image: "/placeholder.svg?height=400&width=600&text=Hôtel+Pullman+Abidjan",
//     title: "Hôtel Pullman Abidjan",
//     description:
//       "Hôtel de luxe avec des chambres spacieuses, une piscine extérieure, un centre de fitness et plusieurs restaurants. Idéalement situé au cœur du Plateau.",
//     rating: 4.6,
//     reviews: 250,
//     address: "Avenue Abdoulaye Fadiga, Plateau, Abidjan",
//     phone: "+225 27 20 20 20 20",
//     website: "https://www.pullmanhotels.com/abidjan",
//   },
//   {
//     id: "hotel-2",
//     type: "hotel",
//     image: "/placeholder.svg?height=400&width=600&text=Résidence+Le+Plateau",
//     title: "Résidence Le Plateau",
//     description:
//       "Appartements modernes et entièrement équipés pour des séjours de courte ou longue durée. Profitez du confort d'un chez-soi avec les services hôteliers.",
//     rating: 4.3,
//     reviews: 180,
//     address: "Rue du Dr Crozet, Plateau, Abidjan",
//     phone: "+225 27 22 22 22 22",
//     website: "https://www.residenceleplateau.ci",
//   },
//   {
//     id: "hotel-3",
//     type: "hotel",
//     image: "/placeholder.svg?height=400&width=600&text=Hôtel+Tiama",
//     title: "Hôtel Tiama",
//     description:
//       "Un hôtel 5 étoiles emblématique au cœur d'Abidjan, offrant un service impeccable, des chambres élégantes et des installations de première classe.",
//     rating: 4.7,
//     reviews: 300,
//     address: "Boulevard de la République, Plateau, Abidjan",
//     phone: "+225 27 20 30 30 30",
//     website: "https://www.hoteltiama.ci",
//   },
//   {
//     id: "activity-1",
//     type: "activity",
//     image: "/placeholder.svg?height=400&width=600&text=Galerie+Cécile+Fakhoury",
//     title: "La Galerie Cécile Fakhoury",
//     description:
//       "Découvrez l'art contemporain africain et international dans cette galerie de renom. Des expositions régulières mettent en lumière des talents émergents et confirmés.",
//     location: "Rue des Jardins, Plateau",
//     address: "Rue des Jardins, Plateau, Abidjan",
//     website: "https://www.cecilefakhoury.com",
//   },
//   {
//     id: "activity-2",
//     type: "activity",
//     image: "/placeholder.svg?height=400&width=600&text=Le+District+d'Abidjan+Fakhoury",
//     title: "Le District d'Abidjan Fakhoury",
//     description:
//       "Un espace culturel dynamique proposant des événements, des ateliers et des performances artistiques. Un lieu de rencontre pour la créativité.",
//     location: "Rue du Commerce, Plateau",
//     address: "Rue du Commerce, Plateau, Abidjan",
//     website: "https://www.ledistrictabidjan.ci",
//   },
//   {
//     id: "activity-3",
//     type: "activity",
//     image: "/placeholder.svg?height=400&width=600&text=Cathédrale+Saint-Paul",
//     title: "Cathédrale Saint-Paul d'Abidjan",
//     description:
//       "Chef-d'œuvre architectural moderne, cette cathédrale est un site religieux et touristique majeur. Admirez son design unique et sa vue panoramique.",
//     location: "Boulevard de la République",
//     address: "Boulevard de la République, Plateau, Abidjan",
//     website: "https://fr.wikipedia.org/wiki/Cath%C3%A9drale_Saint-Paul_d%27Abidjan",
//   },
//   {
//     id: "activity-4",
//     type: "activity",
//     image: "/placeholder.svg?height=400&width=600&text=Musée+des+Civilisations",
//     title: "Musée des Civilisations de Côte d'Ivoire",
//     description:
//       "Plongez dans l'histoire et la culture ivoirienne à travers une riche collection d'artefacts, de masques et de sculptures traditionnelles.",
//     location: "Avenue du 26 Septembre",
//     address: "Avenue du 26 Septembre, Plateau, Abidjan",
//     website: "https://www.museecivilisationsci.org",
//   },
// ]

// export default function DetailPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//   const { id } = params

//   const item = allItems.find((i) => i.id === id)

//   if (!item) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//         <Card className="w-full max-w-md text-center">
//           <CardHeader>
//             <CardTitle>Contenu non trouvé</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-600 mb-4">Désolé, l'élément que vous recherchez n'existe pas ou a été supprimé.</p>
//             <Button onClick={() => router.back()} className="bg-primary hover:bg-primary/90 text-white">
//               Retour
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="relative w-full h-64 md:h-[450px]  overflow-hidden">
//         <Image src={"/images/service2.svg"} alt={item.title} fill className="object-cover" priority />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//         <div className="absolute bottom-0 left-0 p-6 text-white">
//           <h1 className="text-3xl md:text-5xl font-bold">{item.title}</h1>
//           <p className="text-lg md:text-xl opacity-90">{item.description}</p>
//         </div>
//       </div>

//       <main className="container mx-auto px-4 py-8 md:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <Card className="p-6 shadow-md rounded-lg">
//               <CardContent className="p-0">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Détails</h2>
//                 <p className="text-gray-700 mb-4">{item.description}</p>

//                 {item.type === "restaurant" || item.type === "hotel" ? (
//                   <div className="flex items-center text-lg text-gray-700 mb-2">
//                     <Star className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" />
//                     <span>{item.rating?.toFixed(1)}</span>
//                     <span className="ml-2 text-gray-500">({item.reviews} avis)</span>
//                   </div>
//                 ) : null}

//                 {item.address && (
//                   <div className="flex items-center text-gray-700 mb-2">
//                     <MapPin className="w-5 h-5 text-gray-600 mr-2" />
//                     <span>{item.address}</span>
//                   </div>
//                 )}

//                 {item.phone && (
//                   <div className="flex items-center text-gray-700 mb-2">
//                     <Phone className="w-5 h-5 text-gray-600 mr-2" />
//                     <a href={`tel:${item.phone}`} className="hover:underline">
//                       {item.phone}
//                     </a>
//                   </div>
//                 )}

//                 {item.website && (
//                   <div className="flex items-center text-gray-700 mb-2">
//                     <Globe className="w-5 h-5 text-gray-600 mr-2" />
//                     <a
//                       href={item.website}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:underline text-blue-600"
//                     >
//                       Visiter le site web
//                     </a>
//                   </div>
//                 )}

//                 {item.type === "restaurant" && (
//                   <Badge variant="secondary" className="mt-4 bg-orange-500 text-white">
//                     Restaurant
//                   </Badge>
//                 )}
//                 {item.type === "hotel" && (
//                   <Badge variant="secondary" className="mt-4 bg-blue-500 text-white">
//                     Hôtel
//                   </Badge>
//                 )}
//                 {item.type === "activity" && (
//                   <Badge variant="secondary" className="mt-4 bg-green-500 text-white">
//                     Activité
//                   </Badge>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           <div className="lg:col-span-1">
//             <Card className="p-6 shadow-md rounded-lg">
//               <CardHeader className="p-0 mb-4">
//                 <CardTitle className="text-xl font-bold text-gray-800">Informations Complémentaires</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <ul className="space-y-2 text-gray-700">
//                   <li>
//                     <Info className="inline-block w-4 h-4 mr-2 text-gray-600" />
//                     Horaires: 08:00 - 22:00
//                   </li>
//                   <li>
//                     <Info className="inline-block w-4 h-4 mr-2 text-gray-600" />
//                     Parking disponible
//                   </li>
//                   <li>
//                     <Info className="inline-block w-4 h-4 mr-2 text-gray-600" />
//                     Accès PMR
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//             <Button
//               onClick={() => router.back()}
//               className="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white rounded-[5px]"
//             >
//               Retour à la liste
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Wifi, 
  Car, 
  Utensils,
  ChevronLeft,
  ChevronRight,
  Quote,
  Share2,
  Heart,
  Calendar
} from "lucide-react"
import { useRouter } from "next/navigation"
import { usePlace } from "@/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePlaceQuery } from "@/hooks/places/use-places-queries"
import { getImageUrl } from "@/lib/api/client"

// Sample data structure matching your format
const sampleData = {
  "title": "La Brasserie Maison Rouge",
  "description": "Une brasserie élégante qui marie cuisine française classique et ambiance chaleureuse.",
  "details": "Installée au sein de l'Hôtel Maison Rouge à Cotonou, La Brasserie propose une cuisine raffinée dans un cadre chic et convivial. Élaborées à partir d'ingrédients frais et de saison, les recettes revisitées allient savoir-faire traditionnel et créativité contemporaine. Parfait pour les repas d'affaires et les dîners en tête-à-tête.",
  "gallery": [
    "https://hotel-benin-maison-rouge-cotonou.com/wp-content/uploads/2023/01/hotel-maison-rouge-cotonou-benin-restaurant-gastronomique.jpg",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adad?w=800"
  ],
  "reviews": [
    "Cadre magnifique et plats exquis !",
    "Service attentionné et ambiance élégante.",
    "Une expérience gastronomique inoubliable.",
    "La vue est spectaculaire et la cuisine divine."
  ],
  "phone": "+229 21 30 00 01",
  "website": "https://hotel-benin-maison-rouge-cotonou.com",
  "address": "504 Rue du Gouverneur, Cotonou, Bénin",
  "features": [
    "Terrasse",
    "Wi-Fi",
    "Stationnement",
    "Menu gourmet"
  ],
  "specialties": [
    "Foie gras au poivre vert",
    "Magret de canard",
    "Tarte fine pomme-cannelle"
  ],
  "openingHours": "Tous les jours : 12h00 - 14h30 / 19h00 - 22h30",
  "poster": "https://hotel-benin-maison-rouge-cotonou.com/wp-content/uploads/2023/01/hotel-maison-rouge-cotonou-benin-restaurant-gastronomique.jpg",
  "type": "landmark",
  "id": "5a457093-c81d-43ab-ba69-ba153eaba92d",
  "createdAt": "2025-08-18T04:36:46.757Z",
  "updatedAt": "2025-08-18T04:36:46.757Z"
}

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

// Image Gallery Component
function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-64 md:h-[50vh] rounded-2xl overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={getImageUrl(images[currentIndex])}
            alt={`Gallery image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </motion.button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}

// Feature Badge Component
function FeatureBadge({ feature }: { feature: string }) {
  const getIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase()
    if (lowerFeature.includes('wifi') || lowerFeature.includes('wi-fi')) return <Wifi className="w-4 h-4" />
    if (lowerFeature.includes('parking') || lowerFeature.includes('stationnement')) return <Car className="w-4 h-4" />
    if (lowerFeature.includes('menu') || lowerFeature.includes('restaurant')) return <Utensils className="w-4 h-4" />
    return null
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700"
    >
      {getIcon(feature)}
      {feature}
    </motion.div>
  )
}

// Review Card Component
function ReviewCard({ review }: { review: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-orange-100 rounded-full">
          <Quote className="w-4 h-4 text-orange-600" />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 italic">"{review}"</p>
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Main Detail Page Component
export default function DetailPage({params}: {params: {id: string}}) {
  const [isFavorite, setIsFavorite] = useState(false)
    const router = useRouter()
  const { id } = params

  const {data:sampleData,isPending}=usePlaceQuery(id)
  const data = sampleData || {
    title: "",
    description: "",
    address: "",
    gallery: [],
    features: [],
    reviews: [],
    specialties: [],
    openingHours: "",
    poster: "",
    type: "",
    phone: "",
    website: "",
    createdAt: "",
    updatedAt: "",
    details: "",

  }
console.log(data,'data',sampleData)
  const handleBack = () => {
    // This would typically use router.back() or navigate to previous page
    console.log("Navigate back")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
         //@ts-ignore
        title: data.title,
         //@ts-ignore
        text: data.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papiers!")
    }
  }

    if (!sampleData && !isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Contenu non trouvé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Désolé, l'élément que vous recherchez n'existe pas ou a été supprimé.</p>
            <Button onClick={() => router.back()} className="bg-primary hover:bg-primary/90 text-white">
              Retour
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative">
        <ImageGallery
         //@ts-ignore
        images={data.gallery} />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-6 left-6 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </motion.button>
        </div>

        <div className="absolute top-6 right-6 z-10 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
          >
            <Share2 className="w-5 h-5 text-gray-800" />
          </motion.button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-2"
          >
            { //@ts-ignore
            data.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl opacity-90"
          >
            { //@ts-ignore
            data.description}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <motion.main
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="lg:px-20  mx-auto px-4 py-8 "
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{
                 //@ts-ignore
              data.details}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services & Équipements</h2>
              <div className="flex flex-wrap gap-3">
                { //@ts-ignore
                data.features.map((feature, index) => (
                  <FeatureBadge key={index} feature={feature} />
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Spécialités</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { //@ts-ignore
                data.specialties.map((specialty, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="font-medium text-gray-800">{specialty}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis clients</h2>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                { //@ts-ignore
                data.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Informations de contact</h3>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">{
                       //@ts-ignore
                    data.address}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <a
                     //@ts-ignore
                     href={`tel:${data.phone}`} className="text-blue-600 hover:underline">
                      {
                         //@ts-ignore
                      data.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Clock className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Horaires</p>
                    <p className="text-gray-600">{
                       //@ts-ignore
                    data.openingHours}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Globe className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Site web</p>
                    <a
                     //@ts-ignore
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      Visiter le site
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Réserver maintenant
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 transition-colors"
                >
                  <MapPin className="w-5 h-5 inline mr-2" />
                  Voir sur la carte
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  )
}