// src/features/chat/chat.routes.js
import { Router } from 'express'
import { handleChatStream } from './chat.controller.js'
import { chatRequestSchema } from './chat.validation.js'
import { validateRequest } from '../../middleware/validateRequest.js'
import { chatRateLimiter } from '../../middleware/rateLimiter.js'

const router = Router()

router.post('/', chatRateLimiter, validateRequest(chatRequestSchema), handleChatStream)

export default router