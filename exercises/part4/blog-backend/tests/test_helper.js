const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'Performance audit: Lego.com',
    author: 'Tammy Everts',
    url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
    likes: 5,
  },
  {
    title: 'NEW! December product update',
    author: 'Cliff Crocker',
    url: 'https://www.speedcurve.com/blog/december-2023-update/',
    likes: 99,
  },
  {
    title: 'Mobile INP performance: The elephant in the room',
    author: 'Cliff Crocker',
    url: 'https://www.speedcurve.com/blog/core-web-vitals-inp-mobile/',
    likes: 2,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
