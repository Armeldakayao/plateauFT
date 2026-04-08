// // "use client"

// // import type React from "react"

// // import { useState, useRef, useEffect } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { ScrollArea } from "@/components/ui/scroll-area"
// // import { MessageSquare, Send, X } from "lucide-react"
// // import { cn } from "@/lib/utils"

// // interface Message {
// //   role: "user" | "assistant"
// //   content: string
// // }

// // export default function ChatbotPopup() {
// //   const [isOpen, setIsOpen] = useState(false)
// //   const [messages, setMessages] = useState<Message[]>([
// //     { role: "assistant", content: "Bonjour ! Comment puis-je vous aider aujourd'hui concernant notre plateforme ?" },
// //   ])
// //   const [input, setInput] = useState("")
// //   const [isLoading, setIsLoading] = useState(false)
// //   const messagesEndRef = useRef<HTMLDivElement>(null)

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
// //   }

// //   useEffect(() => {
// //     scrollToBottom()
// //   }, [messages])

// //   const simulateBotResponse = (userMessage: string): string => {
// //     const lowerCaseMessage = userMessage.toLowerCase()

// //     if (lowerCaseMessage.includes("état civil") || lowerCaseMessage.includes("acte de naissance")) {
// //       return 'Pour les demandes d\'état civil, vous pouvez trouver toutes les informations et formulaires nécessaires dans la section "Services Civils" de notre plateforme.'
// //     }
// //     if (lowerCaseMessage.includes("rendez-vous") || lowerCaseMessage.includes("prendre rdv")) {
// //       return "Vous pouvez prendre rendez-vous directement via notre module de réservation en ligne. Il suffit de sélectionner le service et la date souhaitée."
// //     }
// //     if (lowerCaseMessage.includes("réservation") || lowerCaseMessage.includes("réserver")) {
// //       return 'Notre système de réservation vous permet de réserver des ressources ou des services. Rendez-vous dans la section "Réservations" pour commencer.'
// //     }
// //     if (lowerCaseMessage.includes("signalement") || lowerCaseMessage.includes("signaler")) {
// //       return 'Pour effectuer un signalement, veuillez utiliser le formulaire dédié dans la section "Signalements". Nous traiterons votre demande dans les plus brefs délais.'
// //     }
// //     if (lowerCaseMessage.includes("fonctionnalités") || lowerCaseMessage.includes("infos plateforme")) {
// //       return "Notre plateforme offre des services d'état civil, de prise de rendez-vous, de réservations de ressources et un système de signalement. Explorez les différentes sections pour en savoir plus !"
// //     }
// //     if (lowerCaseMessage.includes("merci") || lowerCaseMessage.includes("au revoir")) {
// //       return "De rien ! N'hésitez pas si vous avez d'autres questions. Bonne journée !"
// //     }
// //     if (lowerCaseMessage.includes("bonjour") || lowerCaseMessage.includes("salut")) {
// //       return "Bonjour ! Comment puis-je vous aider ?"
// //     }
// //     return "Je suis un chatbot de démonstration. Je peux vous donner des informations sur l'état civil, les rendez-vous, les réservations et les signalements. Posez-moi une question !"
// //   }

// //   const handleSendMessage = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (input.trim() === "") return

// //     const userMessage: Message = { role: "user", content: input }
// //     setMessages((prevMessages) => [...prevMessages, userMessage])
// //     setInput("")
// //     setIsLoading(true)

// //     // Simulate API call delay
// //     setTimeout(() => {
// //       const botResponseContent = simulateBotResponse(userMessage.content)
// //       const botMessage: Message = { role: "assistant", content: botResponseContent }
// //       setMessages((prevMessages) => [...prevMessages, botMessage])
// //       setIsLoading(false)
// //     }, 1000) // Simulate 1 second delay
// //   }

// //   return (
// //     <>
// //       {!isOpen && (
// //         <Button
// //           className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
// //           onClick={() => setIsOpen(true)}
// //           aria-label="Ouvrir le chatbot"
// //         >
// //           <MessageSquare className="h-6 w-6" />
// //         </Button>
// //       )}

// //       {isOpen && (
// //         <Card className="fixed bottom-4 z-50 bg-white right-4 w-full max-w-sm md:max-w-md lg:max-w-lg h-[calc(100vh-8rem)] max-h-[600px] flex flex-col shadow-xl">
// //           <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
// //             <CardTitle className="text-lg font-semibold">Chatbot d'information</CardTitle>
// //             <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Fermer le chatbot">
// //               <X className="h-5 w-5" />
// //             </Button>
// //           </CardHeader>
// //           <CardContent className="flex-1 p-4 overflow-hidden">
// //             <ScrollArea className="h-full pr-4">
// //               <div className="space-y-4">
// //                 {messages.map((msg, index) => (
// //                   <div key={index} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
// //                     <div
// //                       className={cn(
// //                         "max-w-[70%] p-3 rounded-lg",
// //                         msg.role === "user"
// //                           ? "bg-blue-500 text-white"
// //                           : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
// //                       )}
// //                     >
// //                       {msg.content}
// //                     </div>
// //                   </div>
// //                 ))}
// //                 {isLoading && (
// //                   <div className="flex justify-start">
// //                     <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
// //                       Typing...
// //                     </div>
// //                   </div>
// //                 )}
// //                 <div ref={messagesEndRef} />
// //               </div>
// //             </ScrollArea>
// //           </CardContent>
// //           <CardFooter className="p-4 border-t">
// //             <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
// //               <Input
// //                 placeholder="Tapez votre message..."
// //                 value={input}
// //                 onChange={(e) => setInput(e.target.value)}
// //                 disabled={isLoading}
// //                 aria-label="Champ de saisie du message"
// //               />
// //               <Button type="submit" disabled={isLoading} aria-label="Envoyer le message">
// //                 <Send className="h-5 w-5" />
// //               </Button>
// //             </form>
// //           </CardFooter>
// //         </Card>
// //       )}
// //     </>
// //   )
// // }
// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { MessageSquare, Send, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { motion, AnimatePresence } from "framer-motion" // Import Framer Motion

