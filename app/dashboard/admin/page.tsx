// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Clock, Eye } from "lucide-react"
// import Link from "next/link"
// import { useProfile } from "@/hooks"

// export default function AdminDashboardPage() {
//   const stats = [
//     { label: "Demandes en attente", value: "42", color: "primary" },
//     { label: "Demandes traitées", value: "12", color: "secondary" },
//     { label: "RDV aujourd'hui", value: "24", color: "orange-500" },
//   ]

//   const dernieresDemandes = [
//     {
//       id: "1",
//       demandeur: "Koffi Stephane",
//       type: "Certificat de résidence",
//       date: "28/07/2024",
//       statut: "En cours",
//     },
//     {
//       id: "2",
//       demandeur: "Alioune Mamadou",
//       type: "Résidence",
//       date: "26/07/2024",
//       statut: "Nouveau",
//     },
//     {
//       id: "3",
//       demandeur: "Coulibaly Fatou",
//       type: "Autorisation de domicile",
//       date: "26/07/2024",
//       statut: "Validé",
//     },
//   ]

//   const rendezVousJour = [
//     {
//       id: "1",
//       heure: "09h00 - 10h 14mn",
//       description: "Autorisation mariage",
//     },
//     {
//       id: "2",
//       heure: "10h15 - 11h Mercredi 7",
//       description: "Demande manuel de résidence",
//     },
//   ]

//   const getStatusBadge = (statut: string) => {
//     switch (statut) {
//       case "Validé":
//         return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Validé</Badge>
//       case "En cours":
//         return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1 text-xs">En cours</Badge>
//       case "Nouveau":
//         return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">Nouveau</Badge>
//       default:
//         return <Badge variant="secondary">{statut}</Badge>
//     }
//   }
// const {data:me}=useProfile()
//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Bonjour, {me?.firstName} {me?.lastName}</h2>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <Card key={index} className={`p-4 border-${stat.color} border rounded-[10px]`}>
//             <CardContent className="p-6 flex justify-between">
//               <div className="flex flex-col  gap-4 w-full">
//                 <div className={` rounded-lg flex items-center justify-between`}>
//                   <span className={` font-bold text-5xl  text-${stat.color}`}>{stat.value}</span>
                 
//                 </div>
//                 <div>
//                   <p className="text-gray-900 text-lg">{stat.label}</p>
//                 </div>
//               </div>
//                <div className={`max-h-40 w-1 rounded-[2px] bg-${stat.color} `}></div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
//         {/* Dernières demandes reçues */}
//         <Card className="shadow-sm border-gray-200">
//           <CardHeader className="border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-xl font-semibold text-gray-900">Dernières demandes reçues</CardTitle>
//               <Link href="/admin/gestion-demandes" className="text-orange-600 hover:text-orange-700 text-md font-medium">
//                 Voir toutes les demandes
//               </Link>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="text-left py-3 px-6 font-semibold text-gray-700 text-lg">Demandeur</th>
//                     <th className="text-left py-3 px-6 font-semibold text-gray-700 text-lg">Type de demande</th>
//                     <th className="text-left py-3 px-6 font-semibold text-gray-700 text-lg">Date de demande</th>
//                     <th className="text-left py-3 px-6 font-semibold text-gray-700 text-lg">Statut</th>
//                     <th className="w-12"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dernieresDemandes.map((demande, index) => (
//                     <tr key={demande.id} className="border-b border-gray-100 hover:bg-gray-50">
//                       <td className="py-4 px-6 font-medium text-gray-900">{demande.demandeur}</td>
//                       <td className="py-4 px-6 text-gray-600">{demande.type}</td>
//                       <td className="py-4 px-6 text-gray-600">{demande.date}</td>
//                       <td className="py-4 px-6">{getStatusBadge(demande.statut)}</td>
//                       <td className="py-4 px-6">
//                         <Link href={`/admin/gestion-demandes/${demande.id}`}>
//                           <Button variant="outline" size="sm" className="border-gray-300 bg-transparent text-sm">
//                             Voir
//                           </Button>
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Rendez-vous du jour */}
//         <Card className="shadow-sm border-primary bg-gray-200 rounded-[10px]">
//           <CardHeader className="">
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-2xl font-semibold text-primary">Rendez-vous du jour</CardTitle>
//               <Link href="/admin/rendez-vous" className="text-orange-600 text-md hover:text-orange-700  font-medium">
//                 Voir tous les rendez-vous
//               </Link>
//             </div>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               {rendezVousJour.map((rdv) => (
//                 <div key={rdv.id} className="flex items-center gap-4 p-4 border border-primary rounded-full">
//                   <Clock className="w-5 h-5 text-primary" />
//                   <div className="flex-1">
//                     <p className="font-medium text-lg text-gray-900">{rdv.heure}</p>
//                     <p className="text-md text-gray-600">{rdv.description}</p>
//                   </div>
//                   <Button className="bg-primary rounded-full hover:bg-primary text-white text-sm">
//                     <Eye className="w-4 h-4 mr-2" />
//                     Voir détails
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }"use client"
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Users, FileText, Calendar, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useServiceRequests } from "@/hooks"
import { useServiceRequestStatistics } from "@/hooks/services-requests/use-service-request"

