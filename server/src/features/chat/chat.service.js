// src/features/chat/chat.service.js
import { getGeminiModel } from '../../config/gemini.js'
import { sanitizeHistory } from '../../utils/helpers.js'
import { logger } from '../../utils/logger.js'

/**
 * Streams a Gemini response chunk-by-chunk.
 * @param {string} message - the new user message
 * @param {Array} history - prior conversation turns
 * @param {(text: string) => void} onChunk - called with each text chunk
 * @returns {Promise<string>} the full assembled response text
 */
export async function streamGeminiResponse(message, history, onChunk) {
  const model = getGeminiModel()
  const contents = sanitizeHistory(history)

  const chat = model.startChat({ history: contents })

  logger.info('Starting Gemini stream', { messageLength: message.length })

  const result = await chat.sendMessageStream(message)

  let fullText = ''

  for await (const chunk of result.stream) {
    const text = chunk.text()
    if (text) {
      fullText += text
      onChunk(text)
    }
  }

  return fullText
}