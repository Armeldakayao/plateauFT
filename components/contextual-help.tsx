"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HelpCircle,
  X,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  Book,
  Lightbulb,
  Settings,
  User,
  FileText,
  Bell,
  Calendar,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface HelpQuestion {
  id: string
  question: string
  answer: string
  category: "navigation" | "features" | "actions" | "troubleshooting"
  icon: React.ReactNode
}

interface PageHelpConfig {
  pageTitle: string
  description: string
  quickActions: Array<{
    title: string
    description: string
    icon: React.ReactNode
  }>
  questions: HelpQuestion[]
}

const pageConfigs: Record<string, PageHelpConfig> = {
  "tableau-de-bord": {
    pageTitle: "Tableau de Bord",
    description: "Votre espace personnel pour gérer vos demandes et suivre vos services municipaux.",
    quickActions: [
      {
        title: "Nouvelle Demande",
        description: "Créer une nouvelle demande de service",
        icon: <Plus className="w-4 h-4" />,
      },
      {
        title: "Voir Mes Demandes",
        description: "Consulter l'état de vos demandes",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        title: "Mon Profil",
        description: "Gérer vos informations personnelles",
        icon: <User className="w-4 h-4" />,
      },
    ],
    questions: [
      {
        id: "1",
        question: "Comment créer une nouvelle demande ?",
        answer:
          'Cliquez sur le bouton "Nouvelle Demande" dans le tableau de bord ou utilisez le menu de navigation. Sélectionnez ensuite le type de service souhaité.',
        category: "actions",
        icon: <Plus className="w-4 h-4" />,
      },
      {
        id: "2",
        question: "Où puis-je voir l'état de mes demandes ?",
        answer:
          'Vos demandes récentes apparaissent sur le tableau de bord. Pour une vue complète, cliquez sur "Mes Demandes" dans le menu.',
        category: "navigation",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        id: "3",
        question: "Comment modifier mon profil ?",
        answer:
          'Cliquez sur votre avatar en haut à droite, puis sélectionnez "Mon Profil" pour modifier vos informations personnelles.',
        category: "features",
        icon: <User className="w-4 h-4" />,
      },
      {
        id: "4",
        question: "Les notifications ne s'affichent pas",
        answer:
          "Vérifiez que les notifications sont activées dans votre navigateur. Vous pouvez aussi consulter le centre de notifications via l'icône cloche.",
        category: "troubleshooting",
        icon: <Bell className="w-4 h-4" />,
      },
      {
        id: "5",
        question: "Comment consulter l'historique des demandes ?",
        answer:
          "Vous pouvez consulter l'historique de vos demandes en cliquant sur le bouton 'Mes Demandes' dans le menu.",
        category: "navigation",
        icon: <FileText className="w-4 h-4" />,
      },
    ],
  },
  "mes-demandes": {
    pageTitle: "Mes Demandes",
    description: "Consultez et gérez toutes vos demandes de services municipaux.",
    quickActions: [
      {
        title: "Filtrer les Demandes",
        description: "Utiliser les filtres pour trouver rapidement",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        title: "Voir Détails",
        description: "Cliquer sur une demande pour plus d'infos",
        icon: <FileText className="w-4 h-4" />,
      },
    ],
    questions: [
      {
        id: "1",
        question: "Comment filtrer mes demandes ?",
        answer:
          "Utilisez les boutons de filtre en haut de la page pour afficher les demandes par statut : En attente, En cours, Terminées, etc.",
        category: "features",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        id: "2",
        question: "Que signifient les différents statuts ?",
        answer:
          "En attente: demande reçue, En cours: en traitement, Terminée: service accompli, Rejetée: demande non acceptée.",
        category: "features",
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
      {
        id: "3",
        question: "Comment annuler une demande ?",
        answer:
          'Cliquez sur la demande pour voir les détails, puis utilisez le bouton "Annuler" si la demande n\'est pas encore en cours de traitement.',
        category: "actions",
        icon: <X className="w-4 h-4" />,
      },
      {
        id: "4",
        question: "Je ne vois pas toutes mes demandes",
        answer:
          "Assurez-vous d'avoir sélectionné le bon filtre. Par défaut, seules les demandes récentes sont affichées. Utilisez les options de filtre pour voir toutes les demandes.",
        category: "troubleshooting",
        icon: <Bell className="w-4 h-4" />,
      },

    ],
  },
  "new-request": {
    pageTitle: "Nouvelle Demande",
    description: "Créez une nouvelle demande de service municipal.",
    quickActions: [
      {
        title: "Choisir un Service",
        description: "Sélectionner le type de demande",
        icon: <Plus className="w-4 h-4" />,
      },
    ],
    questions: [
      {
        id: "1",
        question: "Quels services puis-je demander ?",
        answer:
          "Vous pouvez demander des actes de mariage, partenariat, prendre rendez-vous, et d'autres services municipaux disponibles.",
        category: "features",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        id: "2",
        question: "Combien de temps prend le traitement ?",
        answer:
          "Les délais varient selon le service : actes civils (3-5 jours), rendez-vous (selon disponibilités), autres services (1-2 semaines).",
        category: "features",
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        id: "3",
        question: "Puis-je suivre ma demande après l'avoir soumise ?",
        answer:
          'Oui, toutes vos demandes soumises apparaissent dans "Mes Demandes" où vous pouvez suivre leur statut en temps réel.',
        category: "navigation",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        id: "4",
        question: "Je rencontre des problèmes pour soumettre ma demande",
        answer:
          "Vérifiez que tous les champs obligatoires sont remplis et que les documents requis sont attachés. Si le problème persiste, contactez le support.",
        category: "troubleshooting",
        icon: <X className="w-4 h-4" />,
      },
    ],
  },
  "mon-profil": {
    pageTitle: "Mon Profil",
    description: "Gérez vos informations personnelles et préférences.",
    quickActions: [
      {
        title: "Modifier Infos",
        description: "Mettre à jour vos données personnelles",
        icon: <User className="w-4 h-4" />,
      },
      {
        title: "Paramètres",
        description: "Configurer vos préférences",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
    questions: [
      {
        id: "1",
        question: "Comment modifier mes informations ?",
        answer:
          'Cliquez sur "Modifier" dans chaque section pour mettre à jour vos informations personnelles, adresse, ou contacts.',
        category: "actions",
        icon: <User className="w-4 h-4" />,
      },
      {
        id: "2",
        question: "Mes données sont-elles sécurisées ?",
        answer:
          "Oui, toutes vos données sont chiffrées et protégées selon les normes RGPD. Seuls vous et les services autorisés y ont accès.",
        category: "features",
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
      {
        id: "3",
        question: "Comment changer mon mot de passe ?",
        answer:
          'Allez dans "Paramètres", puis "Sécurité" pour modifier votre mot de passe. Assurez-vous d\'utiliser un mot de passe fort.',
        category: "actions",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        id: "4",
        question: "Je ne reçois pas les emails de notification",
        answer:
          "Vérifiez votre dossier spam et assurez-vous que votre adresse email est correcte dans votre profil. Vous pouvez aussi ajuster vos préférences de notification.",
        category: "troubleshooting",
        icon: <Bell className="w-4 h-4" />,
      },
    ],
  },
  notifications: {
    pageTitle: "Notifications",
    description: "Consultez toutes vos notifications et alertes.",
    quickActions: [
      {
        title: "Marquer comme Lu",
        description: "Gérer l'état de vos notifications",
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
    ],
    questions: [
      {
        id: "1",
        question: "Comment gérer mes notifications ?",
        answer:
          "Cliquez sur une notification pour la marquer comme lue, ou utilisez les actions groupées pour gérer plusieurs notifications.",
        category: "actions",
        icon: <Bell className="w-4 h-4" />,
      },
      {
        id: "2",
        question: "Pourquoi ne reçois-je pas certaines notifications ?",
        answer:
          "Vérifiez vos préférences de notification dans 'Mon Profil' pour vous assurer que les types de notifications souhaités sont activés.",
        category: "troubleshooting",
        icon: <Settings className="w-4 h-4" />,
      },

    ],
  },
}

interface ContextualHelpProps {
  pageKey: string
  className?: string
}

export function ContextualHelp({ pageKey, className = "" }: ContextualHelpProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<HelpQuestion | null>(null)
  const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set())

  const config = pageConfigs[pageKey] || pageConfigs["tableau-de-bord"]

  const handleQuestionClick = (question: HelpQuestion) => {
    setSelectedQuestion(question)
    setCheckedQuestions((prev) => new Set([...prev, question.id]))
  }

  const categoryColors = {
    navigation: "bg-blue-100 text-blue-800 border-blue-200",
    features: "bg-green-100 text-green-800 border-green-200",
    actions: "bg-purple-100 text-purple-800 border-purple-200",
    troubleshooting: "bg-orange-100 text-orange-800 border-orange-200",
  }

  const categoryLabels = {
    navigation: "Navigation",
    features: "Fonctionnalités",
    actions: "Actions",
    troubleshooting: "Dépannage",
  }

  return (
    <>
      {/* Floating Help Button */}
      <motion.div
        className={`fixed bottom-16 right-6 z-50 ${className}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <HelpCircle className="w-14 h-14 group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>

      {/* Help Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-[5px]">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Aide - {config.pageTitle}</h2>
                    <p className="text-sm text-gray-600">{config.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex h-[calc(90vh-120px)]">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-gray-200/50 p-6">
                  <ScrollArea className="h-full">
                    {/* Quick Actions */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Actions Rapides
                      </h3>
                      <div className="space-y-2">
                        {config.quickActions.map((action, index) => (
                          <div
                            key={index}
                            className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-[7px] border border-blue-100"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {action.icon}
                              <span className="text-sm font-medium text-gray-900">{action.title}</span>
                            </div>
                            <p className="text-xs text-gray-600">{action.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Questions */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        Questions Fréquentes
                      </h3>
                      <div className="space-y-2">
                        {config.questions.map((question) => (
                          <motion.button
                            key={question.id}
                            onClick={() => handleQuestionClick(question)}
                            className={`w-full text-left p-3 rounded-[7px] border transition-all duration-200 ${
                              selectedQuestion?.id === question.id
                                ? "bg-blue-50 border-blue-200"
                                : "bg-white/50 border-gray-200 hover:bg-gray-50"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-shrink-0 mt-0.5">
                                {checkedQuestions.has(question.id) ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  question.icon
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 mb-1">{question.question}</p>
                                <Badge variant="outline" className={`text-xs ${categoryColors[question.category]}`}>
                                  {categoryLabels[question.category]}
                                </Badge>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <ScrollArea className="h-full">
                    {selectedQuestion ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="border-0 shadow-none bg-gradient-to-br from-blue-50/50 to-purple-50/50">
                          <CardHeader>
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-[7px] text-white">
                                {selectedQuestion.icon}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg text-gray-900 mb-2">
                                  {selectedQuestion.question}
                                </CardTitle>
                                <Badge variant="outline" className={categoryColors[selectedQuestion.category]}>
                                  {categoryLabels[selectedQuestion.category]}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 leading-relaxed">{selectedQuestion.answer}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-center">
                        <div className="max-w-md">
                          <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <MessageCircle className="w-10 h-10 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une question</h3>
                          <p className="text-gray-600">
                            Choisissez une question dans la liste pour voir la réponse détaillée.
                          </p>
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
