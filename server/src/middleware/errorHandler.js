// src/middleware/errorHandler.js
import { logger } from '../utils/logger.js'
import { NODE_ENV } from '../config/constants.js'

export function errorHandler(err, req, res, next) {
  logger.error(err.message, { stack: err.stack, path: req.path })

  const status = err.status || 500
  const message = err.message || 'Internal server error'

  res.status(status).json({
    success: false,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
}