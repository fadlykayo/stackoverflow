const mongoose = require('mongoose')
const sequenceGenerator = require('mongoose-sequence-plugin')

const UserSchema = new mongoose.Schema({
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

UserSchema.plugin(sequenceGenerator, {
  field: 'UserId',
  startAt: '1'
})

module.exports = mongoose.model('Users', UserSchema)
