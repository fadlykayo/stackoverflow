'use strict';
module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define('Questions', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userid: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Questions;
};