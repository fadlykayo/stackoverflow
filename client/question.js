function getUrlParameter (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

$(document).ready(function () {
  getQuestionContent()
  getAnswers()
  let userName = localStorage.getItem('Username')
  $('#nav-username').text('Username: ' + userName)
})

function getQuestionContent () {
  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/api/questions/${getUrlParameter('id')}`,
    success: function (response) {
      $('#question-title').text(response.title)
      $('#question-content').text(response.content)
    },
    error: function () {
      console.log('GET Question Content Response Error')
    }
  })
}

function addAnswer () {
  let contentVal = $('textarea[name=content_reply]').val()
  let userId = localStorage.getItem('UserId')
  $('#answers-list').empty()
  $.ajax({
    type: 'POST',
    url: `http://localhost:3000/api/answers`,
    data: {
      content: contentVal,
      userid: userId,
      questionid: `${getUrlParameter('id')}`
    },
    success: function (resp) {
      $('textarea[name=content_reply]').val('')
      getAnswers()
    },
    error: function () {
      console.log('POST Add Answer Response Error')
    }
  })
}

function getAnswers () {
  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/api/answers/${getUrlParameter('id')}`,
    success: function (response) {
      let answersList = ''
      for (var i = 0; i < response.length; i++) {
        let answers = response[i]
        // let vote = answers.Vote_Answers[0].value
        // let voteId = answers.Vote_Answers[0].id
        answersList +=
          `<hr>
        <div>
          <p>${answers.content}</p>
          <small><span>answered by anon </span><span>just now</span></small>
        </div>
        <br>
        <button onclick="" type="button" class="btn light-green darken-3" style="padding: 0px 8px;">Upvote</button> <button type="button" class="btn red darken-4" onclick="" style="padding: 0px 8px;">Downvote</button>
        <br>
        <br>`
      }
      $('#answers-list').append(answersList)
    },
    error: function () {
      console.log('GET Answers Response Error')
    }
  })
}

function upVote (questId, voteValue, voteId, i) {
  let userId = localStorage.getItem('UserId')
  voteValue++
  $('#answers-list').empty()
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/votequestions/${voteId}`,
    data: {
      questionid: questId,
      userid: userId,
      value: voteValue
    },
    success: function (resp) {
      getAnswers()
    },
    error: function (err) {
      console.log('PUT Up Vote Answers Request Error')
    }
  })
}

function downVote (questId, voteValue, voteId, i) {
  let userId = localStorage.getItem('UserId')
  if (voteValue === 0) {
    voteValue
  }else {
    voteValue--
  }
  $('#answers-list').empty()
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/votequestions/${voteId}`,
    data: {
      questionid: questId,
      userid: userId,
      value: voteValue
    },
    success: function (resp) {
      getAnswers()
    },
    error: function (err) {
      console.log('PUT Down Vote Answers Request Error')
    }
  })
}