// interface Message {
//   role: "user" | "assistant"
//   content: string
// }

// export default function ChatbotPopup() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [messages, setMessages] = useState<Message[]>([
//     { role: "assistant", content: "Bonjour ! Comment puis-je vous aider aujourd'hui concernant notre plateforme ?" },
//   ])
//   const [input, setInput] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const simulateBotResponse = (userMessage: string): string => {
//     const lowerCaseMessage = userMessage.toLowerCase().trim()

//     // Greetings and farewells
//     if (
//       lowerCaseMessage.includes("bonjour") ||
//       lowerCaseMessage.includes("salut") ||
//       lowerCaseMessage.includes("hello")
//     ) {
//       const greetings = [
//         "Bonjour ! Comment puis-je vous aider aujourd'hui concernant notre plateforme ?",
//         "Salut ! Que puis-je faire pour vous ?",
//         "Bonjour ! Je suis là pour répondre à vos questions sur nos services.",
//         "Bienvenue ! Posez-moi une question sur nos services municipaux.",
//       ]
//       return greetings[Math.floor(Math.random() * greetings.length)]
//     }
//     if (
//       lowerCaseMessage.includes("merci") ||
//       lowerCaseMessage.includes("au revoir") ||
//       lowerCaseMessage.includes("bonne journée") ||
//       lowerCaseMessage.includes("bye")
//     ) {
//       const farewells = [
//         "De rien ! N'hésitez pas si vous avez d'autres questions. Bonne journée !",
//         "Avec plaisir ! Au revoir et à bientôt.",
//         "Ravi d'avoir pu vous aider. N'hésitez pas à revenir si besoin !",
//         "C'est un plaisir ! À très vite.",
//       ]
//       return farewells[Math.floor(Math.random() * farewells.length)]
//     }

