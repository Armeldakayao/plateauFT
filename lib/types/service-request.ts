// Types spécifiques pour les demandes de services
export interface RdvRequest {
  nom: string
  prenom: string
  email: string
  telephone: string
  profession: string
  institution: string
  nationalId: string
  meetingTarget: string
  otherMeetingTarget?: string
  subject: string
  otherSubject?: string
  preferredSlot1: string
  preferredSlot2: string
  preferredSlot3: string
  meetingType: string
  certifyAccuracy: boolean
  authorizeContact: boolean
}

export interface PartenaritRequest {
  nom: string
  prenom: string
  email: string
  organizationName: string
  organizationType: string
  otherOrganizationType?: string
  activitySector: string
  otherActivitySector?: string
  originCountry: string
  originCity: string
  creationYear: number
  website?: string
  contactName: string
  contactFunction: string
  contactPhone: string
  contactEmail: string
  partnershipNature: string
  otherPartnershipNature?: string
  concernedService: string
  proposalDescription: string
  mairieObjectives: string
  structureObjectives: string
  partnershipDuration: string
  startDate: string
  certifyAccuracy: boolean
  authorizeContact: boolean
  acknowledgeNoValidation: boolean
}

export interface MariageRequest {
  conjoint1: {
    nom: string
    prenom: string
    dob: string
    pob: string
    nationality: string
    profession: string
    address: string
    phone: string
    email: string
    idNumber: string
    maritalStatus: string
  }
  conjoint2: {
    nom: string
    prenom: string
    dob: string
    pob: string
    nationality: string
    profession: string
    address: string
    phone: string
    email: string
    idNumber: string
    maritalStatus: string
  }
  marriageType: string
  guestEstimate: number
  celebrationLanguage: string
  otherCelebrationLanguage?: string
  date1: string
  time1: string
  date2: string
  time2: string
  date3: string
  time3: string
  reserveRoom: boolean
  roomType?: string
  photoSpace: boolean
  onlinePayment: boolean
  certifyAccuracy: boolean
  authorizeContact: boolean
}

export interface ServiceRequest {
  id: string
  type: "rdv" | "partenariat" | "mariage"
  etat: "en_attente" | "en_cours" | "validee" | "refusee" | "annulee"
  nom: string
  prenom: string
  email: string
  telephone?: string
  demande: any
  numeroReference: string
  priorite: string
  dateLimiteTraitement?: string
  utilisateur_id: string
  service_id: string
  documents?: ServiceRequestDocument[]
  traitements?: Treatment[]
  notifications?: Notification[]
  createdAt: string
  updatedAt: string
}

export interface ServiceRequestDocument {
  id: string
  type: string
  nom: string
  description?: string
  url: string
  originalName: string
  mimeType: string
  size: number
  service_request_id: string
  createdAt: string
}

export interface Treatment {
  id: string
  numeroTraitement: string
  etat: "en_cours" | "termine" | "suspendu" | "annule"
  resultat: "en_attente" | "validee" | "refusee" | "incomplete" | "reportee"
  agentNom: string
  agentPrenom: string
  agentEmail: string
  dateDebut?: string
  dateFin?: string
  dateEcheance?: string
  commentairesInternes?: string
  commentairesPublics?: string
  messageAgent?: string
  demande_id: string
  agent_id: string
  createdAt: string
  updatedAt: string
}

export interface CreateTreatmentRequest {
  demandeId: string
  agentNom: string
  agentPrenom: string
  agentEmail: string
  agentService?: string
  dateEcheance?: string
  commentairesInternes?: string
  messageAgent?: string
  notifyByEmail?: boolean
  documentsRequis?: string[]
  tempsEstime?: number
}

export interface UpdateTreatmentRequest {
  etat?: "en_cours" | "termine" | "suspendu" | "annule"
  resultat?: "en_attente" | "validee" | "refusee" | "incomplete" | "reportee"
  commentairesInternes?: string
  commentairesPublics?: string
  messageAgent?: string
  dateEcheance?: string
  notifyByEmail?: boolean
  documentsRequis?: string[]
}

export interface ServiceRequestFilters {
  page?: number
  limit?: number
  type?: "rdv" | "partenariat" | "mariage"
  etat?: "en_attente" | "en_cours" | "validee" | "refusee" | "annulee"
  priorite?: "faible" | "normale" | "haute" | "urgente"
  agentId?: string
  dateDebut?: string
  dateFin?: string
}

export interface ServiceRequestStats {
  general: {
    total: number
    parEtat: Array<{ etat: string; count: number }>
    parType: Array<{ type: string; count: number }>
    parPriorite: Array<{ priorite: string; count: number }>
    demandesEnRetard: number
  }
  traitements: {
    tempsTraitementMoyen: number
    parResultat: Array<{ resultat: string; count: number }>
  }
}
