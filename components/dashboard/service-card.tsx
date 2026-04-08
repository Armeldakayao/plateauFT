"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Edit, Eye, Trash2 } from "lucide-react"

interface Service {
  id: string
  name: string
  description?: string
  category: string
  price?: number
  isActive: boolean
  createdAt: string
}

interface ServiceCardProps {
  service: Service
  onView?: (service: Service) => void
  onEdit?: (service: Service) => void
  onDelete?: (service: Service) => void
}

const serviceCategories = [
  { value: "consultation", label: "Consultation" },
  { value: "formation", label: "Formation" },
  { value: "support", label: "Support technique" },
  { value: "maintenance", label: "Maintenance" },
  { value: "development", label: "Développement" },
  { value: "other", label: "Autre" },
]

export function ServiceCard({ service, onView, onEdit, onDelete }: ServiceCardProps) {
  const formatPrice = (price?: number) => {
    if (!price) return "Gratuit"
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const getCategoryLabel = (category: string) => {
    const cat = serviceCategories.find((c) => c.value === category)
    return cat?.label || category
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{service.name}</CardTitle>
          </div>
          <Badge variant={service.isActive ? "default" : "secondary"}>{service.isActive ? "Actif" : "Inactif"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {service.description && <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>}

        <div className="flex items-center justify-between text-sm">
          <Badge variant="outline">{getCategoryLabel(service.category)}</Badge>
          <span className="font-semibold text-green-600">{formatPrice(service.price)}</span>
        </div>

        <div className="text-xs text-muted-foreground">Créé le {formatDate(service.createdAt)}</div>

        <div className="flex gap-2 pt-2">
          {onView && (
            <Button variant="outline" size="sm" onClick={() => onView(service)} className="flex-1">
              <Eye className="w-4 h-4 mr-1" />
              Voir
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(service)} className="flex-1">
              <Edit className="w-4 h-4 mr-1" />
              Modifier
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(service)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
