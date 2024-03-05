const blogsRouter = require('express').Router()
const { Blog } = require('../models')
const ValidationError = require('../utils/errors')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.findAll()
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = await Blog.create({ ...body, userId: user.id, date: new Date() })
  response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedCount = await Blog.destroy({ where: { id: id } })

  if (deletedCount === 1) {
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
