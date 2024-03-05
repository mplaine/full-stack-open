const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const { Blog } = require('../models')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.findAll()
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const blog = await Blog.create(body)
    response.status(201).json(blog)
  } catch (error) {
    return response.status(400).json({ error })
  }
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
    blog.likes = body.likes === undefined ? 0 : body.likes
    await blog.save()
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
