"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Trash2, AlertCircle, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2018, 8, 1)) // Septembre 2018

  // Données des rendez-vous
  const appointments = [
    { id: 1, date: "12/06", time: "14h00", title: "RDV citoyen personnalisé" },
    { id: 2, date: "12/06", time: "14h00", title: "RDV citoyen personnalisé" },
    { id: 3, date: "12/06", time: "14h00", title: "RDV citoyen personnalisé" },
  ]

  // Données des alertes
  const alerts = [
    {
      id: 1,
      type: "maintenance",
      title: "Maintenance portail",
      description: "6-7 juin — accès partiel",
      icon: AlertCircle,
      color: "bg-orange-100 border-orange-200 text-orange-800",
    },
    {
      id: 2,
      type: "event",
      title: "Fête citoyenne du Plateau",
      description: "10 juin à 16h, Place des Fêtes",
      icon: Calendar,
      color: "bg-blue-100 border-blue-200 text-blue-800",
    },
    {
      id: 3,
      type: "event",
      title: "Fête citoyenne du Plateau",
      description: "10 juin à 16h, Place des Fêtes",
      icon: MapPin,
      color: "bg-green-100 border-green-200 text-green-800",
    },
  ]

  // Générer les jours du calendrier
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const days = generateCalendarDays()
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]
  const dayNames = ["D", "L", "M", "M", "J", "V", "S"]

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const isCurrentMonth = (date: Date) => date.getMonth() === currentDate.getMonth()
  const isHighlighted = (date: Date) => date.getDate() === 6 && isCurrentMonth(date)
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

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

  return (
    <motion.div
      className="  p-6 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendrier */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            {/* En-tête du calendrier */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)} className="p-2">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold text-gray-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)} className="p-2">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <motion.button
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-md transition-colors
                    ${
                      !isCurrentMonth(date)
                        ? "text-gray-300"
                        : isHighlighted(date)
                          ? "bg-green-500 text-white font-bold"
                          : isToday(date)
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {date.getDate()}
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Liste des rendez-vous */}
        <motion.div variants={itemVariants}>
          <div className="space-y-3">
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border"
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-1">
                  <span className="text-gray-800 font-medium">
                    {appointment.date} - {appointment.time} : {appointment.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    modifier
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section Infos mairie & alertes citoyennes */}
      <motion.div className="mt-12" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Infos mairie & alertes citoyennes</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {alerts.map((alert, index) => (
            <motion.div key={alert.id} variants={itemVariants} custom={index} whileHover={{ y: -5 }}>
              <Card className={`border-primary rounded h-full`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <alert.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{alert.title}</h3>
                      <p className="text-sm leading-relaxed">{alert.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
