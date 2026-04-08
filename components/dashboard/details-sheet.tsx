"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Star, Phone, Globe, Clock, Eye, Calendar, User } from "lucide-react"
import { getImageUrl } from "@/lib/api/client"
import { ImagePreviewModal } from "./image-preview-modal"


interface DetailsSheetProps {
  isOpen: boolean
  onClose: () => void
  item: any
  type: "place" | "actualite"
}

export function DetailsSheet({ isOpen, onClose, item, type }: DetailsSheetProps) {
  const [imagePreview, setImagePreview] = useState<{ isOpen: boolean; images: string[]; index: number }>({
    isOpen: false,
    images: [],
    index: 0,
  })

  if (!item) return null

  const openImagePreview = (images: string[], index = 0) => {
    setImagePreview({ isOpen: true, images, index })
  }

  const renderPlaceDetails = () => (
  <div className="space-y-10">
    {/* Header with main image */}
    {item.poster && (
      <div
        className="relative h-60 rounded-2xl overflow-hidden cursor-pointer shadow-md"
        onClick={() => openImagePreview([item.poster])}
      >
        <img
          src={getImageUrl(item.poster) || "/placeholder.svg"}
          alt={item.title || item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Eye className="w-10 h-10 text-white" />
        </div>
      </div>
    )}

    {/* Basic info */}
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{item.title || item.name}</h2>
        <Badge className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-sm">
          {item.type}
        </Badge>
      </div>
      {item.description && (
        <p className="text-gray-700 leading-relaxed">{item.description}</p>
      )}
    </div>

    <Separator className="my-2" />

    {/* Location and contact */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {item.address && (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl shadow-sm">
          <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Adresse</p>
            <p className="text-gray-600">{item.address}</p>
          </div>
        </div>
      )}
      {item.phone && (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl shadow-sm">
          <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Téléphone</p>
            <p className="text-gray-600">{item.phone}</p>
          </div>
        </div>
      )}
      {item.website && (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl shadow-sm">
          <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Site web</p>
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {item.website}
            </a>
          </div>
        </div>
      )}
      {item.openingHours && (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl shadow-sm">
          <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Horaires</p>
            <p className="text-gray-600">{item.openingHours}</p>
          </div>
        </div>
      )}
    </div>

    {/* Features and specialties */}
    {(item.features?.length > 0 || item.specialties?.length > 0) && (
      <div className="space-y-6">
        {item.features?.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Équipements</h3>
            <div className="flex flex-wrap gap-3">
              {item.features.map((feature: string, index: number) => (
                <Badge key={index} variant="outline" className="px-3 py-1 rounded-full shadow-sm">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {item.specialties?.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-3">Spécialités</h3>
            <div className="flex flex-wrap gap-3">
              {item.specialties.map((specialty: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full shadow-sm"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Gallery */}
    {item.gallery?.length > 0 && (
      <div>
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Galerie</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {item.gallery.map((image: string, index: number) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm"
              onClick={() => openImagePreview(item.gallery, index)}
            >
              <img
                src={getImageUrl(image) || "/placeholder.svg"}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-7 h-7 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Reviews */}
    {item.reviews?.length > 0 && (
      <div>
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Avis</h3>
        <div className="space-y-4">
          {item.reviews.map((review: string, index: number) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{review}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)


const renderActualiteDetails = () => (
  <div className="space-y-8">
    {/* Header avec image principale */}
    {item.poster && (
      <div
        className="relative h-56 rounded-xl overflow-hidden cursor-pointer shadow-sm"
        onClick={() => openImagePreview([item.poster])}
      >
        <img
          src={getImageUrl(item.poster) || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Eye className="w-8 h-8 text-white" />
        </div>
      </div>
    )}

    {/* Informations principales */}
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-3xl font-bold text-gray-900">{item.title}</h2>
        <Badge className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md">
          {item.type}
        </Badge>
      </div>
      {item.description && <p className="text-gray-700 leading-relaxed">{item.description}</p>}
    </div>

    {/* Tags */}
    {item.tags?.length > 0 && (
      <div className="flex flex-wrap gap-3 bg-gray-50 p-3 rounded-lg">
        {item.tags.map((tag: string, index: number) => (
          <Badge key={index} className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-md">
            {tag}
          </Badge>
        ))}
      </div>
    )}

    <hr className="border-gray-200" />

    {/* Meta infos */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-start gap-3">
        <Calendar className="w-5 h-5 text-gray-500 mt-1" />
        <div>
          <p className="font-medium text-gray-900">Date de publication</p>
          <p className="text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <User className="w-5 h-5 text-gray-500 mt-1" />
        <div>
          <p className="font-medium text-gray-900">Auteur</p>
          <p className="text-gray-600">Mairie de Plateau</p>
        </div>
      </div>
    </div>

    <hr className="border-gray-200" />

    {/* Contenu */}
    {item.details && (
      <div>
        <h3 className="font-semibold text-xl text-gray-900 mb-4">Contenu</h3>
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
          <p className="text-lg">{item.details}</p>
        </div>
      </div>
    )}

    {/* Galerie */}
    {item.gallery?.length > 0 && (
      <div>
        <h3 className="font-semibold text-xl text-gray-900 mb-4">Galerie</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {item.gallery.map((image: string, index: number) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-sm"
              onClick={() => openImagePreview(item.gallery, index)}
            >
              <img
                src={getImageUrl(image) || "/placeholder.svg"}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)


  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full bg-white sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Détails {type === "place" ? "du lieu" : "de l'actualité"}</SheetTitle>
          </SheetHeader>
          <Separator className="my-4" />
          {type === "place" ? renderPlaceDetails() : renderActualiteDetails()}
        </SheetContent>
      </Sheet>

      <ImagePreviewModal
        isOpen={imagePreview.isOpen}
        onClose={() => setImagePreview({ isOpen: false, images: [], index: 0 })}
        images={imagePreview.images}
        selectedIndex={imagePreview.index}

      />
    </>
  )
}
