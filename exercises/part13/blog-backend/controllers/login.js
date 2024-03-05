const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')
const ValidationError = require('../utils/errors')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  if (username === undefined) {
    throw new ValidationError('missing username')
  }
  if (password === undefined) {
    throw new ValidationError('missing password')
  }

  const user = await User.findOne({
    where: {
      username: username
    }
  })
  const passwordCorrect = password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  // Token expires in 60*60 seconds (1 hour)
  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 })

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
