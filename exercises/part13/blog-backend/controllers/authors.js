const authorsRouter = require('express').Router()
const { Blog, User } = require('../models')
const { sequelize } = require('../utils/db')

authorsRouter.get('/', async (request, response) => {
  const authors = await User.findAll({
    attributes: [
      ['name', 'author'],
      [sequelize.fn('COUNT', sequelize.col('blogs.id')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('blogs.likes')), 'likes']
    ],
    include: {
      model: Blog,
      attributes: []
    },
    group: ['user.id'],
    order: [['name', 'ASC']]
  })
  response.json(authors)
})

module.exports = authorsRouter
