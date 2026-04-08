"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useCommuniques } from "@/hooks/communiques/use-communiques-queries"
import { getImageUrl } from "@/lib/api/client"



// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
}

export default function Actualites() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const router = useRouter()

  const {
    data: communiquesData,
    isLoading,
    error,
  } = useCommuniques({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm || undefined,
    type: selectedCategory !== "all" ? selectedCategory : undefined,
  })

  const transformedArticles = useMemo(() => {
    if (!communiquesData?.data) return []

    return communiquesData.data.map((communique) => ({
      id: communique.id,
      title: communique.title,
      description: communique.description,
      content: communique.details,
      date: new Date(communique.date).toLocaleDateString("fr-FR"),
      // category: getCategoryLabel(communique.type),
      imageSrc: communique.poster || "/placeholder.svg",
      author: "Mairie du Plateau",
      tags: communique.tags,
      featured: false, // You can add logic to determine featured articles
    }))
  }, [communiquesData])

  const getCategoryLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      communique: "Communiqué officiel",
      press_release: "Communiqué de presse",
      news: "Actualités",
      announcement: "Annonces",
    }
    return typeMap[type] || "Actualités"
  }

  // Filtrer les articles
  const filteredArticles = useMemo(() => {
    let filtered = transformedArticles

    // Filtrage par période
    if (selectedPeriod !== "all") {
      const now = new Date()
      filtered = filtered.filter((article) => {
        const articleDate = new Date(article.date.split("/").reverse().join("-"))
        switch (selectedPeriod) {
          case "today":
            return articleDate.toDateString() === now.toDateString()
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            return articleDate >= weekAgo
          case "month":
            return articleDate.getMonth() === now.getMonth() && articleDate.getFullYear() === now.getFullYear()
          case "year":
            return articleDate.getFullYear() === now.getFullYear()
          default:
            return true
        }
      })
    }

    return filtered
  }, [transformedArticles, selectedPeriod])

  const paginatedData = useMemo(() => {
    return {
      articles: filteredArticles,
       //@ts-ignore
      totalPages: communiquesData?.totalPages || 1,
       //@ts-ignore
      totalItems: communiquesData?.total || 0,
    }
  }, [filteredArticles, communiquesData])

  const featuredNews = transformedArticles[0] // First article as featured

  const handleSearch = () => {
    setCurrentPage(1) // Reset to first page when searching
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Chargement des actualités...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Erreur lors du chargement des actualités</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.header
        className="relative bg-primary text-white py-16 md:py-40 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Image
          src="/images/service2.svg"
          alt="Image de fond section actualités"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="relative container py-28 mx-auto px-4 text-center">
          <motion.h1 className="text-4xl md:text-7xl pt-7 font-bold mb-4" variants={itemVariants}>
            ACTUALITÉS & COMMUNIQUÉS
          </motion.h1>
          <motion.p className="text-lg md:text-3xl max-w-5xl mx-auto mb-8" variants={itemVariants}>
            Retrouvez ici toutes les informations officielles, événements et mises à jour de la Mairie du Plateau.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            <motion.div className="relative flex-1 w-full" variants={itemVariants}>
              <Input
                type="text"
                placeholder="Rechercher un article"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-7 bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px] py-7 rounded-[5px] bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Filtrer par catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-800">
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="communique">Communiqué officiel</SelectItem>
                  <SelectItem value="news">Actualités</SelectItem>
                  <SelectItem value="press_release">Communiqué de presse</SelectItem>
                  <SelectItem value="announcement">Annonces</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full md:w-[180px] py-7 rounded-[5px] bg-secondary text-gray-800 border-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  <SelectItem value="today">Aujourd&apos;hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois-ci</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Featured Section */}
        {featuredNews && (
          <section className="mb-16">
            <motion.h2
              className="text-5xl font-bold text-center text-primary mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
            >
              À la Une
            </motion.h2>
            <motion.div
              className="mx-auto cursor-pointer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              onClick={() => router.push(`/actualites/${featuredNews.id}`)}
            >
              <Card className="border-none shadow-none mx-auto rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={getImageUrl(featuredNews.imageSrc) || "/placeholder.svg"}
                  alt={featuredNews.title}
                  width={500}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <CardContent className="p-6 text-center">
                  <span className="inline-block text-secondary text-3xl font-semibold px-3 py-1 rounded-full mb-3">
                    { //@ts-ignore
                    featuredNews.category}
                  </span>
                  <CardTitle className="text-4xl font-bold text-gray-800 mb-2">{featuredNews.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-3xl mt-4 font-bold mb-4">
                    {featuredNews.date}
                  </CardDescription>
                  <p className="text-gray-600 leading-10 mx-auto max-w-5xl text-2xl mb-6">{featuredNews.description}</p>
                  <Button
                    variant="outline"
                    className="border-green-600 text-xl py-5 text-green-600 hover:bg-green-600 hover:text-white bg-transparent font-bold rounded-[4px]"
                  >
                    Lire la suite
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </section>
        )}

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            {paginatedData.totalItems} article{paginatedData.totalItems > 1 ? "s" : ""} trouvé
            {paginatedData.totalItems > 1 ? "s" : ""}
            {(searchTerm || selectedCategory !== "all" || selectedPeriod !== "all") && " pour votre recherche"}
          </p>
        </div>

        {/* Latest News Section */}
        <section className="mb-16">
          <motion.h2
            className="text-4xl font-bold text-primary mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            {searchTerm || selectedCategory !== "all" || selectedPeriod !== "all"
              ? "Résultats de recherche"
              : "Dernières actualités"}
          </motion.h2>

          {paginatedData.articles.length === 0 ? (
            <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-gray-500 text-xl mb-4">Aucun article trouvé pour votre recherche.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedPeriod("all")
                  setCurrentPage(1)
                }}
                variant="outline"
                className="text-primary border-primary hover:bg-primary hover:text-white"
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
              >
                {paginatedData.articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="cursor-pointer"
                    onClick={() => router.push(`/actualites/${article.id}`)}
                  >
                    <Card className="rounded-[5px] p-0 bg-transparent shadow-none border-none overflow-hidden relative hover:shadow-lg transition-shadow">
                      <div className="h-[200px] overflow-hidden">
                        <Image
                          src={getImageUrl(article.imageSrc) || "/placeholder.svg"}
                          alt={article.title}
                          width={500}
                          height={405}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex bg-transparent min-h-2xl max-h-2xl overflow-auto relative shadow-none border-none p-0 -mt-8 rounded-t-lg z-10">
                        <div className="w-10"></div>
                        <div className="w-full bg-gray-100 space-y-4 p-10 rounded-[8px] shadow">
                          <div className="flex justify-between items-center mb-2">
                            <span className="inline-block bg-green-600 p-2 text-white text-lg mb-2 font-semibold px-4 py-1 rounded-[4px]">
                              { //@ts-ignore
                              article.category}
                            </span>
                            <span className="text-gray-500 text-lg">{article.date}</span>
                          </div>
                          <CardTitle className="text-2xl font-bold text-black mb-2">{article.title}</CardTitle>
                          <p className="text-gray-700 text-xl line-clamp-3 mb-4">
                            {article.description.slice(0, 100)}...
                          </p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-green-600 text-xl hover:underline flex items-center gap-1"
                          >
                            Lire tout <span className="text-xl">›</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {paginatedData.totalPages > 1 && (
                <motion.div
                  className="flex justify-center items-center mt-12 gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Précédent
                  </Button>

                  <div className="flex gap-2">
                    {Array.from({ length: paginatedData.totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "text-primary border-primary hover:bg-primary hover:text-white"
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === paginatedData.totalPages}
                    className="flex items-center gap-2"
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Upcoming Events Section */}
      <motion.section
        className="relative bg-primary text-white py-12 md:py-28 rounded-lg shadow-lg overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* VIDEO BACKGROUND */}
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/videos/blue-digital.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>

        {/* CONTENU */}
        <div className="relative z-20">
          <motion.h2 className="text-4xl font-bold text-center mb-20" variants={itemVariants}>
            PROCHAINS ÉVÉNEMENTS
          </motion.h2>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Event List */}
            <motion.div className="grid gap-7" variants={containerVariants}>
              {[
                { date: "21 Juin 2025", title: "Fête de la Musique", location: "Place de la République" },
                { date: "06 Septembre 2025", title: "Forum des Associations", location: "Gymnase municipal" },
                { date: "15 Octobre 2025", title: "Marché d'Automne", location: "Centre-ville" },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  className="bg-white text-gray-800 p-4 rounded-[5px] shadow-md"
                  variants={itemVariants}
                >
                  <p className="text-lg font-semibold flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    {event.date}
                  </p>
                  <h3 className="text-2xl font-bold text-primary mt-2">{event.title}</h3>
                  <p className="text-lg mt-2 text-gray-400">{event.location}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Calendar */}
            <motion.div className="bg-white text-gray-800 p-6 rounded-[5px] shadow-md" variants={itemVariants}>
              <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  &lt;
                </Button>
                <h3 className="text-xl font-bold">Juin 2025</h3>
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  &gt;
                </Button>
              </div>
              <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mer</span>
                <span>Jeu</span>
                <span>Ven</span>
                <span>Sam</span>
                <span>Dim</span>
              </div>
              <div className="grid grid-cols-7 text-center text-gray-700">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-full flex items-center justify-center ${
                      [20, 3].includes(i) ? "bg-green-600 text-white" : ""
                    } ${i === 6 ? "bg-blue-600 text-white" : ""}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
