const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const currentYear = new Date().getFullYear()

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: currentYear,
      validate: {
        isValidYear(value) {
          if (!(1991 <= parseInt(value) && parseInt(value) <= currentYear)) {
            throw new Error(`Year must be an integer between 1991 and ${currentYear}.`)
          }
        }
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
  }
)

module.exports = Blog
