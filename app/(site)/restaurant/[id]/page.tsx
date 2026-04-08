// import SiteLayout from "@/components/layout/site-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Star, Phone, Globe, Calendar } from "lucide-react"

// Données factices détaillées
const detailsData = {
  "rice-restaurant": {
    type: "restaurant",
    title: "Rice So Nice Restaurant",
    subtitle: "Cuisine Africaine Authentique",
    description:
      "Découvrez les saveurs authentiques de l'Afrique de l'Ouest dans notre restaurant familial. Nos plats sont préparés avec des ingrédients frais et des recettes traditionnelles transmises de génération en génération.",
    images: [
      "https://cdn.tripinafrica.com/1920x1080/media/jWuvEfvO1B6ICZxdkOpEEFYtmBL5EdXZui8M5TcD.jpg",
      "https://cdn.tripinafrica.com/1920x1080/media/jWuvEfvO1B6ICZxdkOpEEFYtmBL5EdXZui8M5TcD.jpg",
      "https://cdn.tripinafrica.com/1920x1080/media/jWuvEfvO1B6ICZxdkOpEEFYtmBL5EdXZui8M5TcD.jpg",
    ],
    rating: 4.8,
    reviews: 127,
    address: "23, Aroma Street, Lagos, Nigeria",
    phone: "+234 123 456 7890",
    website: "www.ricesonice.ng",
    hours: {
      "Lundi - Vendredi": "11h00 - 22h00",
      "Samedi - Dimanche": "10h00 - 23h00",
    },
    specialties: ["Jollof Rice", "Poulet Grillé", "Plantain Frit", "Soupe Egusi"],
    priceRange: "€€",
    features: ["Livraison", "À emporter", "Terrasse", "Wifi gratuit"],
    social: "@rolandmoot",
  },
  "stade-felix": {
    type: "landmark",
    title: "Stade Félix-Houphouët-Boigny",
    subtitle: "Le Félicia - Stade National",
    description:
      "Le Stade Félix-Houphouët-Boigny, affectueusement surnommé « Le Félicia », est bien plus qu'un simple stade. C'est le cœur battant du sport ivoirien, témoin de moments historiques et de célébrations nationales. Inauguré en 1984, ce stade polyvalent accueille les plus grands événements sportifs du pays.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    capacity: "35,000 places",
    opened: "1984",
    address: "Commune du Plateau, Abidjan, Côte d'Ivoire",
    sports: ["Football", "Rugby", "Athlétisme"],
    events: ["Matchs de l'équipe nationale", "Finale de la Coupe d'Afrique", "Concerts"],
    features: ["Éclairage moderne", "Pelouse naturelle", "Parking", "Boutiques"],
    architect: "Cabinet d'architecture ivoirien",
    renovations: ["2008", "2015", "2021"],
  },
  "abidjan-city": {
    type: "city",
    title: "Abidjan",
    subtitle: "La Perle des Lagunes",
    description:
      "Abidjan, capitale économique de la Côte d'Ivoire, est une métropole dynamique qui allie modernité et traditions. Surnommée la 'Perle des Lagunes', elle séduit par ses gratte-ciel, ses quartiers animés et sa richesse culturelle. Centre névralgique de l'Afrique de l'Ouest, Abidjan est une ville cosmopolite où se mélangent les influences africaines et internationales.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    population: "4,7 millions d'habitants",
    area: "2 119 km²",
    founded: "1903",
    districts: ["Plateau", "Cocody", "Yopougon", "Adjamé", "Treichville"],
    attractions: ["Basilique Notre-Dame de la Paix", "Marché de Treichville", "Parc du Banco"],
    economy: ["Finance", "Commerce", "Industrie", "Services"],
    languages: ["Français", "Dioula", "Baoulé", "Bété"],
    climate: "Tropical humide",
  },
}

