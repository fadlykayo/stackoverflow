'use strict'
module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answers', {
    content: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    questionid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return Answer
}
