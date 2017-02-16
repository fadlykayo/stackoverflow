'use strict'
module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Users.hasMany(models.Questions)
        Users.hasMany(models.Answers)
        Users.hasMany(models.Vote_Questions)
        Users.hasMany(models.Vote_Answers)
      }
    }
  })
  return Users
}
