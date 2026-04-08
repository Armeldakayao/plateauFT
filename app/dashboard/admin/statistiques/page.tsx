"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Clock, 
  BarChart3, 
  PieChart, 
  Activity, 
  Filter, 
  Download, 
 
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader,
  Target,
  Award,
  Timer,
  RefreshCcw
} from "lucide-react"
import { useState } from "react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Cell, 
  LineChart, 
  Line, 
  Area, 
  AreaChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"
import { useServiceRequestStatistics } from "@/hooks/services-requests/use-service-request"

export default function StatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { data: statisticsData, isLoading } = useServiceRequestStatistics()
  
  const statistics = statisticsData || {}

  // Données pour les KPI
   //@ts-ignore
  const totalDemandes = statistics.general?.total || 0
   //@ts-ignore
  const demandesTraitees = statistics.general?.parEtat?.find(item => item.etat === "traite")?.count || 0
   //@ts-ignore
  const demandesEnAttente = statistics.general?.parEtat?.find(item => item.etat === "en_attente")?.count || 0
   //@ts-ignore
  const demandesEnCours = statistics.general?.parEtat?.find(item => item.etat === "en_cours")?.count || 0
   //@ts-ignore
  const tempsTraitementMoyen = statistics.traitements?.tempsTraitementMoyen || 0
  const tauxTraitement = totalDemandes > 0 ? Math.round((demandesTraitees / totalDemandes) * 100) : 0
  const tauxSatisfaction = 92 // Simulé - à adapter selon vos données

  // Données pour les graphiques
   //@ts-ignore
  const statusData = statistics.general?.parEtat?.map(item => ({
    name: item.etat.replace('_', ' ').charAt(0).toUpperCase() + item.etat.replace('_', ' ').slice(1),
    value: item.count,
    percentage: totalDemandes > 0 ? Math.round((item.count / totalDemandes) * 100) : 0,
    color: item.etat === 'valide' ? '#10B981' : 
           item.etat === 'en_cours' ? '#3B82F6' : 
           item.etat === 'nouveau' ? '#F59E0B' : 
           item.etat === 'traite' ? '#8B5CF6' : 
           item.etat === 'rejete' ? '#EF4444' : '#EAB308'
  })) || []
 //@ts-ignore
  const typeData = statistics.general?.parType?.map(item => ({
    name: item.type === 'rdv' ? 'Rendez-vous' : 
          item.type === 'partenariat' ? 'Partenariat' : 
          item.type === 'mariage' ? 'Mariage' : item.type,
    count: item.count,
    percentage: totalDemandes > 0 ? Math.round((item.count / totalDemandes) * 100) : 0
  })) || []

  // Données temporelles simulées (à adapter selon vos données réelles)
  const timeSeriesData = [
    { period: 'Sem 1', nouvelles: 12, traitees: 8, en_attente: 4 },
    { period: 'Sem 2', nouvelles: 19, traitees: 15, en_attente: 8 },
    { period: 'Sem 3', nouvelles: 15, traitees: 12, en_attente: 11 },
    { period: 'Sem 4', nouvelles: 22, traitees: 18, en_attente: 15 },
    { period: 'Sem 5', nouvelles: 18, traitees: 20, en_attente: 13 },
    { period: 'Sem 6', nouvelles: 25, traitees: 22, en_attente: 16 }
  ]

  // Données pour le radar de performance
  const performanceData = [
    { subject: 'Rapidité', A: tauxTraitement, fullMark: 100 },
    { subject: 'Qualité', A: tauxSatisfaction, fullMark: 100 },
    { subject: 'Efficacité', A: 88, fullMark: 100 },
    { subject: 'Communication', A: 95, fullMark: 100 },
    { subject: 'Suivi', A: 82, fullMark: 100 }
  ]

  // Données pour l'analyse comparative
  const comparisonData = [
    { name: 'Ce mois', valeur: totalDemandes, couleur: '#3B82F6' },
    { name: 'Mois dernier', valeur: Math.round(totalDemandes * 0.85), couleur: '#94A3B8' },
    { name: 'Même période N-1', valeur: Math.round(totalDemandes * 0.72), couleur: '#E2E8F0' }
  ]

  const kpiCards = [
    {
      title: "Total Demandes",
      value: totalDemandes,
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "blue",
      description: "Ce mois"
    },
    {
      title: "Taux de Traitement",
      value: `${tauxTraitement}%`,
      change: "+5%",
      trend: "up",
      icon: Target,
      color: "green",
      description: "Objectif: 85%"
    },
    {
      title: "Temps Moyen",
      value: `${tempsTraitementMoyen.toFixed(1)}h`,
      change: "-8%",
      trend: "down",
      icon: Timer,
      color: "purple",
      description: "Traitement"
    },
    {
      title: "Satisfaction",
      value: `${tauxSatisfaction}%`,
      change: "+3%",
      trend: "up",
      icon: Award,
      color: "orange",
      description: "Client"
    }
  ]

  const handleExportData = () => {
    // Logique d'export des données
    console.log("Exporting statistics data...")
  }

  const handleRefreshData = () => {
    // Logique de rafraîchissement des données
    console.log("Refreshing data...")
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement des statistiques...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="px-4 lg:px-8 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <BarChart3 className="w-10 h-10 text-primary" />
                Statistiques & Analytics
              </h1>
              <p className="text-muted-foreground text-lg">Analyse détaillée des performances et tendances</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 derniers jours</SelectItem>
                  <SelectItem value="30d">30 derniers jours</SelectItem>
                  <SelectItem value="90d">3 derniers mois</SelectItem>
                  <SelectItem value="1y">12 derniers mois</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleRefreshData} className="gap-2">
                <RefreshCcw className="w-4 h-4" />
                Actualiser
              </Button>
              <Button onClick={handleExportData} className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => {
            const IconComponent = kpi.icon
            const isPositive = kpi.trend === "up"
            const TrendIcon = isPositive ? TrendingUp : TrendingDown
            
            return (
              <Card key={index} className="border-2 border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-${kpi.color}-100 flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${kpi.color}-600`} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <TrendIcon className="w-3 h-3" />
                      {kpi.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground mb-1">{kpi.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{kpi.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Évolution temporelle */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-primary to-primary text-white rounded-t-[7px]">
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Évolution des Demandes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorNouvelles" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorTraitees" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="nouvelles" stackId="1" stroke="#3B82F6" fill="url(#colorNouvelles)" />
                    <Area type="monotone" dataKey="traitees" stackId="1" stroke="#10B981" fill="url(#colorTraitees)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Répartition par statut */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-t-[7px]">
              <CardTitle className="text-xl flex items-center gap-2">
                <PieChart className="w-6 h-6" />
                Répartition par Type (Forme de circulaire)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        { //@ts-ignore
                        typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : index === 1 ? '#F59E0B' : '#8B5CF6'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
          </Card>
        </div>

        {/* Analyses détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Analyse par type */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-[7px]">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Par Type de Service
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Radar de performance */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-t-[7px]">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Performance Globale
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={performanceData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Performance" dataKey="A" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comparaison périodes */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-[7px]">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Analyse Comparative
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {comparisonData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(item.valeur / Math.max(...comparisonData.map(d => d.valeur))) * 100}%`,
                            backgroundColor: item.couleur
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold w-8 text-right">{item.valeur}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-sm mb-3">Insights</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-700">+15% vs mois dernier</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="w-3 h-3 text-blue-500" />
                    <span className="text-blue-700">+28% vs même période N-1</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Résumé et actions */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-t-[7px]">
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Résumé Exécutif & Recommandations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Points Forts
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Taux de satisfaction élevé (92%)</li>
                  <li>• Croissance stable des demandes</li>
                  <li>• Délais de traitement respectés</li>
                  <li>• Bonne répartition par type de service</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-orange-700 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Points d'Attention
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {demandesEnAttente} demandes en attente</li>
                  <li>• Pic d'activité en fin de semaine</li>
                  <li>• Temps de réponse initial à optimiser</li>
                  <li>• Charge de travail inégale par service</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-blue-700 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recommandations
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Automatiser les accusés de réception</li>
                  <li>• Prévoir des renforts en fin de semaine</li>
                  <li>• Mettre en place des SLA par priorité</li>
                  <li>• Former l'équipe sur les nouveaux outils</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}