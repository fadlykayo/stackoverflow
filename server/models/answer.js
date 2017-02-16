'use strict'
module.exports = function (sequelize, DataTypes) {
  var Answers = sequelize.define('Answers', {
    content: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    questionid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Answers.hasMany(models.Vote_Answers)
        Answers.belongsTo(models.Users)
      }
    }
  })
  return Answers
}
