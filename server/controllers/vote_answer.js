const models = require('../models')

module.exports = {
  getVote_Answers: (req, res) => {
    models.Vote_Answers.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createVote_Answer: (req, res) => {
    models.Vote_Answers.create({
      answerid: req.body.answerid,
      questionid: req.body.questionid,
      userid: req.body.userid,
      value: req.body.value
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteVote_Answer: (req, res) => {
    models.Vote_Answers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateVote_Answer: (req, res) => {
    models.Vote_Answers.findById(req.params.id).then(function (vote) {
      vote.update({
        value: req.body.value
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
