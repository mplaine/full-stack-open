const Blog = require('./blog')
const ReadingList = require('./reading_list')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)
// User.sync({ alter: true })
// Blog.sync({ alter: true })

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' }) // User object attribute to access blogs listed by the user
Blog.belongsToMany(User, { through: ReadingList, as: 'listings' }) // Blog object attribute to access users who have listed the blog

module.exports = {
  Blog,
  ReadingList,
  User
}
