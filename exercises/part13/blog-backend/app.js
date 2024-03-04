const config = require('./utils/config')
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.DATABASE_URL)

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: function (log) {
    if (!log.includes('SELECT 1+1 AS result')) {
      console.log(log)
    }
  }
})

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
  }
)
Blog.sync()

app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  const retrievedBlogs = await Blog.findAll()
  response.json(retrievedBlogs)
})

app.post('/api/blogs', async (request, response) => {
  const body = request.body

  try {
    const createdBlog = await Blog.create(body)
    response.status(201).json(createdBlog)
  } catch (error) {
    return response.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (request, response) => {
  const deletedCount = await Blog.destroy({ where: { id: request.params.id } })
  if (deletedCount === 1) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
