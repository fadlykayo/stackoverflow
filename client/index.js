$(document).ready(function () {
  getQuestions()
  let userName = localStorage.getItem('Username')
  $('#nav-username').text('Username: ' + userName)
})

$('#login-form').on('submit', (e) => {
  e.preventDefault()
  let usernameVal = $('input[name=username]').val()
  let passwordVal = $('input[name=password]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/users/login',
    data: {username: usernameVal, password: passwordVal},
    success: function (resp) {
      if (resp.token) {
        localStorage.setItem('Authorization', resp.token)
        localStorage.setItem('Username', usernameVal)
        localStorage.setItem('UserId', resp.id)
        window.location.assign('http://localhost:8080/home.html')
      }else {
        window.location.assign('http://localhost:8080/index.html')
      }
    },
    error: function (err) {
      console.log('LOGIN Request Error')
      window.location.assign('http://localhost:8080/index.html')
    }
  })
})

$('#register-form').on('submit', (e) => {
  e.preventDefault()
  let usernameVal = $('input[name=username_reg]').val()
  let passwordVal = $('input[name=password_reg]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/auth/users/register',
    data: {username: usernameVal, password: passwordVal},
    success: function (resp) {
      window.location.assign('http://localhost:8080/index.html')
    },
    error: function (err) {
      console.log('REGISTER Request Error')
      window.location.assign('http://localhost:8080/index.html')
    }
  })
})

$('#logout').click(function () {
  window.localStorage.clear()
  window.location.assign('http://localhost:8080/index.html')
})

$('#add-question').click(function () {
  let titleVal = $('input[name=title_create]').val()
  let contentVal = $('textarea[name=content_create]').val()
  let idVal = localStorage.getItem('UserId')
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/questions',
    data: {title: titleVal, content: contentVal, userid: idVal},
    success: function (resp) {
      $('input[name=title_create]').val('')
      $('textarea[name=content_create]').val('')
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/votequestions',
        data: {questionid: resp.id, value: 0},
        success: function () {
          getQuestions()
        },
        error: function (err) {
          console.log('CREATE Vote Questions Request Error')
        }
      })
    },
    error: function (err) {
      console.log('CREATE Questions Request Error')
    }
  })
})

function getQuestions () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/questions',
    success: function (resp) {
      for (var i = 0; i < resp.length; i++) {
        let questions = resp[i]
        let length = (questions.Vote_Questions.length) - 1
        let vote = questions.Vote_Questions[length].value
        let voteId = questions.Vote_Questions[length].id
        $('#posts').append(
          `<tr id="question-${i+1}">
            <td>${vote}</td>
            <td>${questions.title}</td>
            <td>User ID: ${questions.userid}</td>
            <td style="max-width:50%"><button type="button" class="waves-effect waves-light btn cyan darken-3" onclick="" style="padding: 0px 8px;">Reply</button> <button type="button" class="waves-effect waves-light btn light-blue darken-3" onclick="upVote(${questions.id}, ${vote}, ${voteId}, ${i+1})" style="padding: 0px 8px;">Upvote</button> <button type="button" class="waves-effect waves-light btn red darken-4" onclick="downVote(${questions.id}, ${vote}, ${voteId})" style="padding: 0px 8px;">Downvote</button></td>
          </tr>`
        )
        $('#posts-content').append(
          `<div name="question_content" style="height: 200px; padding:10px; margin: 10px 0px; border-radius: 4px; border: 1px solid grey;">${questions.content}</div>`
        )
      }
    },
    error: function () {
      console.log('GET Questions Response Error')
    }
  })
}

function upVote (id, vote, voteId, i) {
  let idVal = localStorage.getItem('UserId')
  let up = vote++
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/votequestions/${voteId}`,
    data: {
      questionid: id,
      userid: idVal,
      value: up
    },
    success: function (resp) {
      console.log(resp.value)
      $(`#question-${i} td[0]`).innerHTML = resp.value
    },
    error: function (err) {
      console.log('CREATE Vote Questions Request Error')
    }
  })
}

function downVote (id, vote, voteId) {
  let idVal = localStorage.getItem('UserId')
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/votequestions/${voteId}`,
    data: {
      questionid: id,
      userid: idVal,
      value: vote--
    },
    success: function (resp) {},
    error: function (err) {
      console.log('CREATE Vote Questions Request Error')
    }
  })
}

// $('.modal').modal()
let id_to_be_del = ''

function setIdDel (id) {
  id_to_be_del = id
  return id_to_be_del
}

function deleteArticle () {
  $.ajax({
    type: 'DELETE',
    url: `http://localhost:3000/api/articles/${id_to_be_del}`,
    success: function (resp) {
      $(`#card_${id_to_be_del}`).remove()
    },
    error: function () {
      console.log('DELETE Response Error')
    }
  })
}
