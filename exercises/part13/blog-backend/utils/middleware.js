const { Blog } = require('../models')
const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({
    error: 'unknown endpoint'
  })
}

const blogFinder = async (request, response, next) => {
  request.blog = await Blog.findByPk(request.params.id)
  next()
}

module.exports = {
  blogFinder,
  errorHandler,
  unknownEndpoint
}
