export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  category: string
  date: string
  author: string
  imageSrc: string
  featured?: boolean
  tags: string[]
}

export const newsData: NewsArticle[] = [
  {
    id: "reouverture-maison-citoyen",
    title: "Réouverture de la Maison du Citoyen",
    description:
      "La Mairie du Plateau annonce la réouverture officielle de la Maison du Citoyen à partir du lundi 17 juin 2025.",
    content: `La Mairie du Plateau annonce la réouverture officielle de la Maison du Citoyen à partir du lundi 17 juin 2025. Les travaux de réaménagement ont permis d'intégrer un guichet unique numérique, des bornes interactives et un espace d'accueil modernisé.

    ## Nouveautés et améliorations

    Les citoyens pourront désormais bénéficier de :
    - Un guichet unique numérique pour toutes les démarches administratives
    - Des bornes interactives pour les demandes courantes
    - Un espace d'accueil modernisé et plus spacieux
    - Un système de prise de rendez-vous en ligne
    - Des conseillers numériques pour accompagner les usagers

    ## Horaires d'ouverture

    Les horaires restent inchangés : du lundi au vendredi, de 08h à 17h, avec une pause déjeuner de 12h à 13h30.

    ## Services disponibles

    Tous les services municipaux seront accessibles dans ce nouvel espace, notamment :
    - État civil
    - Urbanisme
    - Action sociale
    - Services techniques
    - Élections

    Cette rénovation s'inscrit dans la démarche de modernisation des services publics de la commune, visant à améliorer l'accueil et simplifier les démarches des citoyens.`,
    category: "Communiqué officiel",
    date: "04 Juin 2025",
    author: "Service Communication",
    imageSrc: "/images/mairie.svg",
    featured: true,
    tags: ["maison du citoyen", "rénovation", "services publics", "numérique"],
  },
  {
    id: "projet-renovation-urbaine",
    title: "Projet de rénovation urbaine",
    description:
      "La Mairie du Plateau a lancé un ambitieux projet de rénovation urbaine visant à moderniser les infrastructures et améliorer le cadre de vie des habitants.",
    content: `La Mairie du Plateau a officiellement lancé son projet de rénovation urbaine, un programme ambitieux qui transformera le visage de notre commune au cours des trois prochaines années.

    ## Objectifs du projet

    Ce projet vise à :
    - Moderniser les infrastructures vieillissantes
    - Améliorer la qualité de vie des habitants
    - Développer les espaces verts et de loisirs
    - Renforcer l'attractivité économique du territoire

    ## Zones concernées

    Les travaux concerneront principalement :
    - Le centre-ville historique
    - Les quartiers résidentiels périphériques
    - Les axes de circulation principaux
    - Les espaces publics et parcs

    ## Planning des travaux

    - **Phase 1 (2025)** : Rénovation du centre-ville
    - **Phase 2 (2026)** : Aménagement des quartiers résidentiels
    - **Phase 3 (2027)** : Finalisation et espaces verts

    ## Budget et financement

    Le projet représente un investissement de 15 millions d'euros, financé par :
    - Fonds propres de la commune (40%)
    - Subventions régionales (35%)
    - Fonds européens (25%)

    Les habitants seront régulièrement informés de l'avancement des travaux via notre site internet et les réunions publiques trimestrielles.`,
    category: "Communiqué officiel",
    date: "01 Juin 2025",
    author: "Direction de l'Urbanisme",
    imageSrc: "/images/service2.svg",
    tags: ["rénovation urbaine", "infrastructure", "développement", "investissement"],
  },
  {
    id: "ateliers-participation-citoyenne",
    title: "Ateliers de participation citoyenne",
    description:
      "Des ateliers participatifs sont organisés pour recueillir les avis des citoyens sur les projets de développement local.",
    content: `La Mairie du Plateau organise une série d'ateliers de participation citoyenne pour associer les habitants aux décisions importantes concernant l'avenir de notre commune.

    ## Objectifs des ateliers

    Ces rencontres visent à :
    - Recueillir les avis et suggestions des citoyens
    - Présenter les projets en cours et à venir
    - Favoriser le dialogue entre élus et habitants
    - Co-construire les politiques publiques locales

    ## Thématiques abordées

    Les ateliers traiteront de :
    - Aménagement urbain et mobilité
    - Environnement et développement durable
    - Services publics et équipements
    - Vie associative et culturelle
    - Sécurité et tranquillité publique

    ## Calendrier des ateliers

    - **15 juin 2025** : Aménagement urbain (19h - Salle des fêtes)
    - **22 juin 2025** : Environnement (19h - Centre culturel)
    - **29 juin 2025** : Services publics (19h - Mairie)
    - **06 juillet 2025** : Culture et sport (19h - Gymnase municipal)

    ## Comment participer

    L'inscription est gratuite mais obligatoire :
    - En ligne sur notre site internet
    - Par téléphone au 01 23 45 67 89
    - À l'accueil de la mairie

    Chaque atelier accueillera maximum 50 participants pour favoriser les échanges. Un compte-rendu sera publié après chaque séance.`,
    category: "Vie citoyenne",
    date: "28 Mai 2025",
    author: "Service Démocratie Participative",
    imageSrc: "/images/mairie.svg",
    tags: ["participation citoyenne", "démocratie", "concertation", "ateliers"],
  },
  {
    id: "avancement-chantiers-routiers",
    title: "Avancement des chantiers routiers",
    description:
      "Les travaux de réhabilitation des principales artères du Plateau progressent selon le calendrier prévu.",
    content: `Les travaux de réhabilitation des principales artères de la commune du Plateau avancent conformément au planning établi. Voici un point d'étape sur l'avancement des différents chantiers.

    ## État d'avancement par secteur

    ### Avenue de la République
    - **Avancement** : 75% terminé
    - **Travaux réalisés** : Réfection de la chaussée, nouveaux trottoirs
    - **Prochaines étapes** : Signalisation et marquage au sol
    - **Fin prévue** : 15 juillet 2025

    ### Rue du Commerce
    - **Avancement** : 50% terminé
    - **Travaux en cours** : Réseaux souterrains, éclairage public
    - **Prochaines étapes** : Revêtement de chaussée
    - **Fin prévue** : 30 août 2025

    ### Boulevard des Écoles
    - **Avancement** : 25% terminé
    - **Travaux en cours** : Préparation du terrain, évacuation
    - **Prochaines étapes** : Pose des réseaux
    - **Fin prévue** : 15 octobre 2025

    ## Mesures d'accompagnement

    Pour limiter les désagréments :
    - Déviations clairement signalées
    - Accès maintenu aux commerces
    - Information régulière des riverains
    - Travaux de nuit pour les zones sensibles

    ## Impact sur la circulation

    Des itinéraires de contournement ont été mis en place :
    - Déviation par la rue des Platanes
    - Circulation alternée rue Victor Hugo
    - Stationnement temporaire place de la Mairie

    ## Contact et informations

    Pour toute question : chantiers@mairie-plateau.fr ou 01 23 45 67 89

    Nous remercions les habitants pour leur patience et leur compréhension.`,
    category: "Travaux publics",
    date: "25 Mai 2025",
    author: "Service Voirie",
    imageSrc: "/images/service2.svg",
    tags: ["travaux", "voirie", "circulation", "infrastructure"],
  },
  {
    id: "fete-musique-2025",
    title: "Fête de la Musique 2025",
    description:
      "La Fête de la Musique revient au Plateau avec une programmation riche et variée, promettant une journée pleine de mélodies et de festivités.",
    content: `La Fête de la Musique 2025 approche à grands pas ! Cette année encore, la commune du Plateau vous propose une programmation exceptionnelle pour célébrer la musique sous toutes ses formes.

    ## Programme de la journée

    ### 14h00 - 18h00 : Scène Jeunes Talents
    **Lieu** : Parvis de la Mairie
    - Groupes locaux de rock et pop
    - Chanteurs en herbe
    - Orchestres des écoles de musique

    ### 18h30 - 20h30 : Scène Variétés
    **Lieu** : Place du Marché
    - Reprises de grands classiques
    - Musique française et internationale
    - Spectacle de danse

    ### 21h00 - 23h30 : Scène Principale
    **Lieu** : Parc Municipal
    - Concert de jazz avec l'orchestre départemental
    - Spectacle de musique du monde
    - DJ set pour clôturer la soirée

    ## Animations parallèles

    - **Ateliers découverte** : Initiation aux instruments (15h-17h)
    - **Exposition** : Histoire de la musique au Plateau
    - **Stands associatifs** : Écoles de musique et chorales locales
    - **Restauration** : Food trucks et buvette associative

    ## Informations pratiques

    - **Date** : Samedi 21 juin 2025
    - **Horaires** : 14h00 à 23h30
    - **Entrée** : Gratuite pour tous les événements
    - **Parking** : Gratuit au stade municipal
    - **Navettes** : Service gratuit toutes les 20 minutes

    ## Mesures spéciales

    - Fermeture du centre-ville à la circulation de 13h à minuit
    - Renforcement du service de sécurité
    - Dispositif médical sur site
    - Collecte sélective renforcée

    Venez nombreux célébrer la musique dans une ambiance conviviale et familiale !`,
    category: "Événementiel",
    date: "21 Mai 2025",
    author: "Service Culturel",
    imageSrc: "/images/mairie.svg",
    tags: ["fête de la musique", "concert", "culture", "événement"],
  },
  // Ajout de plus d'articles pour la pagination
  {
    id: "nouveau-parc-enfants",
    title: "Ouverture du nouveau parc pour enfants",
    description: "Un nouvel espace de jeux sécurisé et moderne ouvre ses portes dans le quartier des Tilleuls.",
    content: `La commune du Plateau inaugure son nouveau parc pour enfants dans le quartier des Tilleuls, un espace de 2000m² entièrement dédié aux loisirs des plus jeunes.

    ## Équipements installés

    Le parc comprend :
    - Aires de jeux pour différents âges (2-5 ans, 6-12 ans)
    - Structures d'escalade et toboggans
    - Balançoires adaptées aux personnes à mobilité réduite
    - Terrain de sport multijeux
    - Espace pique-nique avec tables et bancs

    ## Sécurité et accessibilité

    - Sol amortissant certifié
    - Clôture sécurisée avec portails
    - Éclairage LED pour les soirées d'été
    - Accès PMR sur tous les équipements
    - Surveillance par caméras

    ## Horaires d'ouverture

    - Avril à septembre : 8h00 - 21h00
    - Octobre à mars : 8h00 - 19h00
    - Fermeture exceptionnelle en cas d'intempéries

    L'inauguration officielle aura lieu le samedi 15 juin à 10h00 en présence du maire et des élus.`,
    category: "Équipements publics",
    date: "18 Mai 2025",
    author: "Service Espaces Verts",
    imageSrc: "/images/service2.svg",
    tags: ["parc", "enfants", "loisirs", "sécurité"],
  },
  {
    id: "collecte-dechets-verts",
    title: "Nouvelle collecte des déchets verts",
    description:
      "Mise en place d'un service de collecte des déchets verts pour les particuliers à partir du mois de juin.",
    content: `La commune du Plateau lance un nouveau service de collecte des déchets verts pour accompagner les habitants dans la gestion écologique de leurs jardins.

    ## Modalités de collecte

    - **Fréquence** : Tous les 15 jours d'avril à octobre
    - **Jour** : Mercredi matin avant 7h00
    - **Contenants** : Sacs biodégradables fournis par la mairie
    - **Volume** : Maximum 5 sacs par foyer

    ## Déchets acceptés

    - Tontes de gazon
    - Feuilles mortes
    - Tailles de haies et arbustes
    - Fleurs fanées
    - Petites branches (diamètre < 5cm)

    ## Déchets refusés

    - Terre et pierres
    - Déchets de cuisine
    - Branches de plus de 5cm de diamètre
    - Déchets traités chimiquement

    ## Distribution des sacs

    Les sacs biodégradables sont disponibles :
    - À l'accueil de la mairie
    - Dans les pharmacies partenaires
    - Lors des permanences de quartier

    ## Valorisation

    Les déchets collectés seront :
    - Compostés dans notre centre de traitement
    - Transformés en paillis pour les espaces verts
    - Redistribués gratuitement aux habitants

    Ce service s'inscrit dans notre démarche de développement durable et de réduction des déchets.`,
    category: "Environnement",
    date: "15 Mai 2025",
    author: "Service Environnement",
    imageSrc: "/images/mairie.svg",
    tags: ["déchets verts", "environnement", "collecte", "compostage"],
  },
  {
    id: "forum-associations",
    title: "Forum des associations 2025",
    description:
      "Rendez-vous incontournable de la rentrée, le forum des associations se déroulera le premier weekend de septembre.",
    content: `Le Forum des Associations 2025 se prépare ! Cet événement incontournable de la rentrée permettra aux habitants de découvrir la richesse du tissu associatif local.

    ## Informations pratiques

    - **Date** : Samedi 6 et dimanche 7 septembre 2025
    - **Lieu** : Gymnase municipal et parvis
    - **Horaires** : 9h00 - 18h00
    - **Entrée** : Gratuite

    ## Plus de 80 associations présentes

    ### Sport et loisirs
    - Clubs de football, tennis, basketball
    - Arts martiaux et fitness
    - Randonnée et cyclisme
    - Sports nautiques

    ### Culture et arts
    - Théâtre et musique
    - Arts plastiques et artisanat
    - Photographie et cinéma
    - Littérature et poésie

    ### Solidarité et social
    - Aide aux personnes âgées
    - Soutien scolaire
    - Insertion professionnelle
    - Aide alimentaire

    ## Animations spéciales

    - Démonstrations sportives
    - Spectacles culturels
    - Ateliers découverte
    - Tombola avec de nombreux lots

    ## Nouveautés 2025

    - Application mobile pour découvrir les associations
    - Espace numérique pour les inscriptions
    - Coin restauration tenu par les associations
    - Parking gratuit au stade

    ## Appel aux bénévoles

    Les associations recherchent des bénévoles pour renforcer leurs équipes. C'est l'occasion de s'engager dans la vie locale !

    Venez nombreux découvrir les activités proposées sur notre commune !`,
    category: "Vie associative",
    date: "12 Mai 2025",
    author: "Service Vie Associative",
    imageSrc: "/images/service2.svg",
    tags: ["associations", "forum", "bénévolat", "activités"],
  },
  {
    id: "budget-participatif",
    title: "Lancement du budget participatif",
    description:
      "Les habitants peuvent désormais proposer et voter pour des projets d'amélioration de leur cadre de vie.",
    content: `La commune du Plateau lance son premier budget participatif, permettant aux citoyens de proposer et choisir des projets d'investissement pour leur ville.

    ## Principe du budget participatif

    Une enveloppe de 100 000 € est dédiée à la réalisation de projets proposés et choisis par les habitants. Chaque citoyen peut :
    - Proposer un projet
    - Voter pour ses projets préférés
    - Suivre la réalisation des projets retenus

    ## Critères des projets

    Les projets doivent :
    - Concerner l'espace public communal
    - Avoir un coût entre 5 000 € et 25 000 €
    - Bénéficier au plus grand nombre
    - Être réalisables techniquement

    ## Calendrier

    - **Mai-Juin 2025** : Dépôt des projets
    - **Juillet 2025** : Étude de faisabilité
    - **Septembre 2025** : Vote des habitants
    - **Octobre 2025** : Annonce des résultats
    - **2026** : Réalisation des projets

    ## Comment participer

    ### Proposer un projet
    - Formulaire en ligne sur le site de la mairie
    - Dossier papier disponible à l'accueil
    - Permanences d'aide dans les quartiers

    ### Voter
    - Vote en ligne sécurisé
    - Urnes dans les lieux publics
    - Vote possible dès 16 ans

    ## Exemples de projets possibles

    - Aménagement d'aires de jeux
    - Installation de mobilier urbain
    - Création d'espaces verts
    - Équipements sportifs de proximité
    - Amélioration de l'éclairage public

    ## Accompagnement

    Des permanences d'information et d'aide sont organisées :
    - Tous les mercredis de 14h à 17h à la mairie
    - Samedis matin sur les marchés
    - Réunions de quartier sur demande

    Cette démarche innovante renforce la démocratie participative et permet à chacun de contribuer à l'amélioration de son cadre de vie.`,
    category: "Démocratie participative",
    date: "08 Mai 2025",
    author: "Cabinet du Maire",
    imageSrc: "/images/mairie.svg",
    tags: ["budget participatif", "démocratie", "projets", "citoyens"],
  },
  {
    id: "marche-producteurs-locaux",
    title: "Nouveau marché de producteurs locaux",
    description:
      "Un marché hebdomadaire de producteurs locaux s'installe tous les vendredis soir sur la place centrale.",
    content: `La commune du Plateau accueille un nouveau marché de producteurs locaux tous les vendredis soir, favorisant les circuits courts et l'économie locale.

    ## Informations pratiques

    - **Jour** : Tous les vendredis
    - **Horaires** : 16h00 - 20h00
    - **Lieu** : Place de la République
    - **Début** : Vendredi 2 juin 2025

    ## Les producteurs présents

    ### Fruits et légumes
    - Ferme des Coteaux (agriculture biologique)
    - Maraîchage du Plateau (légumes de saison)
    - Vergers de la Vallée (fruits locaux)

    ### Produits laitiers et fromages
    - Fromagerie artisanale Dubois
    - Chèvrerie des Prés Verts
    - Ferme laitière Martin

    ### Viandes et charcuteries
    - Élevage Rousseau (bœuf et porc)
    - Volailles fermières Petit
    - Charcuterie traditionnelle Moreau

    ### Produits transformés
    - Boulangerie bio du Village
    - Confitures maison Delacroix
    - Miel et produits de la ruche

    ## Avantages du marché

    - Produits frais et de qualité
    - Prix direct producteur
    - Réduction de l'empreinte carbone
    - Soutien à l'économie locale
    - Lien social avec les producteurs

    ## Services complémentaires

    - Parking gratuit 2h place de la Mairie
    - Paniers consignés disponibles
    - Paiement par carte accepté
    - Commandes possibles pour la semaine suivante

    ## Engagement environnemental

    - Emballages biodégradables ou réutilisables
    - Compostage des déchets organiques
    - Sensibilisation au gaspillage alimentaire
    - Promotion des produits de saison

    Ce marché s'inscrit dans la démarche de développement durable de la commune et répond aux attentes des habitants pour une consommation plus responsable.`,
    category: "Commerce local",
    date: "05 Mai 2025",
    author: "Service Développement Économique",
    imageSrc: "/images/service2.svg",
    tags: ["marché", "producteurs locaux", "bio", "circuits courts"],
  },
]

export const getNewsById = (id: string): NewsArticle | undefined => {
  return newsData.find((article) => article.id === id)
}

export const getFeaturedNews = (): NewsArticle | undefined => {
  return newsData.find((article) => article.featured)
}

export const getNewsByCategory = (category: string): NewsArticle[] => {
  if (category === "all") return newsData
  return newsData.filter((article) => article.category === category)
}

export const getNewsPage = (
  page: number,
  itemsPerPage = 6,
): {
  articles: NewsArticle[]
  totalPages: number
  currentPage: number
  totalItems: number
} => {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const articles = newsData.slice(startIndex, endIndex)

  return {
    articles,
    totalPages: Math.ceil(newsData.length / itemsPerPage),
    currentPage: page,
    totalItems: newsData.length,
  }
}