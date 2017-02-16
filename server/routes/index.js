var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')
const questionController = require('../controllers/questions')
const answerController = require('../controllers/answers')
const voteAnswerController = require('../controllers/vote_answers')
const voteQuestionController = require('../controllers/vote_questions')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('index')
})

router.get('/auth', function (req, res, next) {
  res.send({
    endpoints: [
      '/auth/users/register',
      '/auth/users/login',
      '/auth/users',
      '/auth/users/:id'
    ]
  })
})

router.post('/auth/users/register', userController.createUser)

router.post('/auth/users/login', userController.verifyUser)

router.get('/auth/users', userController.getUsers)

router.put('/auth/users/:id', userController.updateUser)

router.delete('/auth/users/:id', userController.deleteUser)

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/questions',
      '/api/questions/:id'
    ]
  })
})

router.get('/api/questions', questionController.getQuestions)

router.post('/api/questions', questionController.createQuestion)

router.put('/api/questions/:id', questionController.updateQuestion)

router.delete('/api/questions/:id', questionController.deleteQuestion)

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/answers',
      '/api/answers/:id'
    ]
  })
})

router.get('/api/answers', answerController.getAnswers)

router.post('/api/answers', answerController.createAnswer)

router.put('/api/answers/:id', answerController.updateAnswer)

router.delete('/api/answers/:id', answerController.deleteAnswer)

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/votequestions',
      '/api/votequestions/:id'
    ]
  })
})

router.get('/api/votequestions', voteQuestionController.getVoteAnswers)

router.post('/api/votequestions', voteQuestionController.createVoteAnswer)

router.put('/api/votequestions/:id', voteQuestionController.updateVoteAnswer)

router.delete('/api/votequestions/:id', voteQuestionController.deleteVoteAnswer)

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/voteanswers',
      '/api/voteanswers/:id'
    ]
  })
})

router.get('/api/voteanswers', voteAnswerController.getVoteQuestions)

router.post('/api/voteanswers', voteAnswerController.createVoteQuestion)

router.put('/api/voteanswers/:id', voteAnswerController.updateVoteQuestion)

router.delete('/api/voteanswers/:id', voteAnswerController.deleteVoteQuestion)

module.exports = router
