// src/utils/helpers.js

/**
 * Formats an SSE message chunk according to the shared protocol.
 * @param {string} event - event name (chunk | done | error)
 * @param {string} data - payload data
 */
export function formatSSE(event, data) {
  return `event: ${event}\ndata: ${data}\n\n`
}

/**
 * Wraps an async route handler to forward errors to Express's error middleware.
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/**
 * Strips history down to a safe shape/length before sending to Gemini.
 */
export function sanitizeHistory(history = [], maxLength = 50) {
  return history
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .slice(-maxLength)
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))
}