export default function DetailsPage({
  params,
}: {
  params: { id: keyof typeof detailsData }
}) {
  const data = detailsData[params.id]

  if (!data) {
    return (
      <div >
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Contenu non trouvé</h1>
            <Link href="/carousel">
              <Button>Retour au carousel</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image src={data.images[0] || "/placeholder.svg"} alt={data.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <Link
              href="/carousel"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
             
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{data.title}</h1>
            <p className="text-xl md:text-2xl text-white/90">{data.subtitle}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{data.description}</p>
              </Card>

              {/* Gallery */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Galerie</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.images.slice(1).map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${data.title} ${index + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Type-specific content */}
              {data.type === "restaurant" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Spécialités</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {
                        // @ts-ignore
                    data.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Horaires d'ouverture</h3>
                  <div className="space-y-2">
                    {
                         // @ts-ignore
                    Object.entries(data.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{day}</span>
                        
                        <span className="text-gray-600">{String(hours)}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {data.type === "landmark" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Informations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Sports pratiqués</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {
                             // @ts-ignore
                        data.sports.map((sport, index) => (
                          <Badge key={index} variant="outline">
                            {sport}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Événements</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {
                             // @ts-ignore
                        data.events.map((event, index) => (
                          <li key={index}>• {event}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )}

              {data.type === "city" && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Quartiers principaux</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {
                         // @ts-ignore
                    data.districts.map((district, index) => (
                      <Badge key={index} variant="outline" className="justify-center py-2">
                        {district}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Attractions touristiques</h3>
                  <ul className="text-gray-600 space-y-2">
                    {
                         // @ts-ignore
                    data.attractions.map((attraction, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <MapPin size={16} className="text-blue-500" />
                        {attraction}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Informations pratiques</h3>
                <div className="space-y-4">
                  {data.type === "restaurant" && (
                    <>
                      <div className="flex items-center gap-3">
                        <Star className="text-yellow-500" size={20} />
                        <div>
                          <div className="font-semibold">{
                             // @ts-ignore  
                          data.rating}/5</div>
                          <div className="text-sm text-gray-600">{
                             // @ts-ignore  
                          data.reviews} avis</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="text-blue-500 mt-1" size={20} />
                        <div>
                          <div className="font-semibold">Téléphone</div>
                          <div className="text-sm text-gray-600">{
                             // @ts-ignore  
                          data.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="text-green-500 mt-1" size={20} />
                        <div>
                          <div className="font-semibold">Site web</div>
                          <div className="text-sm text-blue-600">{
                             // @ts-ignore  
                          data.website}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {data.type === "landmark" && (
                    <>
                      <div className="flex items-start gap-3">
                        <Calendar className="text-blue-500 mt-1" size={20} />
                        <div>
                          <div className="font-semibold">Ouverture</div>
                          <div className="text-sm text-gray-600">{
                             // @ts-ignore  
                          data.opened}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-red-500 mt-1" size={20} />
                        <div>
                          <div className="font-semibold">Capacité</div>
                          <div className="text-sm text-gray-600">{
                             // @ts-ignore
                          data.capacity}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {data.type === "city" && (
                    <>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-blue-500 mt-1" size={20} />
                        <div>
                          <div className="font-semibold">Population</div>
                          <div className="text-sm text-gray-600">{
                             // @ts-ignore
                          data.population}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="text-green-500 mt-1" size={20} />
                        <div>
                          <div className="font-semibold">Fondée en</div>
                          <div className="text-sm text-gray-600">{
                             // @ts-ignore
                          data.founded}</div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-start gap-3">
                    <MapPin className="text-red-500 mt-1" size={20} />
                    <div>
                      <div className="font-semibold">Adresse</div>
                      <div className="text-sm text-gray-600">{
                         // @ts-ignore  
                      data.address}</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Caractéristiques</h3>
                <div className="flex flex-wrap gap-2">
                  {
                     // @ts-ignore  
                  (data.features || []).map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6 text-center">
                <Button className="w-full mb-3">
                  {data.type === "restaurant"
                    ? "Réserver une table"
                    : data.type === "landmark"
                      ? "Planifier une visite"
                      : "Guide touristique"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Partager
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
