'use strict'
module.exports = function (sequelize, DataTypes) {
  var Questions = sequelize.define('Questions', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Questions.hasMany(models.Vote_Questions)
        Questions.belongsTo(models.Users)
      }
    }
  })
  return Questions
}
