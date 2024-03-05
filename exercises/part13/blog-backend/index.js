const app = require('./app')
const config = require('./utils/config')
const db = require('./utils/db')
const logger = require('./utils/logger')

const start = async () => {
  await db.connectToDatabase()
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}

start()
