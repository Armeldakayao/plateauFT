import type { Service } from "../types"

export class ServiceService {
  async getAllServices(): Promise<Service[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockServices: Service[] = [
          {
            id: "service-1",
            title: "Acte de naissance",
            description: "Demander une copie d'acte de naissance",
            category: "etat-civil",
            duree: "48 heures",
            conditions: [
              "Être né(e) dans la commune du Plateau",
              "Être majeur ou représentant légal",
              "Document disponible sous 3 jours ouvrés",
            ],
            documents: [
              "Copie d'une pièce d'identité",
              "Justificatif de domicile",
              "Livret de famille (si applicable)",
              "Adresse (mail ou numéro de téléphone) valide",
            ],
          },
          {
            id: "service-2",
            title: "Certificat de résidence",
            description: "Obtenir un certificat de résidence",
            category: "etat-civil",
            duree: "24 heures",
            conditions: ["Résider dans la commune du Plateau", "Être majeur", "Document disponible sous 1 jour ouvré"],
            documents: [
              "Copie d'une pièce d'identité",
              "Justificatif de domicile de moins de 3 mois",
              "Adresse (mail ou numéro de téléphone) valide",
            ],
          },
          {
            id: "service-3",
            title: "Permis de construire",
            description: "Déposer une demande de permis de construire",
            category: "urbanisme",
            duree: "2 mois",
            conditions: ["Être propriétaire du terrain", "Projet conforme au PLU", "Délai d'instruction de 2 mois"],
            documents: [
              "Formulaire CERFA",
              "Plan de situation",
              "Plan de masse",
              "Plan de coupe",
              "Notice descriptive",
            ],
          },
          {
            id: "service-4",
            title: "Déclaration préalable",
            description: "Déposer une déclaration préalable de travaux",
            category: "urbanisme",
            duree: "1 mois",
            conditions: ["Être propriétaire du bien", "Travaux de faible ampleur", "Délai d'instruction de 1 mois"],
            documents: ["Formulaire CERFA", "Plan de situation", "Plan de masse", "Photos avant travaux"],
          },
          {
            id: "service-5",
            title: "Inscription scolaire",
            description: "Inscrire votre enfant à l'école",
            category: "education",
            duree: "1 semaine",
            conditions: [
              "Résider dans la commune du Plateau",
              "Enfant âgé de 3 à 11 ans",
              "Inscription possible toute l'année",
            ],
            documents: [
              "Livret de famille",
              "Justificatif de domicile",
              "Carnet de santé (vaccinations)",
              "Certificat de radiation (si changement d'école)",
            ],
          },
          {
            id: "service-6",
            title: "Cantine scolaire",
            description: "Gérer les inscriptions à la cantine",
            category: "education",
            duree: "48 heures",
            conditions: [
              "Enfant inscrit dans une école de la commune",
              "Inscription possible jusqu'à 48h avant le jour souhaité",
            ],
            documents: [
              "Numéro d'inscription scolaire",
              "Attestation d'assurance",
              "Informations sur les allergies (si applicable)",
            ],
          },
          {
            id: "service-7",
            title: "Collecte des déchets",
            description: "Informations sur la collecte des déchets",
            category: "environnement",
            duree: "Immédiat",
            conditions: ["Résider dans la commune du Plateau"],
            documents: ["Aucun document requis"],
          },
          {
            id: "service-8",
            title: "Signalement",
            description: "Signaler un problème dans l'espace public",
            category: "environnement",
            duree: "1 semaine",
            conditions: ["Problème situé sur le territoire de la commune"],
            documents: ["Photos du problème (recommandé)", "Localisation précise"],
          },
        ]

        resolve(mockServices)
      }, 500)
    })
  }

  async getServiceById(serviceId: string): Promise<Service | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockServices = this.getAllServices()
        mockServices.then((services) => {
          const service = services.find((s) => s.id === serviceId) || null
          resolve(service)
        })
      }, 500)
    })
  }

  async getServicesByCategory(category: Service["category"]): Promise<Service[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockServices = this.getAllServices()
        mockServices.then((services) => {
          const filteredServices = services.filter((s) => s.category === category)
          resolve(filteredServices)
        })
      }, 500)
    })
  }
}
