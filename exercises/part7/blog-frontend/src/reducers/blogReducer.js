import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const retrievedBlogs = await blogService.getBlogs()
    dispatch(setBlogs(retrievedBlogs))
  }
}

export const addBlog = (blog, user) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createBlog(blog)
    if (createdBlog) {
      const userId = createdBlog.user
      createdBlog.user = {
        username: user.username,
        name: user.name,
        id: userId
      }
      dispatch(appendBlog(createdBlog))
    }
  }
}

export default blogSlice.reducer
