// src/config/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GEMINI_API_KEY, GEMINI_MODEL } from './constants.js'

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is missing. Set it in your .env file.')
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

export function getGeminiModel() {
  return genAI.getGenerativeModel({ model: GEMINI_MODEL })
}

export { GEMINI_MODEL }