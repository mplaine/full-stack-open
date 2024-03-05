const blogsRouter = require('express').Router()
const { Blog, User } = require('../models')
const ValidationError = require('../utils/errors')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = await Blog.create({ ...body, userId: user.id, date: new Date() })
  response.status(201).json(blog)
})

blogsRouter.delete('/:id', middleware.userExtractor, middleware.blogFinder, async (request, response) => {
  const blog = request.blog
  const user = request.user
  if (blog) {
    if (blog.userId !== user.id) {
      return response.status(401).json({ error: 'Invalid user' })
    }

    await blog.destroy()
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', middleware.blogFinder, async (request, response) => {
  const blog = request.blog
  const body = request.body

  if (blog) {
    if (body.likes === undefined) {
      throw new ValidationError('missing likes')
    }

    blog.likes = body.likes
    await blog.save()
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
