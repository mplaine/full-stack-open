const readingListsRouter = require('express').Router()
const { ReadingList } = require('../models')
const ValidationError = require('../utils/errors')
const middleware = require('../utils/middleware')

readingListsRouter.post('/', async (request, response) => {
  const body = request.body
  const readingList = await ReadingList.create(body)
  response.status(201).json(readingList)
})

readingListsRouter.put('/:id', middleware.userExtractor, middleware.readingListFinder, async (request, response) => {
  const user = request.user
  const readingList = request.readingList
  const body = request.body

  if (readingList) {
    if (readingList.userId !== user.id) {
      return response.status(401).json({ error: 'Invalid user' })
    }

    if (body.read === undefined) {
      throw new ValidationError('missing the "read" property')
    }

    readingList.read = body.read
    await readingList.save()
    response.json(readingList)
  } else {
    response.status(404).end()
  }
})

module.exports = readingListsRouter
