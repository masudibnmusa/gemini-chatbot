// utils/constants.js

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
}

export const SSE_EVENTS = {
  CHUNK: 'chunk',
  DONE: 'done',
  ERROR: 'error',
}

export const MAX_INPUT_LENGTH = 4000

export const CHAT_ENDPOINT = `${API_BASE_URL}/chat`