//     // Specific services
//     if (
//       lowerCaseMessage.includes("état civil") ||
//       lowerCaseMessage.includes("acte de naissance") ||
//       lowerCaseMessage.includes("mariage") ||
//       lowerCaseMessage.includes("décès") ||
//       lowerCaseMessage.includes("pacs")
//     ) {
//       return 'Pour les demandes d\'état civil (actes de naissance, mariage, décès, PACS), vous pouvez trouver toutes les informations et formulaires nécessaires dans la section "Services Civils" de notre plateforme. Un guide détaillé est disponible pour chaque démarche, y compris les pièces à fournir et les délais.'
//     }
//     if (
//       lowerCaseMessage.includes("rendez-vous") ||
//       lowerCaseMessage.includes("prendre rdv") ||
//       lowerCaseMessage.includes("rdv") ||
//       lowerCaseMessage.includes("agenda")
//     ) {
//       return "Vous pouvez prendre rendez-vous directement via notre module de réservation en ligne. Il suffit de sélectionner le service (ex: urbanisme, passeport, carte d'identité) et la date souhaitée. N'oubliez pas de confirmer votre rendez-vous par email et de vérifier les documents nécessaires."
//     }
//     if (
//       lowerCaseMessage.includes("réservation") ||
//       lowerCaseMessage.includes("réserver") ||
//       lowerCaseMessage.includes("salle") ||
//       lowerCaseMessage.includes("matériel") ||
//       lowerCaseMessage.includes("équipement")
//     ) {
//       return 'Notre système de réservation vous permet de réserver des ressources ou des services (salles municipales, matériel sportif, équipements culturels, etc.). Rendez-vous dans la section "Réservations" pour consulter les disponibilités, les tarifs et effectuer votre demande en ligne.'
//     }
//     if (
//       lowerCaseMessage.includes("signalement") ||
//       lowerCaseMessage.includes("signaler") ||
//       lowerCaseMessage.includes("problème") ||
//       lowerCaseMessage.includes("incident") ||
//       lowerCaseMessage.includes("dégradation")
//     ) {
//       return 'Pour effectuer un signalement (voirie, propreté, éclairage public, nuisances sonores, dégradations), veuillez utiliser le formulaire dédié dans la section "Signalements". Nous traiterons votre demande dans les plus brefs délais et vous tiendrons informé du suivi par email.'
//     }
//     if (
//       lowerCaseMessage.includes("urbanisme") ||
//       lowerCaseMessage.includes("permis de construire") ||
//       lowerCaseMessage.includes("déclaration préalable") ||
//       lowerCaseMessage.includes("cadastre") ||
//       lowerCaseMessage.includes("plan local")
//     ) {
//       return "Toutes les informations relatives à l'urbanisme, y compris les demandes de permis de construire, déclarations préalables de travaux, consultation du cadastre et du Plan Local d'Urbanisme (PLU), sont disponibles dans la section \"Urbanisme et Aménagement\"."
//     }
//     if (
//       lowerCaseMessage.includes("social") ||
//       lowerCaseMessage.includes("aide") ||
//       lowerCaseMessage.includes("ccas") ||
//       lowerCaseMessage.includes("précarité")
//     ) {
//       return 'Le Centre Communal d\'Action Sociale (CCAS) propose diverses aides et accompagnements pour les personnes en difficulté (aide alimentaire, logement, insertion). Vous trouverez les détails des services sociaux et les contacts utiles dans la section "Action Sociale".'
//     }
//     if (
//       lowerCaseMessage.includes("culture") ||
//       lowerCaseMessage.includes("événements") ||
//       lowerCaseMessage.includes("bibliothèque") ||
//       lowerCaseMessage.includes("spectacle") ||
//       lowerCaseMessage.includes("exposition")
//     ) {
//       return 'Découvrez notre agenda culturel et les événements à venir dans la section "Culture et Loisirs". Vous y trouverez aussi les horaires de la bibliothèque, des informations sur les associations culturelles et les expositions en cours.'
//     }
//     if (
//       lowerCaseMessage.includes("transport") ||
//       lowerCaseMessage.includes("bus") ||
//       lowerCaseMessage.includes("horaires") ||
//       lowerCaseMessage.includes("mobilité")
//     ) {
//       return 'Pour toute information sur les transports en commun, les lignes de bus, les horaires, les abonnements et les plans de mobilité douce (vélos, trottinettes), veuillez consulter la section "Transports" ou notre outil de recherche d\'itinéraires.'
//     }
//     if (
//       lowerCaseMessage.includes("éducation") ||
//       lowerCaseMessage.includes("école") ||
//       lowerCaseMessage.includes("inscription scolaire") ||
//       lowerCaseMessage.includes("cantine") ||
//       lowerCaseMessage.includes("crèche")
//     ) {
//       return 'La section "Éducation" regroupe les informations sur les écoles maternelles et primaires, les modalités d\'inscription scolaire, les services de cantine, les activités périscolaires et les crèches municipales.'
//     }
//     if (
//       lowerCaseMessage.includes("taxes") ||
//       lowerCaseMessage.includes("impôts") ||
//       lowerCaseMessage.includes("paiement") ||
//       lowerCaseMessage.includes("facture")
//     ) {
//       return 'Pour les informations sur les taxes locales (taxe foncière, taxe d\'habitation), les impôts ou les modalités de paiement de vos factures municipales, veuillez vous référer à la section "Finances et Fiscalité" ou contacter le service concerné.'
//     }
//     if (
//       lowerCaseMessage.includes("carte d'identité") ||
//       lowerCaseMessage.includes("passeport") ||
//       lowerCaseMessage.includes("permis de conduire") ||
//       lowerCaseMessage.includes("documents")
//     ) {
//       return 'Pour les demandes de carte d\'identité, passeport ou permis de conduire, veuillez consulter la section "Démarches Administratives". Vous y trouverez la liste des pièces à fournir, les formulaires et la procédure à suivre pour prendre rendez-vous.'
//     }
//     if (
//       lowerCaseMessage.includes("emploi") ||
//       lowerCaseMessage.includes("travail") ||
//       lowerCaseMessage.includes("insertion professionnelle")
//     ) {
//       return "La section \"Emploi et Formation\" propose des informations sur les offres d'emploi locales, les dispositifs d'aide à la recherche d'emploi et les formations professionnelles disponibles sur le territoire."
//     }
//     if (
//       lowerCaseMessage.includes("logement") ||
//       lowerCaseMessage.includes("aide au logement") ||
//       lowerCaseMessage.includes("logement social")
//     ) {
//       return 'Pour toute question relative au logement, y compris les demandes de logement social, les aides au logement ou les informations sur les dispositifs d\'accès au logement, consultez la section "Logement".'
//     }
//     if (
//       lowerCaseMessage.includes("santé") ||
//       lowerCaseMessage.includes("centre de santé") ||
//       lowerCaseMessage.includes("vaccination") ||
//       lowerCaseMessage.includes("médecin")
//     ) {
//       return 'La section "Santé" vous informe sur les centres de santé, les campagnes de vaccination, les dispositifs de prévention et les coordonnées des professionnels de santé de la commune.'
//     }
//     if (
//       lowerCaseMessage.includes("environnement") ||
//       lowerCaseMessage.includes("déchets") ||
//       lowerCaseMessage.includes("recyclage") ||
//       lowerCaseMessage.includes("propreté")
//     ) {
//       return 'Pour les informations sur la gestion des déchets, le recyclage, les déchetteries, la propreté urbaine et les initiatives environnementales de la commune, consultez la section "Environnement et Cadre de Vie".'
//     }
//     if (
//       lowerCaseMessage.includes("jeunesse") ||
//       lowerCaseMessage.includes("activités jeunes") ||
//       lowerCaseMessage.includes("séniors") ||
//       lowerCaseMessage.includes("aînés")
//     ) {
//       return 'Des sections dédiées sont disponibles pour la "Jeunesse" (activités, dispositifs d\'aide, information) et les "Séniors" (animations, services à domicile, aides spécifiques). N\'hésitez pas à les explorer !'
//     }
//     if (
//       lowerCaseMessage.includes("démarches administratives") ||
//       lowerCaseMessage.includes("formulaire") ||
//       lowerCaseMessage.includes("certificat") ||
//       lowerCaseMessage.includes("attestation") ||
//       lowerCaseMessage.includes("en ligne")
//     ) {
//       return 'Vous trouverez la plupart de nos formulaires et la liste des démarches administratives réalisables en ligne dans la section "Démarches en Ligne". C\'est le moyen le plus rapide pour effectuer vos requêtes.'
//     }

