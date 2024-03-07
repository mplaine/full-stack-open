const readingListsRouter = require('express').Router()
const { ReadingList } = require('../models')

readingListsRouter.post('/', async (request, response) => {
  const body = request.body
  const readingList = await ReadingList.create(body)
  response.status(201).json(readingList)
})

module.exports = readingListsRouter
