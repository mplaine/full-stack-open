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

describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, testTimeoutMS)

  test('all users are returned', async () => {
    const users = await helper.usersInDb()
    expect(users).toHaveLength(helper.initialUsers.length)
  }, testTimeoutMS)

  test('each user has "id"', async () => {
    const users = await helper.usersInDb()
    console.log(users)

    users.forEach(user => {
      expect(user.id).toBeDefined()
      // expect(user).toHaveProperty('id')
    })
  }, testTimeoutMS)
})

describe('addition of a new user', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'mypassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain('johndoe')
  }, testTimeoutMS)

  test('fails with status code 400 if "username" is already taken', async () => {
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'mypassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  }, testTimeoutMS)
})

afterAll(async () => {
  await mongoose.connection.close()
})
