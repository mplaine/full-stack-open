const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(retrievedBlogs => {
      response.json(retrievedBlogs)
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  logger.info(blog)

  blog
    .save()
    .then(createdBlog => {
      response.status(201).json(createdBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
