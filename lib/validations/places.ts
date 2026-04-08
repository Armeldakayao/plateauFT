import { z } from "zod"

export const placesFormSchema = z.object({
  title: z.string().min(1, "Le nom du lieu est requis").max(200, "Le nom ne peut pas dépasser 200 caractères"),
  description: z
    .string()
    .min(1, "La description est requise")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
  details: z
    .string()
    .min(1, "Les détails sont requis")
    .max(5000, "Les détails ne peuvent pas dépasser 5000 caractères"),
  type: z.enum(["restaurant", "hotel", "activity", "landmark"], {
    required_error: "Le type est requis",
  }),
  address: z.string().min(1, "L'adresse est requise").max(300, "L'adresse ne peut pas dépasser 300 caractères"),
  phone: z.string().optional(),
  website: z.string().url("L'URL du site web n'est pas valide").optional().or(z.literal("")),
  openingHours: z.string().optional(),
  poster: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  specialties: z.array(z.string()).default([]),
  reviews: z.array(z.string()).default([]),
})

export type PlacesFormData = z.infer<typeof placesFormSchema>
