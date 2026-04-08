import type { Notification } from "../types"

export class NotificationService {
  async getAllNotifications(userId: string): Promise<Notification[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedNotifications = localStorage.getItem(`notifications-${userId}`)
        if (storedNotifications) {
          resolve(JSON.parse(storedNotifications))
        } else {
          const mockNotifications: Notification[] = [
            {
              id: "notif-1",
              userId,
              title: "Demande traitée",
              content: "Votre demande de certificat de résidence a été traitée avec succès.",
              date: new Date().toLocaleDateString("fr-FR"),
              read: false,
              type: "success",
            },
            {
              id: "notif-2",
              userId,
              title: "Rappel rendez-vous",
              content: "Vous avez un rendez-vous à la mairie demain à 10h00.",
              date: new Date(Date.now() - 86400000).toLocaleDateString("fr-FR"),
              read: true,
              type: "info",
            },
            {
              id: "notif-3",
              userId,
              title: "Document manquant",
              content: "Votre demande de permis de construire nécessite un document supplémentaire.",
              date: new Date(Date.now() - 172800000).toLocaleDateString("fr-FR"),
              read: false,
              type: "warning",
            },
          ]
          localStorage.setItem(`notifications-${userId}`, JSON.stringify(mockNotifications))
          resolve(mockNotifications)
        }
      }, 500)
    })
  }

  async markAsRead(userId: string, notificationId: string): Promise<Notification | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedNotifications = localStorage.getItem(`notifications-${userId}`)
        if (storedNotifications) {
          const notifications: Notification[] = JSON.parse(storedNotifications)
          const index = notifications.findIndex((n) => n.id === notificationId)

          if (index !== -1) {
            notifications[index].read = true
            localStorage.setItem(`notifications-${userId}`, JSON.stringify(notifications))
            resolve(notifications[index])
          } else {
            resolve(null)
          }
        } else {
          resolve(null)
        }
      }, 500)
    })
  }

  async createNotification(notification: Omit<Notification, "id" | "date">): Promise<Notification> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedNotifications = localStorage.getItem(`notifications-${notification.userId}`)
        const notifications: Notification[] = storedNotifications ? JSON.parse(storedNotifications) : []

        const newNotification: Notification = {
          ...notification,
          id: `notif-${Date.now()}`,
          date: new Date().toLocaleDateString("fr-FR"),
        }

        notifications.push(newNotification)
        localStorage.setItem(`notifications-${notification.userId}`, JSON.stringify(notifications))
        resolve(newNotification)
      }, 500)
    })
  }

  async getUnreadCount(userId: string): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedNotifications = localStorage.getItem(`notifications-${userId}`)
        if (storedNotifications) {
          const notifications: Notification[] = JSON.parse(storedNotifications)
          const unreadCount = notifications.filter((n) => !n.read).length
          resolve(unreadCount)
        } else {
          resolve(0)
        }
      }, 500)
    })
  }
}
