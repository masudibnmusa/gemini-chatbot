// src/features/chat/chat.controller.js
import { streamGeminiResponse } from './chat.service.js'
import { formatSSE, asyncHandler } from '../../utils/helpers.js'
import { SSE_EVENTS } from '../../../../shared/constants.js'
import { logger } from '../../utils/logger.js'

export const handleChatStream = asyncHandler(async (req, res) => {
  const { message, history } = req.body

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders?.()

  const onChunk = (text) => {
    res.write(formatSSE(SSE_EVENTS.CHUNK, JSON.stringify(text)))
  }

  try {
    await streamGeminiResponse(message, history, onChunk)
    res.write(formatSSE(SSE_EVENTS.DONE, JSON.stringify({ finished: true })))
  } catch (err) {
    logger.error('Gemini stream failed', { error: err.message })
    res.write(formatSSE(SSE_EVENTS.ERROR, JSON.stringify(err.message)))
  } finally {
    res.end()
  }

  req.on('close', () => {
    res.end()
  })
})