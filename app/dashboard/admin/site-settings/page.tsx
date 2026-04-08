"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Save, Upload, Settings, Globe, Mail } from "lucide-react"
import Link from "next/link"
import { useCreateSiteSettings, useSiteSettings, useUpdateSiteSettings } from "@/hooks"


export default function SiteSettingsPage() {
  const { data: settingsData, isLoading } = useSiteSettings()
  const updateMutation = useUpdateSiteSettings()
  const createMutation = useCreateSiteSettings()

  const [formData, setFormData] = useState({
    siteName: "",
    siteDescription: "",
    siteUrl: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    logo: "",
    favicon: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    features: {
      enableComments: true,
      enableNotifications: true,
      enableRegistration: true,
      maintenanceMode: false,
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
  })

  useEffect(() => {
    if (settingsData?.data) {
      setFormData({
        siteName: settingsData.data.siteName || "",
         //@ts-ignore
        siteDescription: settingsData.data.siteDescription || "",
         //@ts-ignore
        siteUrl: settingsData.data.siteUrl || "",
         //@ts-ignore
        contactEmail: settingsData.data.contactEmail || "",
         //@ts-ignore
        contactPhone: settingsData.data.contactPhone || "",
        address: settingsData.data.address || "",
        logo: settingsData.data.logo || "",
        favicon: settingsData.data.favicon || "",
         //@ts-ignore
        socialMedia: settingsData.data.socialMedia || {
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
        },
         //@ts-ignore
        features: settingsData.data.features || {
          enableComments: true,
          enableNotifications: true,
          enableRegistration: true,
          maintenanceMode: false,
        },
         //@ts-ignore
        seo: settingsData.data.seo || {
          metaTitle: "",
          metaDescription: "",
          keywords: "",
        },
      })
    }
  }, [settingsData])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
         //@ts-ignore
        ...prev[parent as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSubmit = async () => {
    try {
      if (settingsData?.data) {
        await updateMutation.mutateAsync(formData)
      } else {
         //@ts-ignore
        await createMutation.mutateAsync(formData)
      }
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des paramètres...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Paramètres du site</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres du site</h1>
        <p className="text-gray-600">Configurez les paramètres généraux de votre site municipal</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
          <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) => handleInputChange("siteName", e.target.value)}
                    placeholder="Mairie de..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL du site</Label>
                  <Input
                    id="siteUrl"
                    value={formData.siteUrl}
                    onChange={(e) => handleInputChange("siteUrl", e.target.value)}
                    placeholder="https://mairie-exemple.fr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Description du site</Label>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription}
                  onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                  placeholder="Description de votre commune..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo (URL)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      value={formData.logo}
                      onChange={(e) => handleInputChange("logo", e.target.value)}
                      placeholder="URL du logo"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon (URL)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="favicon"
                      value={formData.favicon}
                      onChange={(e) => handleInputChange("favicon", e.target.value)}
                      placeholder="URL du favicon"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Informations de contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de contact</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="contact@mairie-exemple.fr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Téléphone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Adresse complète de la mairie..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Réseaux sociaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={formData.socialMedia.facebook}
                    onChange={(e) => handleNestedChange("socialMedia", "facebook", e.target.value)}
                    placeholder="https://facebook.com/votre-page"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.socialMedia.twitter}
                    onChange={(e) => handleNestedChange("socialMedia", "twitter", e.target.value)}
                    placeholder="https://twitter.com/votre-compte"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => handleNestedChange("socialMedia", "instagram", e.target.value)}
                    placeholder="https://instagram.com/votre-compte"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.socialMedia.linkedin}
                    onChange={(e) => handleNestedChange("socialMedia", "linkedin", e.target.value)}
                    placeholder="https://linkedin.com/company/votre-page"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Fonctionnalités
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableComments">Commentaires</Label>
                    <p className="text-sm text-gray-500">Permettre aux citoyens de commenter</p>
                  </div>
                  <Switch
                    id="enableComments"
                    checked={formData.features.enableComments}
                    onCheckedChange={(checked) => handleNestedChange("features", "enableComments", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableNotifications">Notifications</Label>
                    <p className="text-sm text-gray-500">Système de notifications</p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={formData.features.enableNotifications}
                    onCheckedChange={(checked) => handleNestedChange("features", "enableNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableRegistration">Inscription</Label>
                    <p className="text-sm text-gray-500">Permettre l'inscription de nouveaux utilisateurs</p>
                  </div>
                  <Switch
                    id="enableRegistration"
                    checked={formData.features.enableRegistration}
                    onCheckedChange={(checked) => handleNestedChange("features", "enableRegistration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Mode maintenance</Label>
                    <p className="text-sm text-gray-500">Activer le mode maintenance</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={formData.features.maintenanceMode}
                    onCheckedChange={(checked) => handleNestedChange("features", "maintenanceMode", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={updateMutation.isPending || createMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {updateMutation.isPending || createMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </div>
    </div>
  )
}
