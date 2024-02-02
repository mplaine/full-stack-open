const express = require('express')
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router()

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const added_todos = (await getAsync('added_todos')) || 0
  await setAsync('added_todos', Number(added_todos) + 1)
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo)
})

router.get('/statistics', async (req, res) => {
  const added_todos = (await getAsync('added_todos')) || 0
  const statistics = {
    added_todos: Number(added_todos)
  }
  res.json(statistics)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
})

singleRouter.put('/', async (req, res) => {
  const todo = new Todo(req.body)
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, todo, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  if (updatedTodo) {
    res.json(updatedTodo)
  } else {
    res.status(404).end()
  }
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
