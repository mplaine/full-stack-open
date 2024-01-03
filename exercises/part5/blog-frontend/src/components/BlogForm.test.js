import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const createBlog = jest.fn()
  let container

  beforeEach(() => {
    container = render(<BlogForm createBlog={createBlog} />).container
  })

  test('clicking the "create" button calls the given event handler with the right details', async () => {
    const user = userEvent.setup()

    const title = container.querySelector('input[name="Title"]')
    await user.type(title, 'New title')
    const author = container.querySelector('input[name="Author"]')
    await user.type(author, 'New author')
    const url = container.querySelector('input[name="URL"]')
    await user.type(url, 'New URL')

    const createButton = screen.getByRole('button')
    await user.click(createButton)

    const newBlogObject = createBlog.mock.calls[0][0]
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(newBlogObject.title).toBe('New title')
    expect(newBlogObject.author).toBe('New author')
    expect(newBlogObject.url).toBe('New URL')
  })
})
