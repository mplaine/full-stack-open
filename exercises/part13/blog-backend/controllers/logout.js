const logoutRouter = require('express').Router()
const { Session } = require('../models')
const middleware = require('../utils/middleware')

logoutRouter.delete('/', middleware.tokenExtractor, async (request, response) => {
  const session = await Session.findOne({
    where: { token: request.token }
  })

  if (session) {
    session.valid = false
    await session.save()
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

module.exports = logoutRouter
