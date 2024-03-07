const jwt = require('jsonwebtoken')
const { Blog, ReadingList, User } = require('../models')
const { SECRET } = require('./config')
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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: error.message
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'expired token'
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

const readingListFinder = async (request, response, next) => {
  request.readingList = await ReadingList.findByPk(request.params.id)
  next()
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return response.status(401).json({ error: 'Missing token' })
  }

  const token = authorization.substring(7)
  const decodedToken = jwt.verify(token, SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  request.user = await User.findByPk(decodedToken.id)

  next()
}

module.exports = {
  blogFinder,
  errorHandler,
  readingListFinder,
  unknownEndpoint,
  userExtractor,
  userFinder
}
