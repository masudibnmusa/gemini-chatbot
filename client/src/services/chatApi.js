// services/chatApi.js
import api from './api'
import { CHAT_ENDPOINT, SSE_EVENTS } from '../utils/constants'

/**
 * Non-streaming request (fallback / simple use cases)
 */
export async function sendChatMessage(message, history = []) {
  const response = await api.post('/chat', { message, history })
  return response.data
}

/**
 * Streaming request via fetch + ReadableStream (SSE-style)
 * Axios doesn't handle streaming bodies well in the browser, so we use raw fetch here.
 *
 * @param {string} message - user input
 * @param {Array} history - prior conversation messages
 * @param {Object} callbacks - { onChunk, onDone, onError }
 * @param {AbortSignal} signal - optional abort signal to cancel the stream
 */
export async function streamChatMessage(message, history = [], callbacks = {}, signal) {
  const { onChunk, onDone, onError } = callbacks

  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
      signal,
    })

    if (!response.ok || !response.body) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // Parse SSE-style "event: ...\ndata: ...\n\n" chunks
      const parts = buffer.split('\n\n')
      buffer = parts.pop() // keep incomplete chunk in buffer

      for (const part of parts) {
        const lines = part.split('\n')
        let event = SSE_EVENTS.CHUNK
        let data = ''

        for (const line of lines) {
          if (line.startsWith('event:')) event = line.replace('event:', '').trim()
          if (line.startsWith('data:')) data += line.replace('data:', '').trim()
        }

        if (!data) continue

        if (event === SSE_EVENTS.ERROR) {
          onError?.(new Error(data))
          return
        }

        if (event === SSE_EVENTS.DONE) {
          onDone?.()
          return
        }

        onChunk?.(data)
      }
    }

    onDone?.()
  } catch (err) {
    if (err.name === 'AbortError') return
    onError?.(err)
  }
}