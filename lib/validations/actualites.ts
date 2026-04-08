import { z } from "zod"

export const actualitesFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200, "Le titre ne peut pas dépasser 200 caractères"),
  description: z
    .string()
    .min(1, "La description est requise")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
  details: z
    .string()
    .min(1, "Les détails sont requis")
    .max(5000, "Les détails ne peuvent pas dépasser 5000 caractères"),
  type: z.enum(["news", "press_release", "announcement", "communique"], {
    required_error: "Le type est requis",
  }),
  date: z.string().min(1, "La date est requise"),
  poster: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  comments: z.array(z.string()).default([]),
})

export type ActualitesFormData = z.infer<typeof actualitesFormSchema>
