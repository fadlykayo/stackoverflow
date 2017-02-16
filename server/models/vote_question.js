'use strict'
module.exports = function (sequelize, DataTypes) {
  var Vote_Question = sequelize.define('Vote_Questions', {
    questionid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return Vote_Question
}
