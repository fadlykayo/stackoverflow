const models = require('../models')

module.exports = {
  getVote_Questions: (req, res) => {
    models.Vote_Questions.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createVote_Question: (req, res) => {
    models.Vote_Questions.create({
      questionid: req.body.questionid,
      userid: req.body.userid,
      value: req.body.value
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteVote_Question: (req, res) => {
    models.Vote_Questions.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateVote_Question: (req, res) => {
    models.Vote_Questions.findById(req.params.id).then(function (vote) {
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
