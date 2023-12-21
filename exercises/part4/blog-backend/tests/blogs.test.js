const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithZeroBlogs = []
  const listWithOneBlog = [
    {
      _id: '658334c7075b466243501149',
      title: 'Performance audit: Lego.com',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
      likes: 5,
      __v: 0
    },
  ]
  const listWithManyBlogs = [
    {
      _id: '658334c7075b466243501149',
      title: 'Performance audit: Lego.com',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
      likes: 5,
      __v: 0
    },
    {
      _id: '6583350a075b46624350114b',
      title: 'NEW! December product update',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/december-2023-update/',
      likes: 99,
      __v: 0
    },
    {
      _id: '65833530075b46624350114d',
      title: 'Mobile INP performance: The elephant in the room',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/core-web-vitals-inp-mobile/',
      likes: 2,
      __v: 0
    }
  ]

  test('of empty list array is zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(106)
  })
})

describe('favorite blog', () => {
  const listWithZeroBlogs = []
  const listWithOneBlog = [
    {
      _id: '658334c7075b466243501149',
      title: 'Performance audit: Lego.com',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
      likes: 5,
      __v: 0
    },
  ]
  const listWithManyBlogs = [
    {
      _id: '658334c7075b466243501149',
      title: 'Performance audit: Lego.com',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
      likes: 5,
      __v: 0
    },
    {
      _id: '6583350a075b46624350114b',
      title: 'NEW! December product update',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/december-2023-update/',
      likes: 99,
      __v: 0
    },
    {
      _id: '65833530075b46624350114d',
      title: 'Mobile INP performance: The elephant in the room',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/core-web-vitals-inp-mobile/',
      likes: 2,
      __v: 0
    },
  ]

  test('of empty list array is zero', () => {
    const result = listHelper.favoriteBlog(listWithZeroBlogs)
    const expected = null
    expect(result).toEqual(expected)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const expected = {
      _id: '658334c7075b466243501149',
      title: 'Performance audit: Lego.com',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
      likes: 5,
      __v: 0
    }
    expect(result).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    const expected = {
      _id: '6583350a075b46624350114b',
      title: 'NEW! December product update',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/december-2023-update/',
      likes: 99,
      __v: 0
    }
    expect(result).toEqual(expected)
  })
})

describe('most blogs', () => {
  const listWithZeroBlogs = []
  const listWithOneBlog = [
    {
      _id: '658334c7075b466243501149',
      title: 'Performance audit: Lego.com',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
      likes: 5,
      __v: 0
    },
  ]
  const listWithManyBlogs = [
    {
      _id: '658334c7075b466243501149',
      title: 'Performance audit: Lego.com',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
      likes: 5,
      __v: 0
    },
    {
      _id: '6583350a075b46624350114b',
      title: 'NEW! December product update',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/december-2023-update/',
      likes: 99,
      __v: 0
    },
    {
      _id: '65833530075b46624350114d',
      title: 'Mobile INP performance: The elephant in the room',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/core-web-vitals-inp-mobile/',
      likes: 2,
      __v: 0
    },
  ]

  test('of empty list array is zero', () => {
    const result = listHelper.mostBlogs(listWithZeroBlogs)
    const expected = null
    expect(result).toEqual(expected)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = 'Tammy Everts'
    expect(result).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    const expected = 'Cliff Crocker'
    expect(result).toEqual(expected)
  })
})
