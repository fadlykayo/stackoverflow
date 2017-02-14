const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const UserSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserId'
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })
UserSchema.plugin(autoIncrement.plugin, 'Users')
module.exports = mongoose.model('Users', UserSchema)
