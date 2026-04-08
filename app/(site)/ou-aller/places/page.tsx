"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Hotel, Star, MapPin, Utensils, Camera, Grid, List, Search } from "lucide-react"
import { useRestaurantsQuery, useHotelsQuery, useActivitiesQuery } from "@/hooks/places/use-places-queries"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getImageUrl } from "@/lib/api/client"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Types
type PlaceType = "restaurants" | "hotels" | "activites"
type ViewMode = "grid" | "list"

interface Place {
  id: string
  title: string
  description: string
  poster?: string
  address?: string
  rating?: number
  reviews?: number
}

// Filter Button Component
interface FilterButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ElementType
  label: string
  count?: number
}

function FilterButton({ active, onClick, icon: Icon, label, count }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-lg"
          : "bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
      {count !== undefined && (
        <span className={`px-2 py-1 rounded-full text-xs ${active ? "bg-primary-foreground/20" : "bg-muted"}`}>
          {count}
        </span>
      )}
    </motion.button>
  )
}

// Place Card Component
interface PlaceCardProps {
  place: Place
  category: PlaceType
  viewMode: ViewMode
}

function PlaceCard({ place, category, viewMode }: PlaceCardProps) {
  const categoryColors = {
    restaurants: "from-orange-500 to-red-500",
    hotels: "from-blue-500 to-indigo-500",
    activites: "from-green-500 to-teal-500",
  }

  const categoryIcons = {
    restaurants: Utensils,
    hotels: Hotel,
    activites: Camera,
  }

  const Icon = categoryIcons[category]

  if (viewMode === "list") {
    return (
      <motion.div
        variants={fadeInUp}
        className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all"
        whileHover={{ y: -2 }}
      >
        <div className="flex gap-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
            //@ts-ignore
              src={getImageUrl(place.poster) || "/placeholder.svg"}
              alt={place.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-heading font-bold text-card-foreground">{place.title}</h3>
              <div className="flex items-center gap-1">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground mb-3 line-clamp-2">{place.description}</p>
            {place.address && (
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{place.address}</span>
              </div>
            )}
            <Link href={`/ou-aller/${place.id}`}>
              <Button className="bg-primary hover:bg-primary/90">Voir les détails</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-card rounded-xl overflow-hidden shadow-sm border border-border group cursor-pointer"
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <Image
          //@ts-ignore
            src={getImageUrl(place.poster) || "/placeholder.svg"}
            alt={place.title}
            fill
            className="object-cover"
          />
        </motion.div>

        <div
          className={`absolute inset-0 bg-gradient-to-t ${categoryColors[category]} opacity-0 group-hover:opacity-20 transition-opacity`}
        />

        <div className="absolute top-4 left-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </div>

        {place.rating && (
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">{place.rating}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {place.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">{place.description}</p>

        {place.address && (
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{place.address}</span>
          </div>
        )}

        {place.reviews && <p className="text-sm text-muted-foreground mb-4">({place.reviews} avis)</p>}

        <Link href={`/ou-aller/${place.id}`}>
          <Button className={`w-full bg-gradient-to-r ${categoryColors[category]} hover:opacity-90`}>
            Plus d'infos
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

// Loading Skeleton Component
function PlaceCardSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex gap-6">
          <Skeleton className="w-24 h-24 rounded-lg" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

// Main Places Page Component
function PlacesPageContent() {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<PlaceType>("restaurants")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Get filter from URL params
  useEffect(() => {
    const type = searchParams.get("type") as PlaceType
    if (type && ["restaurants", "hotels", "activites"].includes(type)) {
      setActiveFilter(type)
    }
  }, [searchParams])

  // Data queries
  const { data: restaurantsData, isLoading: restaurantsLoading } = useRestaurantsQuery({ limit: 50 })
  const { data: hotelsData, isLoading: hotelsLoading } = useHotelsQuery({ limit: 50 })
  const { data: activitiesData, isLoading: activitiesLoading } = useActivitiesQuery({ limit: 50 })

  const restaurants = restaurantsData?.data || []
  const hotels = hotelsData?.data || []
  const activities = activitiesData?.data || []

  // Get current data based on active filter
  const getCurrentData = () => {
    switch (activeFilter) {
      case "restaurants":
        return { data: restaurants, loading: restaurantsLoading }
      case "hotels":
        return { data: hotels, loading: hotelsLoading }
      case "activites":
        return { data: activities, loading: activitiesLoading }
      default:
        return { data: [], loading: false }
    }
  }

  const { data: currentData, loading: currentLoading } = getCurrentData()

  // Filter data based on search query
  const filteredData = currentData.filter(
    (place) =>
      place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getTitle = () => {
    switch (activeFilter) {
      case "restaurants":
        return "Les meilleurs restaurants"
      case "hotels":
        return "Où séjourner"
      case "activites":
        return "Activités & Découvertes"
      default:
        return "Découvrez le Plateau"
    }
  }

  const getSubtitle = () => {
    switch (activeFilter) {
      case "restaurants":
        return "Savourez une cuisine d'exception dans les meilleures tables du Plateau"
      case "hotels":
        return "Confort et élégance pour un séjour inoubliable"
      case "activites":
        return "Explorez la richesse culturelle et les loisirs du Plateau"
      default:
        return "Explorez tous les lieux incontournables"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-40 border-b mb-10 bg-primary overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">{getTitle()}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{getSubtitle()}</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 rounded-full border-border bg-card"
              />
            </div>
          </motion.div>

          {/* Filter Buttons */}
          {/* <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <FilterButton
              active={activeFilter === "restaurants"}
              onClick={() => setActiveFilter("restaurants")}
              icon={Utensils}
              label="Restaurants"
              count={restaurants.length}
            />
            <FilterButton
              active={activeFilter === "hotels"}
              onClick={() => setActiveFilter("hotels")}
              icon={Hotel}
              label="Hôtels"
              count={hotels.length}
            />
            <FilterButton
              active={activeFilter === "activites"}
              onClick={() => setActiveFilter("activites")}
              icon={Camera}
              label="Activités"
              count={activities.length}
            />
          </motion.div> */}

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-2"
          >
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-2"
            >
              <Grid className="w-4 h-4" />
              Grille
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              Liste
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Places Grid/List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${viewMode}`}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}
            >
              {currentLoading
                ? [...Array(6)].map((_, i) => <PlaceCardSkeleton key={i} viewMode={viewMode} />)
                : filteredData.map((place) => (
                    <PlaceCard key={place.id} place={place} category={activeFilter} viewMode={viewMode} />
                  ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {!currentLoading && filteredData.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground">Essayez de modifier votre recherche ou changez de catégorie</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

// Main component with Suspense wrapper
export default function PlacesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
      }
    >
      <PlacesPageContent />
    </Suspense>
  )
}
