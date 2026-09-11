// src/config/cors.js
import { CLIENT_URL } from './constants.js'

export const corsOptions = {
  origin: CLIENT_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}