
"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield, Edit, Save, X, Calendar, User, MapPin, Phone, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useChangePasswordMutation, useProfile, useUpdateProfile } from "@/hooks"
import { useToast } from "@/hooks/use-toast"
import { ProfilePhotoUpload } from "@/components/dashboard/profile-photo-upload"
import { DocumentList } from "@/components/document-list"
import { useDocuments, useUserFiles } from "@/hooks/uploads/use-upload-mutations"


export default function MonProfilAdminPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
const {data}=useUserFiles()
console.log(data,'allDOC')
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwordError, setPasswordError] = useState("")

  // Hooks pour récupérer et mettre à jour le profil
  const { data: profileData, isLoading, error, refetch } = useProfile()
  const updateProfileMutation = useUpdateProfile()
  const changePasswordMutation = useChangePasswordMutation()

  // État local pour les modifications
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    city: "",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true,
  })

  // Fonction pour convertir une date ISO en format YYYY-MM-DD pour l'input date
   //@ts-ignore
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return ""
    try {
      const date = new Date(isoDate)
      return date.toISOString().split("T")[0] // Format YYYY-MM-DD
    } catch (error) {
      return ""
    }
  }

  // Fonction pour convertir une date du format YYYY-MM-DD vers ISO 8601
   //@ts-ignore
  const formatDateForAPI = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString + "T00:00:00.000Z")
      return date.toISOString()
    } catch (error) {
      return ""
    }
  }

  // Fonction pour afficher une date en format français
   //@ts-ignore
  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return ""
    try {
      const date = new Date(isoDate)
      return date.toLocaleDateString("fr-FR")
    } catch (error) {
      return ""
    }
  }

  // Mettre à jour les données locales quand le profil est chargé
  useEffect(() => {
    if (profileData) {
      const formattedData = {
         //@ts-ignore
        firstName: profileData.firstName || "",
         //@ts-ignore
        lastName: profileData.lastName || "",
         //@ts-ignore
        email: profileData.email || "",
         //@ts-ignore
        phone: profileData.phone || "",
         //@ts-ignore
        birthDate: profileData.birthDate || "",
         //@ts-ignore
        birthPlace: profileData.birthPlace || "",
         //@ts-ignore
        nationality: profileData.nationality || "",
         //@ts-ignore
        city: profileData.city || "",
      }
      setEditedData(formattedData)
    }
  }, [profileData])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Remettre les données originales
    if (profileData) {
      const formattedData = {
         //@ts-ignore
        firstName: profileData.firstName || "",
         //@ts-ignore
        lastName: profileData.lastName || "",
         //@ts-ignore
        email: profileData.email || "",
         //@ts-ignore
        phone: profileData.phone || "",
         //@ts-ignore
        birthDate: profileData.birthDate || "",
         //@ts-ignore
        birthPlace: profileData.birthPlace || "",
         //@ts-ignore
        nationality: profileData.nationality || "",
         //@ts-ignore
        city: profileData.city || "",
      }
      setEditedData(formattedData)
    }
    toast({
      title: "Modifications annulées",
      description: "Vos modifications ont bien été annulées.",
    })
  }

  const handleSave = async () => {
    try {
      // Préparer les données pour l'API
      const dataToSend = {
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        email: editedData.email,
        phone: editedData.phone,
        birthDate: editedData.birthDate ? editedData.birthDate.split("T")[0] : "",
        birthPlace: editedData.birthPlace,
        nationality: editedData.nationality,
        city: editedData.city,
      }

      console.log("Données envoyées à l'API:", dataToSend)

      await updateProfileMutation.mutateAsync(dataToSend)
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont bien été enregistrées.",
      })
      setIsEditing(false)
      refetch() // Recharger les données
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
    }
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    console.log(`Notification ${key} ${value ? "activée" : "désactivée"}`)
  }

  const handleDownloadData = () => {
    // Créer un fichier JSON avec les données du profil
    if (profileData) {
      const dataStr = JSON.stringify(profileData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "mes_donnees_personnelles.json"
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true)
    setPasswordError("")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handlePasswordSubmit = async () => {
    setPasswordError("")

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("Tous les champs sont requis")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères")
      return
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordError("Le nouveau mot de passe doit être différent de l'ancien")
      return
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      setIsChangePasswordOpen(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Mot de passe changé",
        description: "Votre mot de passe a bien été changé.",
      })

      // Optionally show success message
      console.log("Mot de passe changé avec succès")
    } catch (error) {
      setPasswordError("Erreur lors du changement de mot de passe. Vérifiez votre mot de passe actuel.")
    }
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const documents = [
    {
      nom: "Pièce d'identité",
       //@ts-ignore
      type: profileData?.idType?.toUpperCase() || "CNI",
      dateExpiration: "15/03/2030",
       //@ts-ignore
      statut: profileData?.isVerified ? "Valide" : "En attente",
    },
    { nom: "Justificatif de domicile", type: "Facture", dateExpiration: "15/01/2025", statut: "Valide" },
    { nom: "Extrait de naissance", type: "Acte", dateExpiration: "N/A", statut: "Valide" },
  ]

  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-slate-600 font-medium">Chargement de votre profil...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-red-600 mb-4 text-lg">Erreur lors du chargement du profil</p>
            <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700">
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    )
  }
 //@ts-ignore
  const fullName = `${profileData.firstName} ${profileData.lastName}`
   //@ts-ignore
  const userInitials = `${profileData.firstName?.[0] || ""}${profileData.lastName?.[0] || ""}`.toUpperCase()

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex-1 p-4 md:p-8">
        {/* Header avec design amélioré */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl opacity-10"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                    <AvatarImage src={
                       //@ts-ignore
                      data && data?.profilePhoto || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full p-2">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                    {fullName}
                  </h1>
                  <div className="flex items-center gap-4 text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{
                         //@ts-ignore
                      profileData.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{
                         //@ts-ignore
                      profileData.phone}</span>
                    </div>
                  </div>
                  <Badge
                    className={`${
                     //@ts-ignore
                      profileData.isVerified
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    } text-white border-0 shadow-lg`}
                  >
                    { //@ts-ignore
                    profileData.isVerified ? "✓ Compte vérifié" : "⏳ En attente de vérification"}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button
                    className="bg-primary text-white shadow-lg hover:border transition-all duration-300"
                    onClick={handleEdit}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="border-slate-300 text-slate-600 hover:bg-slate-50 bg-white/80 backdrop-blur-sm"
                      onClick={handleCancel}
                      disabled={updateProfileMutation.isPending}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                      onClick={handleSave}
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Enregistrer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo de profil */}
            <Card className="bg-white/80 backdrop-blur-sm border rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200/50">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <User className="w-6 h-6 text-blue-600" />
                  Photo de profil
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <ProfilePhotoUpload
                  currentPhotoUrl={
                     //@ts-ignore
                    profileData.profilePhoto}
                  userInitials={userInitials}
                  onPhotoUpdated={() => refetch()}
                />
              </CardContent>
            </Card>

            {/* Informations personnelles */}
            <Card className="bg-white/80 backdrop-blur-sm border rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200/50">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <User className="w-6 h-6 text-blue-600" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Prénom
                      </Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={editedData.firstName}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, firstName: e.target.value }))}
                          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium bg-slate-50 p-3 rounded-xl">{
                           //@ts-ignore
                          profileData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Nom
                      </Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={editedData.lastName}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, lastName: e.target.value }))}
                          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium bg-slate-50 p-3 rounded-xl">{
                           //@ts-ignore
                          profileData.lastName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Adresse email
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedData.email}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, email: e.target.value }))}
                          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium bg-slate-50 p-3 rounded-xl">{
                           //@ts-ignore
                          profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Téléphone
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedData.phone}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium bg-slate-50 p-3 rounded-xl">{
                           //@ts-ignore
                          profileData.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="city" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Ville
                      </Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          value={editedData.city}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, city: e.target.value }))}
                          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium bg-slate-50 p-3 rounded-xl">{
                           //@ts-ignore
                          profileData.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="birthPlace" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Lieu de naissance
                      </Label>
                      {isEditing ? (
                        <Input
                          id="birthPlace"
                          value={editedData.birthPlace}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, birthPlace: e.target.value }))}
                          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium bg-slate-50 p-3 rounded-xl">
                          {
                             //@ts-ignore
                          profileData.birthPlace}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="birthDate" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Date de naissance
                      </Label>
                      {isEditing ? (
                        <div className="relative mt-1">
                          <Input
                            id="birthDate"
                            type="date"
                            value={formatDateForInput(editedData.birthDate)}
                            onChange={(e) => setEditedData((prev) => ({ ...prev, birthDate: e.target.value }))}
                            className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pr-10 rounded-xl bg-white/50"
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      ) : (
                        <p className="text-slate-900 font-medium bg-slate-50 p-3 rounded-xl">
                          { //@ts-ignore
                          formatDateForDisplay(profileData.birthDate)}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nationality" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Nationalité
                      </Label>
                      {isEditing ? (
                        <Input
                          id="nationality"
                          value={editedData.nationality}
                          onChange={(e) => setEditedData((prev) => ({ ...prev, nationality: e.target.value }))}
                          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium bg-slate-50 p-3 rounded-xl">
                          { //@ts-ignore
                          profileData.nationality}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Documents récents */}
            <DocumentList showAll={false} canManage={true} maxItems={5} />

            {/* Sécurité */}
            <Card className="bg-white/80 backdrop-blur-sm border rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-emerald-50 border-b border-slate-200/50">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-white/80 backdrop-blur-sm rounded-xl"
                    onClick={handleChangePassword}
                    disabled={changePasswordMutation.isPending}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                  <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl">
                    <p className="font-semibold mb-3 text-slate-800">Informations du compte :</p>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Rôle:</span> {
                           //@ts-ignore
                        profileData.role}
                      </p>
                      <p>
                        <span className="font-medium">Membre depuis:</span>{" "}
                        { //@ts-ignore
                        new Date(profileData.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
