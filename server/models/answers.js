'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answers = sequelize.define('Answers', {
    content: DataTypes.STRING,
    userid: DataTypes.NUMBER,
    questionid: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Answers;
};