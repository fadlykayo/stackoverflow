'use strict'
module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Users.hasMany(models.Questions, {foreignKey: 'userid'})
        Users.hasMany(models.Answers, {foreignKey: 'userid'})
        Users.hasMany(models.Vote_Questions, {foreignKey: 'userid'})
        Users.hasMany(models.Vote_Answers, {foreignKey: 'userid'})
      }
    }
  })
  return Users
}