//     // General platform info
//     if (
//       lowerCaseMessage.includes("fonctionnalités") ||
//       lowerCaseMessage.includes("infos plateforme") ||
//       lowerCaseMessage.includes("que faites-vous") ||
//       lowerCaseMessage.includes("services")
//     ) {
//       return "Notre plateforme offre une gamme complète de services : état civil, rendez-vous, réservations, signalements, urbanisme, action sociale, culture, transports, éducation, documents d'identité, emploi, logement, santé, environnement et démarches administratives générales. Comment puis-je vous orienter ?"
//     }

//     // Fallback
//     const fallbacks = [
//       "Je suis un chatbot de démonstration et mes réponses sont basées sur des mots-clés. Je peux vous donner des informations sur l'état civil, les rendez-vous, les réservations, les signalements, l'urbanisme, l'action sociale, la culture, les transports, l'éducation, les documents d'identité, l'emploi, le logement, la santé, l'environnement et les démarches administratives générales. Pouvez-vous reformuler votre question ou choisir un sujet parmi ceux-ci ?",
//       "Je ne suis pas sûr de comprendre votre demande. Pourriez-vous être plus précis ou poser une question sur l'un de nos services (ex: 'Comment obtenir un acte de naissance ?', 'Où prendre rendez-vous pour un passeport ?') ?",
//       "Mes connaissances sont limitées aux services de la plateforme. Si votre question concerne un autre sujet, je ne pourrai malheureusement pas vous aider. N'hésitez pas à consulter notre FAQ pour plus d'informations.",
//     ]
//     return fallbacks[Math.floor(Math.random() * fallbacks.length)]
//   }

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (input.trim() === "") return

//     const userMessage: Message = { role: "user", content: input }
//     setMessages((prevMessages) => [...prevMessages, userMessage])
//     setInput("")
//     setIsLoading(true)

//     setTimeout(() => {
//       const botResponseContent = simulateBotResponse(userMessage.content)
//       const botMessage: Message = { role: "assistant", content: botResponseContent }
//       setMessages((prevMessages) => [...prevMessages, botMessage])
//       setIsLoading(false)
//     }, 700)
//   }

//   return (
//     <>
//       {!isOpen && (
//         <Button
//           className="fixed bottom-4 right-4 rounded-full p-4 shadow-xl bg-gradient-to-br from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800 transition-all duration-300 ease-in-out transform hover:scale-105"
//           onClick={() => setIsOpen(true)}
//           aria-label="Ouvrir le chatbot"
//         >
//           <MessageSquare className="h-7 w-7" />
//         </Button>
//       )}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 50, scale: 0.9 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="fixed bottom-4 z-50 right-4 w-full max-w-sm md:max-w-md lg:max-w-lg h-[calc(100vh-8rem)] max-h-[600px] flex flex-col shadow-2xl rounded-xl overflow-hidden"
//           >
//             <Card className="h-full flex flex-col bg-white dark:bg-gray-900">
//               <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//                 <CardTitle className="text-lg font-semibold">Chatbot d'information</CardTitle>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setIsOpen(false)}
//                   aria-label="Fermer le chatbot"
//                   className="text-white hover:bg-white/20"
//                 >
//                   <X className="h-5 w-5" />
//                 </Button>
//               </CardHeader>
//               <CardContent className="flex-1 p-4 overflow-hidden bg-gray-50 dark:bg-gray-800">
//                 <ScrollArea className="h-full pr-4">
//                   <div className="space-y-4">
//                     {messages.map((msg, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2, delay: index * 0.05 }} // Staggered animation
//                         className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
//                       >
//                         <div
//                           className={cn(
//                             "max-w-[75%] p-3 rounded-xl shadow-sm",
//                             msg.role === "user"
//                               ? "bg-blue-600 text-white rounded-br-none"
//                               : "bg-gradient-to-br from-green-100 to-green-50 text-gray-800 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200 rounded-bl-none",
//                           )}
//                         >
//                           {msg.content}
//                         </div>
//                       </motion.div>
//                     ))}
//                     {isLoading && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="flex justify-start"
//                       >
//                         <div className="max-w-[70%] p-3 rounded-xl bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none">
//                           Typing...
//                         </div>
//                       </motion.div>
//                     )}
//                     <div ref={messagesEndRef} />
//                   </div>
//                 </ScrollArea>
//               </CardContent>
//               <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
//                 <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
//                   <Input
//                     placeholder="Tapez votre message..."
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     disabled={isLoading}
//                     aria-label="Champ de saisie du message"
//                     className="flex-1 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   <Button
//                     type="submit"
//                     disabled={isLoading}
//                     aria-label="Envoyer le message"
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     <Send className="h-5 w-5" />
//                   </Button>
//                 </form>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }
"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Définition des éléments du menu pour les liens cliquables
const menuItems = [
  { label: "Accueil", href: "/" },
  { label: "La Mairie", href: "/la-mairie" },
  { label: "Services Administratifs", href: "/services" },
  { label: "Actualités", href: "/actualites" },
  { label: "Ou aller ?", href: "/ou-aller" },
  { label: "Contact", href: "/contact" },
]

