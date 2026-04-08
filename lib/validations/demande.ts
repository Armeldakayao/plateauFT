import { z } from "zod"

export const demandeSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
  adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  codePostal: z.string().min(5, "Le code postal doit contenir 5 caractères"),
  ville: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
  motif: z.string().min(1, "Le motif est requis"),
  commentaire: z.string().optional(),
})

export const documentSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Le fichier ne doit pas dépasser 5 Mo",
    })
    .refine(
      (file) => {
        const acceptedTypes = ["application/pdf", "image/jpeg", "image/png"]
        return acceptedTypes.includes(file.type)
      },
      {
        message: "Le fichier doit être au format PDF, JPG ou PNG",
      },
    ),
})
