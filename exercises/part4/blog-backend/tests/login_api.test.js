const supertest = require('supertest')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000) // 30 seconds
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const testTimeoutMS = 10000 // 10 seconds
const User = require('../models/user')


beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('login an existing user', () => {
  test('succeeds with valid data', async () => {
    const existingUser = {
      username: 'root',
      password: 'secret',
    }

    await api
      .post('/api/login')
      .send(existingUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain('root')
  }, testTimeoutMS)

  test('fails with status code 401 if "username" or "password" is invalid', async () => {
    const existingUser = {
      username: 'root',
      password: 'mypassword',
    }

    const result = await api
      .post('/api/login')
      .send(existingUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Invalid username or password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  }, testTimeoutMS)
})

afterAll(async () => {
  await mongoose.connection.close()
})
