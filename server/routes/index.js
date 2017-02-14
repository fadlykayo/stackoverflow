var express = require('express')
var router = express.Router()
let userController = require('../controllers/users')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('index')
})

router.get('/auth', userController.getUsers)

router.post('/auth', userController.createUser)

router.delete('/auth/:id', userController.deleteUser)

router.put('/auth/:id', userController.updateUser)

module.exports = router
