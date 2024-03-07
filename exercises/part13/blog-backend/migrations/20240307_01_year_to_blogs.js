const { DataTypes } = require('sequelize')

const currentYear = new Date().getFullYear()

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      defaultValue: currentYear,
      validate: {
        isValidYear(value) {
          if (!(1991 <= parseInt(value) && parseInt(value) <= currentYear)) {
            throw new Error(`Year must be an integer between 1991 and ${currentYear}.`)
          }
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}
