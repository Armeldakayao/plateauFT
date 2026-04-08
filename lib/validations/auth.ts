import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const registerSchema = z
  .object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    dateNaissance: z.string().min(1, "La date de naissance est requise"),
    lieuNaissance: z.string().min(1, "Le lieu de naissance est requis"),
    nationalite: z.string().min(1, "La nationalité est requise"),
    commune: z.string().min(1, "La commune est requise"),
    email: z.string().email("Email invalide"),
    telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(6, "La confirmation du mot de passe est requise"),
    typeIdentite: z.string().min(1, "Le type de pièce d'identité est requis"),
    numeroIdentite: z.string().min(1, "Le numéro de pièce d'identité est requis"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
    acceptDataPolicy: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter la politique de confidentialité",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export const otpSchema = z.object({
  digit1: z.string().length(1, "Requis"),
  digit2: z.string().length(1, "Requis"),
  digit3: z.string().length(1, "Requis"),
  digit4: z.string().length(1, "Requis"),
  digit5: z.string().length(1, "Requis"),
  digit6: z.string().length(1, "Requis"),
})

export const profileSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
  adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  codePostal: z.string().min(5, "Le code postal doit contenir 5 caractères"),
  ville: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
})

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Le mot de passe actuel doit contenir au moins 6 caractères"),
    newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(6, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })
