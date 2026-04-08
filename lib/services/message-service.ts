import type { Message } from "../types"

export class MessageService {
  async getAllMessages(userId: string): Promise<Message[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedMessages = localStorage.getItem(`messages-${userId}`)
        if (storedMessages) {
          resolve(JSON.parse(storedMessages))
        } else {
          const mockMessages: Message[] = [
            {
              id: "msg-1",
              userId,
              title: "Invitation à l'assemblée citoyenne du 30/06",
              content:
                "Nous avons le plaisir de vous inviter à l'assemblée citoyenne qui se tiendra le 30 juin à 18h00 à la salle des fêtes de la mairie.",
              date: new Date().toLocaleDateString("fr-FR"),
              read: false,
            },
            {
              id: "msg-2",
              userId,
              title: "Notification: Renouvellement de carte",
              content:
                "Votre carte d'accès aux services municipaux arrive à expiration. Veuillez passer en mairie pour la renouveler.",
              date: new Date(Date.now() - 86400000).toLocaleDateString("fr-FR"),
              read: true,
            },
            {
              id: "msg-3",
              userId,
              title: "Information: Travaux de voirie",
              content:
                "Des travaux de voirie seront effectués dans votre quartier du 15 au 20 juin. La circulation pourra être perturbée.",
              date: new Date(Date.now() - 172800000).toLocaleDateString("fr-FR"),
              read: true,
            },
          ]
          localStorage.setItem(`messages-${userId}`, JSON.stringify(mockMessages))
          resolve(mockMessages)
        }
      }, 500)
    })
  }

  async getMessageById(userId: string, messageId: string): Promise<Message | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedMessages = localStorage.getItem(`messages-${userId}`)
        if (storedMessages) {
          const messages: Message[] = JSON.parse(storedMessages)
          const message = messages.find((m) => m.id === messageId) || null
          resolve(message)
        } else {
          resolve(null)
        }
      }, 500)
    })
  }

  async markAsRead(userId: string, messageId: string): Promise<Message | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedMessages = localStorage.getItem(`messages-${userId}`)
        if (storedMessages) {
          const messages: Message[] = JSON.parse(storedMessages)
          const index = messages.findIndex((m) => m.id === messageId)

          if (index !== -1) {
            messages[index].read = true
            localStorage.setItem(`messages-${userId}`, JSON.stringify(messages))
            resolve(messages[index])
          } else {
            resolve(null)
          }
        } else {
          resolve(null)
        }
      }, 500)
    })
  }

  async sendMessage(message: Omit<Message, "id" | "date" | "read">): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedMessages = localStorage.getItem(`messages-${message.userId}`)
        const messages: Message[] = storedMessages ? JSON.parse(storedMessages) : []

        const newMessage: Message = {
          ...message,
          id: `msg-${Date.now()}`,
          date: new Date().toLocaleDateString("fr-FR"),
          read: false,
        }

        messages.push(newMessage)
        localStorage.setItem(`messages-${message.userId}`, JSON.stringify(messages))
        resolve(newMessage)
      }, 500)
    })
  }

  async getUnreadCount(userId: string): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedMessages = localStorage.getItem(`messages-${userId}`)
        if (storedMessages) {
          const messages: Message[] = JSON.parse(storedMessages)
          const unreadCount = messages.filter((m) => !m.read).length
          resolve(unreadCount)
        } else {
          resolve(0)
        }
      }, 500)
    })
  }
}