// Liste exhaustive des mots-clés que le chatbot peut comprendre
const KEYWORDS = [
  "état civil",
  "acte de naissance",
  "mariage",
  "décès",
  "pacs",
  "rendez-vous",
  "prendre rdv",
  "rdv",
  "agenda",
  "réservation",
  "réserver",
  "salle",
  "matériel",
  "équipement",
  "signalement",
  "signaler",
  "problème",
  "incident",
  "dégradation",
  "urbanisme",
  "permis de construire",
  "déclaration préalable",
  "cadastre",
  "plan local",
  "social",
  "aide",
  "ccas",
  "précarité",
  "culture",
  "événements",
  "bibliothèque",
  "spectacle",
  "exposition",
  "transport",
  "bus",
  "horaires",
  "mobilité",
  "éducation",
  "école",
  "inscription scolaire",
  "cantine",
  "crèche",
  "taxes",
  "impôts",
  "paiement",
  "facture",
  "carte d'identité",
  "passeport",
  "permis de conduire",
  "documents",
  "emploi",
  "travail",
  "insertion professionnelle",
  "logement",
  "aide au logement",
  "logement social",
  "santé",
  "centre de santé",
  "vaccination",
  "médecin",
  "environnement",
  "déchets",
  "recyclage",
  "propreté",
  "jeunesse",
  "activités jeunes",
  "séniors",
  "aînés",
  "démarches administratives",
  "formulaire",
  "certificat",
  "attestation",
  "en ligne",
  "fonctionnalités",
  "infos plateforme",
  "que faites-vous",
  "services",
  "horaires d'ouverture",
  "adresse",
  "téléphone",
  "contact mairie",
  "élections",
  "inscription listes électorales",
  "associations",
  "vie associative",
  "enfance",
  "petite enfance",
  "centre de loisirs",
  "sport",
  "activités sportives",
  "équipements sportifs",
  "police municipale",
  "sécurité",
  "marchés",
  "commerces",
  "numéros d'urgence",
  "mairie",
]

interface Message {
  role: "user" | "assistant"
  content: string | React.ReactNode // Permet d'inclure des éléments JSX (liens)
}

