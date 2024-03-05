const Sequelize = require('sequelize')
const config = require('./config')
const logger = require('./logger')

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: function (log) {
    if (!log.includes('SELECT 1+1 AS result')) {
      logger.info(log)
    }
  }
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    logger.info('connected to the database')
  } catch (err) {
    logger.info('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }
