"use client"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCommunique, useCommuniques } from "@/hooks/communiques/use-communiques-queries"
import { useAddComment } from "@/hooks/communiques/use-communiques-mutation"
import { getImageUrl } from "@/lib/api/client"



export default function ActualiteDetail() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id as string

  const { data: article, isLoading, error } = useCommunique(articleId)
  const { data: relatedArticlesData } = useCommuniques({
     //@ts-ignore
    type: article?.type,
    limit: 3,
  })

  const [newComment, setNewComment] = useState("")
  const addCommentMutation = useAddComment()

  // Filter related articles (same type, excluding current article)
  const relatedArticles = relatedArticlesData?.data?.filter((a) => a.id !== articleId)?.slice(0, 3) || []

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const handleAddComment = async () => {
    if (!newComment.trim() || !articleId) return

    try {
      await addCommentMutation.mutateAsync({
        id: articleId,
        data: { comment: newComment.trim() },
      })
      setNewComment("")
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-4">L'article demandé n'existe pas.</p>
          <Link href="/actualites">
            <Button className="bg-primary text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux actualités
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
     //@ts-ignore
    const title = article.title

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  const getCategoryLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      communique: "Communiqué officiel",
      press_release: "Communiqué de presse",
      news: "Actualités",
      announcement: "Annonces",
    }
    return typeMap[type] || "Actualités"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-8"
      >
        {/* Navigation */}
        <motion.div variants={itemVariants} className="mb-8 pt-40">
          <Button variant="ghost" onClick={() => router.back()} className="text-primary hover:text-primary/80 p-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="mb-4">
            <Badge className="bg-green-600 text-white text-lg px-4 py-2 rounded-[4px]">
              { //@ts-ignore
              getCategoryLabel(article.type)}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">{
             //@ts-ignore
          article.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-lg">{
                 //@ts-ignore
              new Date(article.date).toLocaleDateString("fr-FR")}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-lg">Mairie du Plateau</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{
                 //@ts-ignore
              article.viewCount} vues</span>
            </div>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">{
             //@ts-ignore
          article.description}</p>
        </motion.div>

        {/* Article Image */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={
                 //@ts-ignore
                getImageUrl(article.poster) || "/placeholder.svg"}
              alt={ //@ts-ignore
                article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-700 text-xl leading-relaxed">
                <div 
                 //@ts-ignore
                dangerouslySetInnerHTML={{ __html: article.details.replace(/\n/g, "<br>") }} />
              </div>

              {/* Gallery */}
              { //@ts-ignore
              article.gallery && article.gallery.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Galerie</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    { //@ts-ignore
                    article.gallery.map((imageUrl, index) => (
                      <div key={index} className="relative h-64 rounded-[7px] border overflow-hidden">
                        <Image
                          src={getImageUrl(imageUrl) || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              { //@ts-ignore
              article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-500 font-medium">Tags :</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    { //@ts-ignore
                    article.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="h-5 w-5 text-gray-500" />
                  <h3 className="text-xl font-bold text-gray-800">Commentaires ({
                     //@ts-ignore
                  article.comments?.length || 0})</h3>
                </div>

                {/* Add Comment Form */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <Textarea
                    placeholder="Ajouter un commentaire..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-4"
                    rows={3}
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || addCommentMutation.isPending}
                    className="bg-primary text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {addCommentMutation.isPending ? "Envoi..." : "Publier le commentaire"}
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  { //@ts-ignore
                  article.comments && article.comments.length > 0 ? (
                     //@ts-ignore
                    article.comments.map((comment, index) => (
                      <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-800">Citoyen</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">Maintenant</span>
                        </div>
                        <p className="text-gray-700">{comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Aucun commentaire pour le moment. Soyez le premier à commenter !
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Share */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Partager
              </h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("facebook")}
                  className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("twitter")}
                  className="flex-1 text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("linkedin")}
                  className="flex-1 text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Articles similaires</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link key={relatedArticle.id} href={`/actualites/${relatedArticle.id}`} className="block group">
                      <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="relative w-20 h-16 rounded-[7px] border overflow-hidden flex-shrink-0">
                          <Image
                            src={getImageUrl(relatedArticle.poster) || "/placeholder.svg"}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-tight">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(relatedArticle.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/actualites">
                  <Button
                    variant="outline"
                    className="w-full mt-4 text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    Voir toutes les actualités
                  </Button>
                </Link>
              </Card>
            )}

            {/* Contact */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Besoin d'informations ?</h3>
              <p className="text-blue-700 mb-4 text-sm">
                Contactez notre service communication pour plus de détails sur cet article.
              </p>
              <div className="space-y-2 text-sm text-blue-700">
                <p>
                  <strong>Email :</strong> communication@mairie-plateau.fr
                </p>
                <p>
                  <strong>Téléphone :</strong> 01 23 45 67 89
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Navigation to other articles */}
        <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link href="/actualites">
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Toutes les actualités
              </Button>
            </Link>
            <div className="text-sm text-gray-500">
              Article publié le {
                 //@ts-ignore
              new Date(article.date).toLocaleDateString("fr-FR")} par Mairie du Plateau
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