export default function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Génère le message initial avec la liste des mots-clés
  const generateInitialMessage = useMemo(
    () => (): Message => {
      const keywordList = KEYWORDS.map((keyword) => (
        <span
          key={keyword}
          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1 dark:bg-blue-900 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          onClick={() => selectSuggestion(keyword)}
        >
          {keyword}
        </span>
      ))

      return {
        role: "assistant",
        content: (
          <>
            Bonjour ! Je suis votre assistant virtuel. Je peux vous aider avec des informations sur notre plateforme.
            <br />
            <br />
            Voici quelques sujets sur lesquels je peux vous renseigner. Cliquez sur un mot-clé pour le saisir :
            <div className="mt-2 flex flex-wrap gap-1">{keywordList}</div>
            <br />
            N'hésitez pas à taper un mot-clé ou une question !
          </>
        ),
      }
    },
    [],
  ) // useMemo pour éviter de recréer la fonction à chaque rendu

  useEffect(() => {
    // Initialise les messages seulement si le tableau est vide (première ouverture)
    if (messages.length === 0) {
      setMessages([generateInitialMessage()])
    }
  }, [messages, generateInitialMessage])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Helper pour créer un lien cliquable
  const createLink = (label: string, href: string) => (
    <Link
      key={href}
      href={href}
      className="text-blue-400 hover:underline font-medium"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </Link>
  )

  const simulateBotResponse = (userMessage: string): React.ReactNode => {
    const lowerCaseMessage = userMessage.toLowerCase().trim()

    // Greetings and farewells
    if (
      lowerCaseMessage.includes("bonjour") ||
      lowerCaseMessage.includes("salut") ||
      lowerCaseMessage.includes("hello")
    ) {
      const greetings = [
        "Bonjour ! Comment puis-je vous aider aujourd'hui concernant notre plateforme ?",
        "Salut ! Que puis-je faire pour vous ?",
        "Bonjour ! Je suis là pour répondre à vos questions sur nos services.",
        "Bienvenue ! Posez-moi une question sur nos services municipaux.",
      ]
      return greetings[Math.floor(Math.random() * greetings.length)]
    }
    if (
      lowerCaseMessage.includes("merci") ||
      lowerCaseMessage.includes("au revoir") ||
      lowerCaseMessage.includes("bonne journée") ||
      lowerCaseMessage.includes("bye")
    ) {
      const farewells = [
        "De rien ! N'hésitez pas si vous avez d'autres questions. Bonne journée !",
        "Avec plaisir ! Au revoir et à bientôt.",
        "Ravi d'avoir pu vous aider. N'hésitez pas à revenir si besoin !",
        "C'est un plaisir ! À très vite.",
      ]
      return farewells[Math.floor(Math.random() * farewells.length)]
    }

    // Specific services with links
    if (
      lowerCaseMessage.includes("état civil") ||
      lowerCaseMessage.includes("acte de naissance") ||
      lowerCaseMessage.includes("mariage") ||
      lowerCaseMessage.includes("décès") ||
      lowerCaseMessage.includes("pacs")
    ) {
      return (
        <>
          Pour les demandes d'état civil (actes de naissance, mariage, décès, PACS), vous pouvez trouver toutes les
          informations et formulaires nécessaires dans la section {createLink("Services Administratifs", "/services")}{" "}
          de notre plateforme. Un guide détaillé est disponible pour chaque démarche, y compris les pièces à fournir et
          les délais.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("rendez-vous") ||
      lowerCaseMessage.includes("prendre rdv") ||
      lowerCaseMessage.includes("rdv") ||
      lowerCaseMessage.includes("agenda")
    ) {
      return (
        <>
          Vous pouvez prendre rendez-vous directement via notre module de réservation en ligne. Il suffit de
          sélectionner le service (ex: urbanisme, passeport, carte d'identité) et la date souhaitée. N'oubliez pas de
          confirmer votre rendez-vous par email et de vérifier les documents nécessaires. Rendez-vous sur la page{" "}
          {createLink("Services Administratifs", "/services")} pour plus d'informations.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("réservation") ||
      lowerCaseMessage.includes("réserver") ||
      lowerCaseMessage.includes("salle") ||
      lowerCaseMessage.includes("matériel") ||
      lowerCaseMessage.includes("équipement")
    ) {
      return (
        <>
          Notre système de réservation vous permet de réserver des ressources ou des services (salles municipales,
          matériel sportif, équipements culturels, etc.). Rendez-vous dans la section{" "}
          {createLink("Services Administratifs", "/services")} pour consulter les disponibilités, les tarifs et
          effectuer votre demande en ligne.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("signalement") ||
      lowerCaseMessage.includes("signaler") ||
      lowerCaseMessage.includes("problème") ||
      lowerCaseMessage.includes("incident") ||
      lowerCaseMessage.includes("dégradation")
    ) {
      return (
        <>
          Pour effectuer un signalement (voirie, propreté, éclairage public, nuisances sonores, dégradations), veuillez
          utiliser le formulaire dédié dans la section {createLink("Contact", "/contact")}. Nous traiterons votre
          demande dans les plus brefs délais et vous tiendrons informé du suivi par email.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("urbanisme") ||
      lowerCaseMessage.includes("permis de construire") ||
      lowerCaseMessage.includes("déclaration préalable") ||
      lowerCaseMessage.includes("cadastre") ||
      lowerCaseMessage.includes("plan local")
    ) {
      return (
        <>
          Toutes les informations relatives à l'urbanisme, y compris les demandes de permis de construire, déclarations
          préalables de travaux, consultation du cadastre et du Plan Local d'Urbanisme (PLU), sont disponibles dans la
          section {createLink("Services Administratifs", "/services")}.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("social") ||
      lowerCaseMessage.includes("aide") ||
      lowerCaseMessage.includes("ccas") ||
      lowerCaseMessage.includes("précarité")
    ) {
      return (
        <>
          Le Centre Communal d'Action Sociale (CCAS) propose diverses aides et accompagnements pour les personnes en
          difficulté (aide alimentaire, logement, insertion). Vous trouverez les détails des services sociaux et les
          contacts utiles dans la section {createLink("Services Administratifs", "/services")}.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("culture") ||
      lowerCaseMessage.includes("événements") ||
      lowerCaseMessage.includes("bibliothèque") ||
      lowerCaseMessage.includes("spectacle") ||
      lowerCaseMessage.includes("exposition")
    ) {
      return (
        <>
          Découvrez notre agenda culturel et les événements à venir dans la section{" "}
          {createLink("Ou aller ?", "/ou-aller")}. Vous y trouverez aussi les horaires de la bibliothèque, des
          informations sur les associations culturelles et les expositions en cours.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("transport") ||
      lowerCaseMessage.includes("bus") ||
      lowerCaseMessage.includes("horaires") ||
      lowerCaseMessage.includes("mobilité")
    ) {
      return (
        <>
          Pour toute information sur les transports en commun, les lignes de bus, les horaires, les abonnements et les
          plans de mobilité douce (vélos, trottinettes), veuillez consulter la section{" "}
          {createLink("Ou aller ?", "/ou-aller")} ou notre outil de recherche d'itinéraires.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("éducation") ||
      lowerCaseMessage.includes("école") ||
      lowerCaseMessage.includes("inscription scolaire") ||
      lowerCaseMessage.includes("cantine") ||
      lowerCaseMessage.includes("crèche")
    ) {
      return (
        <>
          La section {createLink("Services Administratifs", "/services")} regroupe les informations sur les écoles
          maternelles et primaires, les modalités d'inscription scolaire, les services de cantine, les activités
          périscolaires et les crèches municipales.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("taxes") ||
      lowerCaseMessage.includes("impôts") ||
      lowerCaseMessage.includes("paiement") ||
      lowerCaseMessage.includes("facture")
    ) {
      return (
        <>
          Pour les informations sur les taxes locales (taxe foncière, taxe d'habitation), les impôts ou les modalités de
          paiement de vos factures municipales, veuillez vous référer à la section{" "}
          {createLink("Services Administratifs", "/services")} ou contacter le service concerné.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("carte d'identité") ||
      lowerCaseMessage.includes("passeport") ||
      lowerCaseMessage.includes("permis de conduire") ||
      lowerCaseMessage.includes("documents")
    ) {
      return (
        <>
          Pour les demandes de carte d'identité, passeport ou permis de conduire, veuillez consulter la section{" "}
          {createLink("Services Administratifs", "/services")}. Vous y trouverez la liste des pièces à fournir, les
          formulaires et la procédure à suivre pour prendre rendez-vous.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("emploi") ||
      lowerCaseMessage.includes("travail") ||
      lowerCaseMessage.includes("insertion professionnelle")
    ) {
      return (
        <>
          La section {createLink("Services Administratifs", "/services")} propose des informations sur les offres
          d'emploi locales, les dispositifs d'aide à la recherche d'emploi et les formations professionnelles
          disponibles sur le territoire.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("logement") ||
      lowerCaseMessage.includes("aide au logement") ||
      lowerCaseMessage.includes("logement social")
    ) {
      return (
        <>
          Pour toute question relative au logement, y compris les demandes de logement social, les aides au logement ou
          les informations sur les dispositifs d'accès au logement, consultez la section{" "}
          {createLink("Services Administratifs", "/services")}.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("santé") ||
      lowerCaseMessage.includes("centre de santé") ||
      lowerCaseMessage.includes("vaccination") ||
      lowerCaseMessage.includes("médecin")
    ) {
      return (
        <>
          La section {createLink("Services Administratifs", "/services")} vous informe sur les centres de santé, les
          campagnes de vaccination, les dispositifs de prévention et les coordonnées des professionnels de santé de la
          commune.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("environnement") ||
      lowerCaseMessage.includes("déchets") ||
      lowerCaseMessage.includes("recyclage") ||
      lowerCaseMessage.includes("propreté")
    ) {
      return (
        <>
          Pour les informations sur la gestion des déchets, le recyclage, les déchetteries, la propreté urbaine et les
          initiatives environnementales de la commune, consultez la section {createLink("Ou aller ?", "/ou-aller")}.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("jeunesse") ||
      lowerCaseMessage.includes("activités jeunes") ||
      lowerCaseMessage.includes("séniors") ||
      lowerCaseMessage.includes("aînés")
    ) {
      return (
        <>
          Des sections dédiées sont disponibles pour la "Jeunesse" (activités, dispositifs d'aide, information) et les
          "Séniors" (animations, services à domicile, aides spécifiques) sur la page{" "}
          {createLink("Ou aller ?", "/ou-aller")}. N'hésitez pas à les explorer !
        </>
      )
    }
    if (
      lowerCaseMessage.includes("démarches administratives") ||
      lowerCaseMessage.includes("formulaire") ||
      lowerCaseMessage.includes("certificat") ||
      lowerCaseMessage.includes("attestation") ||
      lowerCaseMessage.includes("en ligne")
    ) {
      return (
        <>
          Vous trouverez la plupart de nos formulaires et la liste des démarches administratives réalisables en ligne
          dans la section {createLink("Services Administratifs", "/services")}. C'est le moyen le plus rapide pour
          effectuer vos requêtes.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("horaires d'ouverture") ||
      lowerCaseMessage.includes("adresse") ||
      lowerCaseMessage.includes("téléphone") ||
      lowerCaseMessage.includes("contact mairie") ||
      lowerCaseMessage.includes("mairie")
    ) {
      return (
        <>
          Pour les horaires d'ouverture de la mairie, son adresse ou les numéros de téléphone des différents services,
          veuillez consulter la page {createLink("Contact", "/contact")} ou la section{" "}
          {createLink("La Mairie", "/la-mairie")}.
        </>
      )
    }
    if (lowerCaseMessage.includes("élections") || lowerCaseMessage.includes("inscription listes électorales")) {
      return (
        <>
          Toutes les informations concernant les élections et les modalités d'inscription sur les listes électorales
          sont disponibles dans la section {createLink("Services Administratifs", "/services")}.
        </>
      )
    }
    if (lowerCaseMessage.includes("associations") || lowerCaseMessage.includes("vie associative")) {
      return (
        <>
          Pour découvrir la richesse de la vie associative de notre commune, consultez la section{" "}
          {createLink("Ou aller ?", "/ou-aller")}. Vous y trouverez la liste des associations et leurs coordonnées.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("enfance") ||
      lowerCaseMessage.includes("petite enfance") ||
      lowerCaseMessage.includes("centre de loisirs")
    ) {
      return (
        <>
          Les informations sur les services dédiés à l'enfance, la petite enfance et les centres de loisirs sont
          disponibles dans la section {createLink("Services Administratifs", "/services")}.
        </>
      )
    }
    if (
      lowerCaseMessage.includes("sport") ||
      lowerCaseMessage.includes("activités sportives") ||
      lowerCaseMessage.includes("équipements sportifs")
    ) {
      return (
        <>
          Découvrez les activités et équipements sportifs de la commune dans la section{" "}
          {createLink("Ou aller ?", "/ou-aller")}. Vous y trouverez également les coordonnées des clubs sportifs.
        </>
      )
    }
    if (lowerCaseMessage.includes("police municipale") || lowerCaseMessage.includes("sécurité")) {
      return (
        <>
          Pour toute question relative à la sécurité ou pour contacter la police municipale, veuillez consulter la
          section {createLink("Contact", "/contact")}.
        </>
      )
    }
    if (lowerCaseMessage.includes("marchés") || lowerCaseMessage.includes("commerces")) {
      return (
        <>
          Les informations sur les marchés locaux et les commerces de la commune sont disponibles dans la section{" "}
          {createLink("Ou aller ?", "/ou-aller")}.
        </>
      )
    }
    if (lowerCaseMessage.includes("numéros d'urgence")) {
      return (
        <>
          En cas d'urgence, composez le 15 (SAMU), 17 (Police/Gendarmerie), 18 (Pompiers) ou 112 (numéro d'urgence
          européen). Pour les urgences municipales, consultez la page {createLink("Contact", "/contact")}.
        </>
      )
    }

    // General platform info
    if (
      lowerCaseMessage.includes("fonctionnalités") ||
      lowerCaseMessage.includes("infos plateforme") ||
      lowerCaseMessage.includes("que faites-vous") ||
      lowerCaseMessage.includes("services")
    ) {
      return (
        <>
          Notre plateforme offre une gamme complète de services : état civil, rendez-vous, réservations, signalements,
          urbanisme, action sociale, culture, transports, éducation, documents d'identité, emploi, logement, santé,
          environnement et démarches administratives générales. Comment puis-je vous orienter ? Vous pouvez explorer nos{" "}
          {createLink("Services Administratifs", "/services")} ou la section {createLink("Ou aller ?", "/ou-aller")}.
        </>
      )
    }

    // Fallback
    const fallbacks = [
      <>
        Je suis un chatbot de démonstration et mes réponses sont basées sur des mots-clés. Je peux vous donner des
        informations sur l'état civil, les rendez-vous, les réservations, les signalements, l'urbanisme, l'action
        sociale, la culture, les transports, l'éducation, les documents d'identité, l'emploi, le logement, la santé,
        l'environnement et les démarches administratives générales. Pouvez-vous reformuler votre question ou choisir un
        sujet parmi ceux-ci ?
      </>,
      <>
        Je ne suis pas sûr de comprendre votre demande. Pourriez-vous être plus précis ou poser une question sur l'un de
        nos services (ex: 'Comment obtenir un acte de naissance ?', 'Où prendre rendez-vous pour un passeport ?') ?
      </>,
      <>
        Mes connaissances sont limitées aux services de la plateforme. Si votre question concerne un autre sujet, je ne
        pourrai malheureusement pas vous aider. N'hésitez pas à consulter notre {createLink("FAQ", "/contact")} pour
        plus d'informations.
      </>,
    ]
    return fallbacks[Math.floor(Math.random() * fallbacks.length)]
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)

    if (value.length > 1) {
      const lowerCaseValue = value.toLowerCase()
      const suggestions = KEYWORDS.filter(
        (keyword) => keyword.toLowerCase().includes(lowerCaseValue) && keyword.toLowerCase() !== lowerCaseValue,
      ).slice(0, 5) // Limite à 5 suggestions
      setFilteredSuggestions(suggestions)
    } else {
      setFilteredSuggestions([])
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setInput(suggestion)
    setFilteredSuggestions([])
    // Optionnel: Envoyer le message automatiquement après sélection
    // handleSendMessage(new Event('submit') as React.FormEvent);
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setFilteredSuggestions([]) // Clear suggestions after sending
    setIsLoading(true)

    setTimeout(() => {
      const botResponseContent = simulateBotResponse(userMessage.content as string) // Cast to string for simulateBotResponse
      const botMessage: Message = { role: "assistant", content: botResponseContent }
      setMessages((prevMessages) => [...prevMessages, botMessage])
      setIsLoading(false)
    }, 700)
  }

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 animate-pulse right-4 h-10 w-10 rounded-full border-2 z-50 p-8 shadow-xl bg-white border-secondary text-secondary hover:bg-white transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le chatbot"
        >
          <MessageSquare className="h-20 w-20" />
        </Button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 z-50 right-4 w-full max-w-sm md:max-w-md lg:max-w-lg h-[calc(100vh-8rem)] max-h-[600px] flex flex-col shadow-2xl rounded-xl overflow-hidden"
          >
            <Card className="h-full flex flex-col bg-white dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <CardTitle className="text-lg font-semibold">Chatbot d'information</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le chatbot"
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-4 overflow-hidden bg-gray-50 dark:bg-gray-800">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] p-3 rounded-xl shadow-sm",
                            msg.role === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-gradient-to-br from-green-100 to-green-50 text-gray-800 dark:from-gray-700 dark:to-gray-600 dark:text-gray-200 rounded-bl-none",
                          )}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[70%] p-3 rounded-xl bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none">
                          Typing...
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 relative">
                {" "}
                {/* Added relative for autocomplete positioning */}
                {filteredSuggestions.length > 0 && (
                  <div className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                    {filteredSuggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                  <Input
                    placeholder="Tapez votre message..."
                    value={input}
                    onChange={handleInputChange} // Utilise le nouveau gestionnaire
                    disabled={isLoading}
                    aria-label="Champ de saisie du message"
                    className="flex-1 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    aria-label="Envoyer le message"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
