var id_to_be_del = ''

$(document).ready(function () {
  $('.modal').modal()
})

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
      console.log(resp)
      if (resp.token) {
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

function getArticles () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/articles',
    success: function (resp) {
      for (var i = 0; i < resp.length; i++) {
        let article = resp[i]
        $('#posts').append(
          `<div id="card_${article._id}" class="col s4 m4">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <h1 id="title-${i+1}" class="card-title">${article.title}</h1>
                <p id="content-${i+1}">${article.content}</p>
              </div>
              <div class="card-action" style="display: flex; justify-content: space-around;">
                <a class="btn" id="update-${i+1}" href="/update/${article._id}">Update</a>
                <button id="delete-${i+1}" class="btn" data-target="modal1" onclick="setIdDel('${article._id}')">Delete</button>
              </div>
            </div>
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
