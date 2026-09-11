// src/config/constants.js
import 'dotenv/config'

export const PORT = process.env.PORT || 5000
export const NODE_ENV = process.env.NODE_ENV || 'development'

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

export const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000
export const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 20

export const MAX_MESSAGE_LENGTH = 4000
export const MAX_HISTORY_LENGTH = 50