import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRldmVydHMiLCJpZCI6IjY1ODcyNzZjYzljMDQyNDcxNWQ1NjY2OCIsImlhdCI6MTcwMzc4OTk5NiwiZXhwIjoxNzAzNzkzNTk2fQ.x9LzF-lWO6Y9f0PGsVrTbd4sTrB7ZOqohV1Cqlv-1Xo',
    username: 'teverts',
    name: 'Tammy Everts'
  }
  const blog = {
    title: 'NEW! December product update',
    author: 'Cliff Crocker',
    url: 'https://www.speedcurve.com/blog/december-2023-update/',
    likes: 7,
    user: {
      username: 'teverts',
      name: 'Tammy Everts',
      id: '6587276cc9c0424715d56668'
    },
    id: '658c6a6a12d561b9ad496925'
  }
  const updateMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} updateBlog={updateMockHandler} deleteBlog={deleteMockHandler} user={user} />).container
  })

  test('renders title and author', async () => {
    expect(container).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('does not render URL and likes by default', async () => {
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
  })

  test('after clicking the "view" button, shows URL and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(`likes ${blog.likes}`)
  })
})
