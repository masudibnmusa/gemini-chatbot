// shared/constants.js
// Shared between client & server — keep this file identical on both sides
// (or symlink / import via a monorepo workspace alias).

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

export const MODEL_CONFIG = {
  DEFAULT_MODEL: 'gemini-1.5-flash',
  MAX_OUTPUT_TOKENS: 2048,
  TEMPERATURE: 0.7,
}