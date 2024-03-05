const { Blog, User } = require('../models')
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
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({
      error: error.errors.map((error) => error.message)
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

const userFinder = async (request, response, next) => {
  const username = request.params.username
  request.user = await User.findOne({
    where: { username: username }
  })
  next()
}

module.exports = {
  blogFinder,
  errorHandler,
  unknownEndpoint,
  userFinder
}
