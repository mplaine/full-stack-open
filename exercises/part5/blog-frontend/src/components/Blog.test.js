import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
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
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })

  test('renders title and author', async () => {
    expect(container).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('does not render URL and likes by default', async () => {
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
  })
})
