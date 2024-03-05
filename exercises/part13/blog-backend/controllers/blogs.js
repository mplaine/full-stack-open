const blogsRouter = require('express').Router()
const ValidationError = require('../utils/errors')
const middleware = require('../utils/middleware')
const { Blog } = require('../models')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.findAll()
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = await Blog.create(body)
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
