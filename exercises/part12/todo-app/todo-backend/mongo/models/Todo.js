const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
})
todoSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Todo', todoSchema)
