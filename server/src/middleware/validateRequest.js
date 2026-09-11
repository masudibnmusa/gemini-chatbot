// src/middleware/validateRequest.js
export function validateRequest(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(', ')
      const error = new Error(message)
      error.status = 400
      return next(error)
    }

    req.body = result.data
    next()
  }
}