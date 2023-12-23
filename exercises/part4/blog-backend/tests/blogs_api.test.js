const supertest = require('supertest')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000) // 30 seconds
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const testTimeoutMS = 10000 // 10 seconds
const Blog = require('../models/blog')
const _ = require('lodash')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, testTimeoutMS)

  test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  }, testTimeoutMS)

  test('each blog has "id"', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
      // expect(blog).toHaveProperty('id')
    })
  }, testTimeoutMS)
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'How to automatically performance test your pull requests and fight regressions',
      author: 'Joseph Wynn',
      url: 'https://www.speedcurve.com/blog/web-performance-test-pull-requests/',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).toContain('https://www.speedcurve.com/blog/web-performance-test-pull-requests/')
  }, testTimeoutMS)

  test('succeeds with valid data without "likes"', async () => {
    const newBlog = {
      title: '2023 recap: This year was all about making performance easy (well, easier)',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/2023-easy-web-performance/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const latestBlog = _(blogsAtEnd).last()
    expect(latestBlog.likes).toEqual(0)
  }, testTimeoutMS)

  test('fails with status code 400 if "title" and "url" are not given', async () => {
    const newBlog = {
      author: 'Tammy Everts',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, testTimeoutMS)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if "id" is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = _(blogsAtStart).first()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).not.toContain(blogToDelete.url)
  }, testTimeoutMS)

  test('fails with status code 404 if "id" is invalid', async () => {
    const invalidId = '012345678901234567890123'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, testTimeoutMS)
})

describe('modification of a blog', () => {
  test('succeeds with status code 200 if "id" and data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = _(blogsAtStart).first()
    blogToUpdate.likes = -1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(blogToUpdate.likes)
  }, testTimeoutMS)

  test('fails with status code 404 if "id" is invalid', async () => {
    const invalidId = '012345678901234567890123'
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = _(blogsAtStart).first()
    blogToUpdate.likes = -1

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(blogToUpdate)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).not.toContain(blogToUpdate.likes)
  }, testTimeoutMS)
})

afterAll(async () => {
  await mongoose.connection.close()
})
