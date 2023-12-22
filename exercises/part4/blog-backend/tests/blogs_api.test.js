const supertest = require('supertest')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000) // 30 seconds
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const testTimeoutMS = 10000 // 10 seconds
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('blogs api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, testTimeoutMS)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, testTimeoutMS)

  test('each blog has the "id" property', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
      // expect(blog).toHaveProperty('id')
    })
  }, testTimeoutMS)

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'How to automatically performance test your pull requests and fight regressions',
      author: 'Joseph Wynn',
      url: 'https://www.speedcurve.com/blog/web-performance-test-pull-requests/',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const urls = blogs.map(blog => blog.url)
    expect(urls).toContain('https://www.speedcurve.com/blog/web-performance-test-pull-requests/')
  }, testTimeoutMS)
})

afterAll(async () => {
  await mongoose.connection.close()
})
