// src/index.js
import express from 'express'
import cors from 'cors'
import { PORT } from './config/constants.js'
import { corsOptions } from './config/cors.js'
import chatRoutes from './features/chat/chat.routes.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { logger } from './utils/logger.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: Date.now() })
})

app.use('/api/chat', chatRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`)
})