const models = require('../models')
let jwt = require('jsonwebtoken')
let hash = require('password-hash')
let config = require('../config/config.json')

module.exports = {
  getUsers: (req, res) => {
    models.Users.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createUser: (req, res) => {
    models.Users.create({
      username: req.body.username,
      password: req.body.password
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUser: (req, res) => {
    models.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateUser: (req, res) => {
    models.Users.findById(req.params.id).then(function (user) {
      user.update({
        username: req.body.username,
        password: req.body.password
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  },
  verifyUser: (req, res) => {
    models.Users.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (data) {
      if (hash.verify(req.body.password, data.password)) {
        let token = jwt.sign({data}, config.secret, {algorithm: 'HS256'}, {expiresIn: '1h'})
        req.session.isLogin = true
        res.send({
          s: true,
          token: token
        })
      } else {
        res.send({s: false, m: 'Authentication failed. Wrong password.'})
      }
    }).catch(function () {
      res.send({s: false, m: 'Authentication failed. User not found.'})
    })
  }
}
