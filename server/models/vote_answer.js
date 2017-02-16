'use strict'
module.exports = function (sequelize, DataTypes) {
  var Vote_Answer = sequelize.define('Vote_Answers', {
    answerid: DataTypes.INTEGER,
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
  return Vote_Answer
}
