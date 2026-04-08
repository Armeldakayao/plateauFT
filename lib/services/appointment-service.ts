import type { Appointment } from "../types"

export class AppointmentService {
  async getAllAppointments(userId: string): Promise<Appointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedAppointments = localStorage.getItem(`appointments-${userId}`)
        if (storedAppointments) {
          resolve(JSON.parse(storedAppointments))
        } else {
          const mockAppointments: Appointment[] = [
            {
              id: "apt-1",
              userId,
              title: "Rendez-vous mairie",
              description: "Dépôt de dossier pour demande de passeport",
              date: "28/05/2024",
              time: "10:00",
              location: "Mairie du Plateau - Bureau 3",
              status: "scheduled",
            },
            {
              id: "apt-2",
              userId,
              title: "Dépôt de dossier",
              description: "Dépôt de dossier pour permis de construire",
              date: "05/06/2024",
              time: "14:30",
              location: "Service Urbanisme - Bureau 12",
              status: "scheduled",
            },
          ]
          localStorage.setItem(`appointments-${userId}`, JSON.stringify(mockAppointments))
          resolve(mockAppointments)
        }
      }, 500)
    })
  }

  async getAppointmentById(userId: string, appointmentId: string): Promise<Appointment | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedAppointments = localStorage.getItem(`appointments-${userId}`)
        if (storedAppointments) {
          const appointments: Appointment[] = JSON.parse(storedAppointments)
          const appointment = appointments.find((a) => a.id === appointmentId) || null
          resolve(appointment)
        } else {
          resolve(null)
        }
      }, 500)
    })
  }

  async createAppointment(appointment: Omit<Appointment, "id">): Promise<Appointment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedAppointments = localStorage.getItem(`appointments-${appointment.userId}`)
        const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : []

        const newAppointment: Appointment = {
          ...appointment,
          id: `apt-${Date.now()}`,
        }

        appointments.push(newAppointment)
        localStorage.setItem(`appointments-${appointment.userId}`, JSON.stringify(appointments))
        resolve(newAppointment)
      }, 500)
    })
  }

  async updateAppointmentStatus(
    userId: string,
    appointmentId: string,
    status: Appointment["status"],
  ): Promise<Appointment | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedAppointments = localStorage.getItem(`appointments-${userId}`)
        if (storedAppointments) {
          const appointments: Appointment[] = JSON.parse(storedAppointments)
          const index = appointments.findIndex((a) => a.id === appointmentId)

          if (index !== -1) {
            appointments[index].status = status
            localStorage.setItem(`appointments-${userId}`, JSON.stringify(appointments))
            resolve(appointments[index])
          } else {
            resolve(null)
          }
        } else {
          resolve(null)
        }
      }, 500)
    })
  }

  async getUpcomingAppointments(userId: string): Promise<Appointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedAppointments = localStorage.getItem(`appointments-${userId}`)
        if (storedAppointments) {
          const appointments: Appointment[] = JSON.parse(storedAppointments)
          const today = new Date()
          const upcomingAppointments = appointments.filter((a) => {
            const [day, month, year] = a.date.split("/").map(Number)
            const appointmentDate = new Date(year, month - 1, day)
            return appointmentDate >= today && a.status === "scheduled"
          })
          resolve(upcomingAppointments)
        } else {
          resolve([])
        }
      }, 500)
    })
  }
}
