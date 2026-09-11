// server/src/features/chat/chat.validation.js
import { z } from 'zod'
import { MAX_MESSAGE_LENGTH, MAX_HISTORY_LENGTH } from '../../config/constants.js'

const historyItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1),
})

export const chatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(MAX_MESSAGE_LENGTH, `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`),
  history: z.array(historyItemSchema).max(MAX_HISTORY_LENGTH).optional().default([]),
})