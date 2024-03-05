const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const { Blog } = require('../models')

blogsRouter.get('/', async (request, response) => {
  const retrievedBlogs = await Blog.findAll()
  response.json(retrievedBlogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const createdBlog = await Blog.create(body)
    response.status(201).json(createdBlog)
  } catch (error) {
    return response.status(400).json({ error })
  }
})

blogsRouter.delete('/:id', middleware.blogFinder, async (request, response) => {
  const deletedCount = await Blog.destroy({ where: { id: request.params.id } })
  if (deletedCount === 1) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
