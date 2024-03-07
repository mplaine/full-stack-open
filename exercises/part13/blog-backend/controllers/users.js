const usersRouter = require('express').Router()
const { Blog, User } = require('../models')
const ValidationError = require('../utils/errors')
const middleware = require('../utils/middleware')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findByPk(request.params.id, {
    attributes: ['name', 'username'],
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        through: {
          attributes: []
        }
      }
    ]
  })
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.create(body)
  response.status(201).json(user)
})

usersRouter.put('/:username', middleware.userFinder, async (request, response) => {
  const user = request.user
  const body = request.body

  if (user) {
    if (body.username === undefined) {
      throw new ValidationError('missing username')
    }

    user.username = body.username
    await user.save()
    response.json(user)
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter
