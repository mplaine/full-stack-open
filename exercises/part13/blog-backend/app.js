const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const authorsRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const readinglistsRouter = require('./controllers/reading_lists')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())

app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglists', readinglistsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
