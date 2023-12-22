const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
  const retrievedBlogs = await Blog.find({})
  response.json(retrievedBlogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  logger.info(blog)

  const createdBlog = await blog.save()
  response.status(201).json(createdBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (deletedBlog) {
    response.status(204).end()
  }
  else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
