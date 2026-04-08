"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Mic, User, Bot, Bell, MoreVertical, Copy, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react"
import Sidebar from "@/components/sidebar"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

export default function AdvancedChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Bonjour ! Je suis KOUASSI, l'intelligence citoyenne du Plateau ! Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "user",
      content: "Je veux faire une demande de certificat de résidence",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "assistant",
      content: "Très bien, vous voulez faire une demande de certificat de résidence ! Pour cela, vous devez fournir les documents suivants :\n\n- Une pièce d'identité valide\n- Un justificatif de domicile récent\n- Le formulaire de demande rempli\n\nSouhaitez-vous que je vous guide dans cette démarche ?",
      timestamp: new Date(),
    },
    {
      id: "4",
      type: "user",
      content: "Oui bien, pouvez-vous me dire le prix maintenant ?",
      timestamp: new Date(),
    },
    {
      id: "5",
      type: "assistant",
      content: "Le certificat de résidence coûte 2 500 FCFA. Voici les documents nécessaires :\n\n- Une pièce d'identité valide (CNI ou passeport)\n- Un justificatif de domicile récent (facture d'eau, d'électricité ou de téléphone de moins de 3 mois)\n- Le formulaire de demande dûment rempli et signé\n\nLe délai de traitement est de 3 à 5 jours ouvrables. Souhaitez-vous télécharger le formulaire ?",
      timestamp: new Date(),
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    })
  }

  const simulateTyping = (content: string, callback: (msg: Message) => void) => {
    const typingMessage: Message = {
      id: Date.now().toString(),
      type: "assistant",
      content: "",
      timestamp: new Date(),
      isTyping: true
    }
    setMessages(prev => [...prev, typingMessage])

    let currentText = ""
    let index = 0
    
    const typeInterval = setInterval(() => {
      if (index < content.length) {
        currentText += content[index]
        setMessages(prev => 
          prev.map(msg => 
            msg.id === typingMessage.id 
              ? { ...msg, content: currentText }
              : msg
          )
        )
        index++
      } else {
        clearInterval(typeInterval)
        setMessages(prev => 
          prev.map(msg => 
            msg.id === typingMessage.id 
              ? { ...msg, isTyping: false }
              : msg
          )
        )
        callback({
          ...typingMessage,
          content: currentText,
          isTyping: false
        })
      }
    }, 30)
  }

  const getAssistantResponse = (userMessage: string) => {
    const responses = [
      "Je comprends votre demande. Permettez-moi de vous fournir les informations précises dont vous avez besoin.",
      "C'est une excellente question ! Voici ce que je peux vous dire à ce sujet...",
      "Merci pour votre patience. Je vais vous guider étape par étape dans cette démarche.",
      "Pour mieux vous aider, voici les informations détaillées concernant votre demande.",
      "Je vais vous expliquer la procédure complète pour que tout soit clair pour vous."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: newMessage.trim(),
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, userMessage])
      setNewMessage("")
      setIsLoading(true)

      // Simulate assistant response with typing effect
      setTimeout(() => {
        const responseContent = getAssistantResponse(userMessage.content)
        simulateTyping(responseContent, () => {
          setIsLoading(false)
        })
      }, 800 + Math.random() * 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
     
     <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold  text-gray-900 mb-2">Aide & Assistant</h1>
           
          </div>
         
        </div>

        {/* Chat Container */}
        <Card className="h-[calc(100vh-150px)] border flex flex-col ">
          <CardContent className="flex-1 rounded-lg flex flex-col p-0 overflow-hidden">
           
            {/* Messages Container */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-gray-50/50"
              style={{
                scrollBehavior: 'smooth'
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {message.type === "assistant" && (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-orange-200">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 max-w-2xl">
                    <div
                      className={`p-4 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md ${
                        message.type === "user" 
                          ? "bg-gradient-to-br from-primary to-primary text-white border-blue-500/20 ml-12" 
                          : "bg-white text-gray-900 border-gray-200 mr-12"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                        {message.isTyping && (
                          <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse"></span>
                        )}
                      </p>
                      
                      {/* Message Actions */}
                      {message.type === "assistant" && !message.isTyping && (
                        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2 text-xs"
                            onClick={() => copyMessage(message.content)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copier
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Timestamp */}
                    <div className={`text-xs text-gray-500 ${message.type === "user" ? "text-right mr-12" : "ml-16"}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  {message.type === "user" && (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-blue-200">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <RefreshCw className="w-5 h-5 text-white animate-spin" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mr-12">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200/50 p-6 bg-white/90 backdrop-blur-sm">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="h-12 border-gray-300 rounded-xl px-4 pr-12 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <div className="absolute right-3 top-3 text-xs text-gray-400">
                    {newMessage.length}/1000
                  </div>
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 h-12 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleVoiceInput}
                  className={`border-gray-300 hover:bg-gray-50 px-6 h-12 rounded-xl transition-all duration-200 ${
                    isListening ? 'bg-red-50 border-red-300 text-red-600' : ''
                  }`}
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
              
              {/* Quick Actions */}
              {/* <div className="flex gap-2 mt-3">
                <Button variant="ghost" size="sm" className="text-xs">
                  Formulaires
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Tarifs
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Contact
                </Button>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
