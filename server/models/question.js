'use strict'
module.exports = function (sequelize, DataTypes) {
  var Question = sequelize.define('Questions', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return Question
}
