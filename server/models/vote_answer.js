'use strict'
module.exports = function (sequelize, DataTypes) {
  var Vote_Answers = sequelize.define('Vote_Answers', {
    answerid: DataTypes.INTEGER,
    questionid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Vote_Answers.belongsTo(models.Questions)
        Vote_Answers.belongsTo(models.Users)
        Vote_Answers.belongsTo(models.Answers)
      }
    }
  })
  return Vote_Answers
}
