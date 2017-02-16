var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')
const questionController = require('../controllers/questions')
const answerController = require('../controllers/answers')
const voteAnswerController = require('../controllers/vote_answers')
const voteQuestionController = require('../controllers/vote_questions')
const sessionVerify = require('../helpers/auth.js')

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
      '/api/questions/:id',
      '/api/answers',
      '/api/answers/:id',
      '/api/voteanswers',
      '/api/voteanswers/:id',
      '/api/votequestions',
      '/api/votequestions/:id'
    ]
  })
})

// Questions

router.get('/api/questions', sessionVerify, questionController.getQuestions)

router.post('/api/questions', sessionVerify, questionController.createQuestion)

router.put('/api/questions/:id', sessionVerify, questionController.updateQuestion)

router.delete('/api/questions/:id', sessionVerify, questionController.deleteQuestion)

// Answers

router.get('/api/answers', sessionVerify, answerController.getAnswers)

router.post('/api/answers', sessionVerify, answerController.createAnswer)

router.put('/api/answers/:id', sessionVerify, answerController.updateAnswer)

router.delete('/api/answers/:id', sessionVerify, answerController.deleteAnswer)

// Vote Answers

router.get('/api/voteanswers', sessionVerify, voteAnswerController.getVoteAnswers)

router.post('/api/voteanswers', sessionVerify, voteAnswerController.createVoteAnswer)

router.put('/api/voteanswers/:id', sessionVerify, voteAnswerController.updateVoteAnswer)

router.delete('/api/voteanswers/:id', sessionVerify, voteAnswerController.deleteVoteAnswer)

// Vote Questions

router.get('/api/votequestions', sessionVerify, voteQuestionController.getVoteQuestions)

router.post('/api/votequestions', sessionVerify, voteQuestionController.createVoteQuestion)

router.put('/api/votequestions/:id', sessionVerify, voteQuestionController.updateVoteQuestion)

router.delete('/api/votequestions/:id', sessionVerify, voteQuestionController.deleteVoteQuestion)

module.exports = router
