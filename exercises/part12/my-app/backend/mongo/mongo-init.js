/* eslint-disable no-undef */
// Development database
blogApp = db.getSiblingDB('blogApp')

blogApp.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'blogApp'
    }
  ]
})

blogApp.createCollection('blogs')
blogApp.createCollection('users')

// Test database
testBlogApp = db.getSiblingDB('testBlogApp')

testBlogApp.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'testBlogApp'
    }
  ]
})

testBlogApp.createCollection('blogs')
testBlogApp.createCollection('users')
