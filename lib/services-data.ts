export interface Service {
  id: string
  title: string
  description: string
  duree: string
  conditions: string[]
  documents: string[]
  category: string
}

export interface ServiceCategory {
  id: string
  title: string
  services: Service[]
}

export const servicesData: ServiceCategory[] = [
  {
    id: "etat-civil",
    title: "État civil",
    services: [
       {
        id: "demander-rendez-vous",
        title: "Demander un rendez-vous",
        description: "Prendre rendez-vous avec les services municipaux pour vos démarches administratives spécifiques.",
        duree: "Selon disponibilité",
        conditions: ["Motif de rendez-vous précisé", "Disponibilité des services", "Respect des créneaux proposés"],
        documents: ["Pièce d'identité", "Documents relatifs à la demande", "Justificatifs selon le motif"],
        category: "services-generaux",
      },
      {
        id: "acte-naissance",
        title: "Acte de naissance",
        description:
          "Demander une copie d'acte de naissance délivré par votre ville de naissance. Ce document est nécessaire pour diverses formalités administratives.",
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
        category: "etat-civil",
      },
      {
        id: "acte-mariage",
        title: "Acte de mariage",
        description:
          "Obtenir une copie d'acte de mariage pour vos démarches administratives, succession ou autres formalités légales.",
        duree: "24 heures",
        conditions: [
          "Mariage célébré dans la commune du Plateau",
          "Être l'un des époux ou représentant légal",
          "Justifier de l'identité du demandeur",
        ],
        documents: [
          "Pièce d'identité valide",
          "Justificatif de domicile récent",
          "Livret de famille",
          "Procuration si demande par tiers",
        ],
        category: "etat-civil",
      },
      {
        id: "acte-deces",
        title: "Acte de décès",
        description:
          "Demander une copie d'acte de décès pour les démarches de succession, assurance ou autres formalités post-mortem.",
        duree: "24 heures",
        conditions: [
          "Décès survenu dans la commune du Plateau",
          "Être membre de la famille ou ayant droit",
          "Justifier du lien de parenté",
        ],
        documents: [
          "Pièce d'identité du demandeur",
          "Justificatif de lien de parenté",
          "Acte de naissance du défunt si disponible",
        ],
        category: "etat-civil",
      },
      {
        id: "certificat-residence",
        title: "Certificat de résidence",
        description:
          "Obtenir un certificat attestant de votre résidence dans la commune du Plateau pour vos démarches administratives.",
        duree: "72 heures",
        conditions: [
          "Résider effectivement dans la commune",
          "Être inscrit sur les listes électorales",
          "Justifier de 6 mois de résidence minimum",
        ],
        documents: [
          "Pièce d'identité valide",
          "Justificatifs de domicile (3 derniers mois)",
          "Attestation d'hébergement si nécessaire",
          "Factures d'électricité ou d'eau",
        ],
        category: "etat-civil",
      },
      {
        id: "celebrer-mariage",
        title: "Célébrer mon mariage",
        description: "Organiser et planifier votre cérémonie de mariage civil dans les locaux de la mairie du Plateau.",
        duree: "2 semaines",
        conditions: [
          "Résidence de l'un des futurs époux dans la commune",
          "Dossier de mariage complet",
          "Publication des bans effectuée",
        ],
        documents: [
          "Actes de naissance des futurs époux",
          "Pièces d'identité valides",
          "Justificatifs de domicile",
          "Certificat médical prénuptial",
          "Contrat de mariage si applicable",
        ],
        category: "etat-civil",
      },
      {
        id: "demander-partenariat",
        title: "Demander un partenariat",
        description:
          "Enregistrer un PACS (Pacte Civil de Solidarité) auprès des services de l'état civil de la mairie.",
        duree: "1 semaine",
        conditions: [
          "Résidence de l'un des partenaires dans la commune",
          "Majorité des deux partenaires",
          "Absence de lien de parenté prohibé",
        ],
        documents: [
          "Actes de naissance récents",
          "Pièces d'identité valides",
          "Justificatifs de domicile",
          "Convention de PACS signée",
          "Attestation sur l'honneur de célibat",
        ],
        category: "etat-civil",
      },
    ],
  },
  {
    id: "documents-administratifs",
    title: "Documents administratifs",
    services: [
      {
        id: "carte-identite",
        title: "Carte d'identité",
        description:
          "Demander ou renouveler votre carte nationale d'identité française auprès des services municipaux.",
        duree: "3 semaines",
        conditions: ["Être de nationalité française", "Résider dans la commune", "Fournir les justificatifs requis"],
        documents: [
          "Ancienne carte d'identité",
          "Acte de naissance",
          "Justificatif de domicile",
          "Photo d'identité récente",
          "Timbre fiscal",
        ],
        category: "documents-administratifs",
      },
      {
        id: "passeport",
        title: "Passeport",
        description: "Faire une demande de passeport biométrique français pour vos voyages à l'étranger.",
        duree: "4 semaines",
        conditions: [
          "Être de nationalité française",
          "Présence obligatoire du demandeur",
          "Rendez-vous préalable requis",
        ],
        documents: [
          "Ancien passeport si renouvellement",
          "Carte d'identité valide",
          "Acte de naissance",
          "Justificatif de domicile",
          "Photo d'identité récente",
          "Timbre fiscal",
        ],
        category: "documents-administratifs",
      },
      {
        id: "attestation-domicile",
        title: "Attestation de domicile",
        description: "Obtenir une attestation officielle de votre domicile pour vos démarches administratives.",
        duree: "48 heures",
        conditions: [
          "Résider effectivement à l'adresse déclarée",
          "Être inscrit sur les listes électorales",
          "Justifier de la résidence",
        ],
        documents: [
          "Pièce d'identité valide",
          "Justificatifs de domicile récents",
          "Quittances de loyer ou titre de propriété",
        ],
        category: "documents-administratifs",
      },
      {
        id: "legalisation-signature",
        title: "Légalisation de signature",
        description: "Faire légaliser votre signature sur des documents officiels par les services municipaux.",
        duree: "Immédiat",
        conditions: ["Présence obligatoire du signataire", "Document à légaliser non signé", "Pièce d'identité valide"],
        documents: [
          "Pièce d'identité valide",
          "Document à légaliser (non signé)",
          "Justificatif de domicile si requis",
        ],
        category: "documents-administratifs",
      },
    ],
  },
  {
    id: "urbanisme-logement",
    title: "Urbanisme & Logement",
    services: [
      {
        id: "permis-construire",
        title: "Permis de construire",
        description: "Déposer une demande de permis de construire pour vos projets de construction ou d'extension.",
        duree: "2 mois",
        conditions: ["Propriétaire du terrain", "Projet conforme au PLU", "Dossier complet requis"],
        documents: [
          "Formulaire Cerfa complété",
          "Plans de situation et de masse",
          "Plans des façades et toitures",
          "Notice descriptive",
          "Photos du terrain",
        ],
        category: "urbanisme-logement",
      },
      {
        id: "declaration-travaux",
        title: "Déclaration de travaux",
        description: "Déclarer vos travaux de rénovation ou d'aménagement ne nécessitant pas de permis de construire.",
        duree: "1 mois",
        conditions: [
          "Travaux de moins de 20m²",
          "Modification de l'aspect extérieur",
          "Respect des règles d'urbanisme",
        ],
        documents: [
          "Formulaire Cerfa de déclaration",
          "Plan de situation",
          "Plan des façades modifiées",
          "Photos avant travaux",
        ],
        category: "urbanisme-logement",
      },
      {
        id: "certificat-urbanisme",
        title: "Certificat d'urbanisme",
        description: "Obtenir des informations sur les règles d'urbanisme applicables à un terrain spécifique.",
        duree: "2 semaines",
        conditions: ["Propriétaire ou mandataire", "Terrain situé dans la commune", "Demande motivée"],
        documents: [
          "Formulaire de demande",
          "Plan de situation du terrain",
          "Titre de propriété",
          "Procuration si mandataire",
        ],
        category: "urbanisme-logement",
      },
    ],
  },
  {
    id: "environnement-proprete",
    title: "Environnement & Propreté",
    services: [
      {
        id: "collecte-dechets",
        title: "Collecte des déchets",
        description: "Demander des informations ou signaler un problème concernant la collecte des déchets ménagers.",
        duree: "48 heures",
        conditions: [
          "Résider dans la zone de collecte",
          "Respecter les horaires de sortie",
          "Utiliser les contenants appropriés",
        ],
        documents: ["Justificatif de domicile", "Descriptif du problème", "Photos si nécessaire"],
        category: "environnement-proprete",
      },
      {
        id: "composteur",
        title: "Demande de composteur",
        description: "Obtenir un composteur individuel pour réduire vos déchets organiques et jardiner écologique.",
        duree: "1 semaine",
        conditions: [
          "Résider dans la commune",
          "Disposer d'un jardin ou balcon",
          "S'engager à l'utiliser correctement",
        ],
        documents: ["Justificatif de domicile", "Formulaire d'engagement", "Plan de situation du logement"],
        category: "environnement-proprete",
      },
    ],
  },
  {
    id: "education-jeunesse",
    title: "Éducation & Jeunesse",
    services: [
      {
        id: "inscription-ecole",
        title: "Inscription scolaire",
        description: "Inscrire votre enfant dans une école primaire publique de la commune du Plateau.",
        duree: "1 semaine",
        conditions: ["Enfant en âge scolaire", "Résidence dans la commune", "Vaccinations à jour"],
        documents: [
          "Acte de naissance de l'enfant",
          "Justificatif de domicile",
          "Carnet de vaccinations",
          "Certificat de radiation si changement d'école",
        ],
        category: "education-jeunesse",
      },
      {
        id: "cantine-scolaire",
        title: "Cantine scolaire",
        description: "Inscrire votre enfant à la restauration scolaire et gérer les menus et paiements.",
        duree: "72 heures",
        conditions: ["Enfant scolarisé dans la commune", "Dossier d'inscription complet", "Paiement des frais"],
        documents: [
          "Certificat de scolarité",
          "Justificatif de revenus",
          "Fiche sanitaire de liaison",
          "Attestation d'assurance",
        ],
        category: "education-jeunesse",
      },
      {
        id: "centre-loisirs",
        title: "Centre de loisirs",
        description: "Inscrire votre enfant aux activités du centre de loisirs pendant les vacances scolaires.",
        duree: "1 semaine",
        conditions: ["Enfant âgé de 3 à 17 ans", "Résidence dans la commune", "Inscription préalable obligatoire"],
        documents: [
          "Fiche d'inscription complétée",
          "Certificat médical",
          "Attestation d'assurance",
          "Justificatif de quotient familial",
        ],
        category: "education-jeunesse",
      },
    ],
  },
  {
    id: "services-generaux",
    title: "Services généraux",
    services: [
     
      // {
      //   id: "visiter-commune",
      //   title: "Visiter ma commune",
      //   description:
      //     "Organiser une visite guidée de la commune du Plateau pour découvrir son patrimoine et ses services.",
      //   duree: "Sur réservation",
      //   conditions: [
      //     "Réservation préalable obligatoire",
      //     "Groupe de minimum 5 personnes",
      //     "Respect des horaires de visite",
      //   ],
      //   documents: ["Formulaire de réservation", "Liste des participants", "Contact du responsable de groupe"],
      //   category: "services-generaux",
      // },
      {
        id: "occupation-domaine-public",
        title: "Occupation du domaine public",
        description:
          "Demander une autorisation d'occupation temporaire du domaine public pour un événement ou travaux.",
        duree: "2 semaines",
        conditions: ["Motif légitime d'occupation", "Respect de la réglementation", "Assurance responsabilité civile"],
        documents: [
          "Formulaire de demande",
          "Plan d'occupation",
          "Attestation d'assurance",
          "Descriptif de l'événement/travaux",
        ],
        category: "services-generaux",
      },
    ],
  },
]

export const getServiceById = (id: string): Service | undefined => {
  for (const category of servicesData) {
    const service = category.services.find((s) => s.id === id)
    if (service) return service
  }
  return undefined
}

export const getAllServices = (): Service[] => {
  return servicesData.flatMap((category) => category.services)
}
