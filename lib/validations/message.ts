import { z } from "zod"

export const messageSchema = z.object({
  subject: z.string().min(2, "Le sujet doit contenir au moins 2 caractères"),
  content: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  recipientId: z.string().optional(),
})

export const replySchema = z.object({
  content: z.string().min(10, "La réponse doit contenir au moins 10 caractères"),
  messageId: z.string(),
})
