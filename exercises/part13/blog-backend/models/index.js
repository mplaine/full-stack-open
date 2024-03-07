const Blog = require('./blog')
const ReadingList = require('./reading_list')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)
// User.sync({ alter: true })
// Blog.sync({ alter: true })

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' }) // User object attribute to access blogs listed by the user
Blog.belongsToMany(User, { through: ReadingList })
User.hasMany(ReadingList)
ReadingList.belongsTo(User)
Blog.hasMany(ReadingList, { as: 'readinglists' })
ReadingList.belongsTo(Blog)

module.exports = {
  Blog,
  ReadingList,
  User
}
