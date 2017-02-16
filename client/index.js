$(document).ready(function () {
  getQuestions()
  let userName = localStorage.getItem('Username')
  $('#nav-username').text('Username: ' + userName)
})

// $('.modal').modal()
let id_to_be_del = ''

function setIdDel (id) {
  id_to_be_del = id
  return id_to_be_del
}

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
    success: function () {
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

$('#add-question').click(function (e) {
  e.preventDefault()
  let titleVal = $('input[name=title_create]').val()
  let contentVal = $('input[name=content_create]').val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/questions',
    data: {title: titleVal, content: contentVal},
    success: function (resp) {
      for (var i = 0; i < resp.length; i++) {
        let questions = resp[i]
        $('#posts').append(
          `<tr>
            <td>Alvin</td>
            <td>Eclair</td>
          </tr>
          <div class="input-field col s12">
            <textarea rows="10" cols="50" type="text" name="question_content" id="question_content" class="materialize-textarea"></textarea>
            <label for="question_content">Textarea</label>
          </div>`
        )
      }
    },
    error: function (err) {
      console.log('CREATE Request Error')
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
        $('#posts').append(
          `<tr>
            <td>Alvin</td>
            <td>Eclair</td>
          </tr>
          <div class="input-field col s12">
            <textarea rows="10" cols="50" type="text" name="question_content" id="question_content" class="materialize-textarea"></textarea>
            <label for="question_content">Textarea</label>
          </div>`
        )
      }
    },
    error: function () {
      console.log('GET Response Error')
    }
  })
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
