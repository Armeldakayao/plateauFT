import type { Demande } from "../types"

export class DemandeService {
  async getAllDemandes(userId: string): Promise<Demande[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedDemandes = localStorage.getItem(`demandes-${userId}`)
        if (storedDemandes) {
          resolve(JSON.parse(storedDemandes))
        } else {
          const mockDemandes: Demande[] = [
            {
              id: "dem-001",
              userId,
              type: "Certificat de résidence",
              reference: "CR-2024-001",
              status: "Traitée",
              date: "20/05/2024",
              action: "Télécharger",
            },
            {
              id: "dem-002",
              userId,
              type: "Acte de naissance",
              reference: "AN-2024-002",
              status: "En cours",
              date: "15/05/2024",
            },
            {
              id: "dem-003",
              userId,
              type: "Permis de construire",
              reference: "PC-2024-003",
              status: "En cours",
              date: "10/05/2024",
            },
            {
              id: "dem-004",
              userId,
              type: "Inscription scolaire",
              reference: "IS-2024-004",
              status: "Rejetée",
              date: "05/05/2024",
            },
          ]
          localStorage.setItem(`demandes-${userId}`, JSON.stringify(mockDemandes))
          resolve(mockDemandes)
        }
      }, 500)
    })
  }

  async getDemandeById(userId: string, demandeId: string): Promise<Demande | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedDemandes = localStorage.getItem(`demandes-${userId}`)
        if (storedDemandes) {
          const demandes: Demande[] = JSON.parse(storedDemandes)
          const demande = demandes.find((d) => d.id === demandeId) || null
          resolve(demande)
        } else {
          resolve(null)
        }
      }, 500)
    })
  }

  async createDemande(
    userId: string,
    demande: Omit<Demande, "id" | "userId" | "reference" | "date" | "status">,
  ): Promise<Demande> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedDemandes = localStorage.getItem(`demandes-${userId}`)
        const demandes: Demande[] = storedDemandes ? JSON.parse(storedDemandes) : []

        const newDemande: Demande = {
          ...demande,
          id: `dem-${Date.now()}`,
          userId,
          reference: `${demande.type.substring(0, 2).toUpperCase()}-${new Date().getFullYear()}-${demandes.length + 1}`,
          date: new Date().toLocaleDateString("fr-FR"),
          status: "En cours",
        }

        demandes.push(newDemande)
        localStorage.setItem(`demandes-${userId}`, JSON.stringify(demandes))
        resolve(newDemande)
      }, 1000)
    })
  }

  async updateDemandeStatus(userId: string, demandeId: string, status: Demande["status"]): Promise<Demande | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedDemandes = localStorage.getItem(`demandes-${userId}`)
        if (storedDemandes) {
          const demandes: Demande[] = JSON.parse(storedDemandes)
          const index = demandes.findIndex((d) => d.id === demandeId)

          if (index !== -1) {
            demandes[index].status = status
            localStorage.setItem(`demandes-${userId}`, JSON.stringify(demandes))
            resolve(demandes[index])
          } else {
            resolve(null)
          }
        } else {
          resolve(null)
        }
      }, 500)
    })
  }
}