export default function AdminDashboardPage() {
  const { data: requestsData, isLoading } = useServiceRequests()
  const { data: statisticsData } = useServiceRequestStatistics()
  
  // Adaptation pour le nouveau format de données
  const statistics = statisticsData || {}
  const requests = requestsData?.data || []
  
  const getStatusBadge = (statut: string) => {
    const variants = {
      valide: "bg-green-100 text-green-800 border-green-200",
      en_cours: "bg-blue-100 text-blue-800 border-blue-200",
      nouveau: "bg-orange-100 text-orange-800 border-orange-200",
      traite: "bg-purple-100 text-purple-800 border-purple-200",
      rejete: "bg-red-100 text-red-800 border-red-200",
      en_attente: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }

    const labels = {
      valide: "Validé",
      en_cours: "En cours",
      nouveau: "Nouveau",
      traite: "Traité",
      rejete: "Rejeté",
      en_attente: "En attente",
    }

    return (
      <Badge
        className={`${variants[statut as keyof typeof variants] || "bg-gray-100 text-gray-800"} border px-3 py-1 text-xs`}
      >
        {labels[statut as keyof typeof labels] || statut}
      </Badge>
    )
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      rdv: "Rendez-vous",
      partenariat: "Partenariat",
      mariage: "Mariage",
    }
    return labels[type as keyof typeof labels] || type
  }

  // Calcul des statistiques adaptées au nouveau format
   //@ts-ignore
  const demandesEnAttente = statistics.general?.parEtat?.find(item => item.etat === "en_attente")?.count || 0
   //@ts-ignore
  const totalDemandes = statistics.general?.total || 0
   //@ts-ignore
  const demandesRdv = statistics.general?.parType?.find(item => item.type === "rdv")?.count || 0
   //@ts-ignore
  const demandesEnRetard = statistics.general?.demandesEnRetard || 0
   //@ts-ignore
  const tempsTraitementMoyen = statistics.traitements?.tempsTraitementMoyen || 0

  const stats = [
    {
      label: "Demandes en attente",
      value: demandesEnAttente.toString(),
      color: "orange-500",
      icon: Clock,
      change: demandesEnRetard > 0 ? `${demandesEnRetard} en retard` : "À jour",
    },
    {
      label: "Total demandes",
      value: totalDemandes.toString(),
      color: "blue-500",
      icon: FileText,
      change: "Ce mois",
    },
    {
      label: "RDV en cours",
      value: demandesRdv.toString(),
      color: "green-500",
      icon: Calendar,
      change: "Aujourd'hui",
    },
    {
      label: "Temps moyen",
      value: `${tempsTraitementMoyen.toFixed(1)}h`,
      color: "purple-500",
      icon: TrendingUp,
      change: "Traitement",
    },
  ]
 //@ts-ignore
  const rendezVousJour = []
  
  console.log("Requests:", requests)
  console.log("Statistics:", statistics)
  console.log("Raw statistics data:", statisticsData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="px-2 mx-auto">
        {/* Header */}
       <div className="mb-8 flex items-center justify-between">
         <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tableau de Bord Administrateur</h1>
          <p className="text-muted-foreground">Vue d'ensemble des demandes et activités</p>
        </div>
        <Link href="/dashboard/admin/statistiques" className="text-white border rounded-[4px] hover:text-white/80">
          <Button className="bg-primary text-white hover:bg-primary/90">
            Voir les statistiques complètes
          </Button>
        </Link>
       </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className=" border-2 rounded-[6px] flex  p-2 border-gray-300 overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-full w-1 ml-1 bg-${stat.color}`} />
                <CardContent className="p-6 w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-${stat.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                    <span className={`text-sm font-medium text-${stat.color}`}>{stat.change}</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Detailed Statistics */}
        <div className="grid  grid-cols-1 lg:grid-cols-3 hidden gap-6 mb-8">
          {/* Statistics by State */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Répartition par État
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                { //@ts-ignore
                statistics.general?.parEtat?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">
                      {item.etat.replace('_', ' ')}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                  </div>
                )) || (
                  <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics by Type */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Répartition par Type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                { //@ts-ignore
                statistics.general?.parType?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {getTypeLabel(item.type)}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                  </div>
                )) || (
                  <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics by Priority */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Répartition par Priorité
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                { //@ts-ignore
                statistics.general?.parPriorite?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">
                      {item.priorite}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                  </div>
                )) || (
                  <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Requests */}
          <div className="lg:col-span-2">
            <Card className=" border border-gray-300 rounded-[10px]">
              <CardHeader className="bg-primary rounded-t-[10px] text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Dernières demandes reçues
                  </CardTitle>
                  <Link href="/dashboard/admin/service-request" className="text-white border rounded-[4px] hover:text-white/80">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Voir toutes les demandes
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 text-center text-muted-foreground">Chargement des demandes...</div>
                ) : requests?.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">Aucune demande trouvée</div>
                ) : (
                  <div className="divide-y divide-border">
                    {Array.isArray(requests) && requests?.slice(0, 5).map((request: any) => (
                      <div key={request.id} className="p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {request.demande?.nom} {request.demande?.prenom}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {getTypeLabel(request.type)} - Réf: {request.numeroReference}
                            </p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            {new Date(request.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                          <Link href={`/dashboard/admin/service-request/${request.id}`}>
                            <Button variant="outline" size="sm" className="border-gray-300 rounded-[5px] bg-transparent text-sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Voir
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments */}
          <div>
            <Card className=" border rounded-[5px] border-gray-300 mb-6">
              <CardHeader className="bg-gradient-to-r from-accent to-secondary text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-secondary flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Rendez-vous du jour
                  </CardTitle>
                  <Link href="/admin/appointments" className="text-white hover:text-white/80">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Voir tous
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {rendezVousJour.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm py-4">
                      Aucun rendez-vous programmé aujourd'hui
                    </div>
                  ) : (
                     //@ts-ignore
                    rendezVousJour.map((rdv: any) => (
                      <div
                        key={rdv.id}
                        className="flex items-center gap-4 p-4 border border-primary/20 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{rdv.heure}</p>
                          <p className="text-xs text-muted-foreground truncate">{rdv.description}</p>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs px-3">
                          <Eye className="w-3 h-3 mr-1" />
                          Voir
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className=" border-2 border-gray-300 rounded-[10px]">
              <CardHeader className="bg-secondary rounded-t-[10px] text-white">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Link href="/dashboard/admin/services" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white text-sm">
                    Ajouter un Service
                  </Button>
                </Link>

                <Link href="/dashboard/admin/service-request" className="block">
                  <Button variant="outline" className="w-full text-sm bg-transparent">
                    Gérer les Demandes
                  </Button>
                </Link>

                {/* <Link href="/admin/reports" className="block">
                  <Button variant="outline" className="w-full text-sm bg-transparent">
                    Rapports & Statistiques
                  </Button>
                </Link> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}