const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const body_parser = require('body-parser')
const pgp = require('pg-promise')({})
const db = pgp({database: 'todoapp', user: 'postgres'})
exports.db = db
app.use(express.static('public'))
app.use(body_parser.urlencoded({extended: false}))

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
})

app.get('/', function (req, resp) {
  var context = {
    title: 'Welcome',
    content: "WELCOME LET'S GET PRODUCTIVE!"
  }
  resp.render('index.html', context)
})

app.get('/todos', function (req, resp) {
  var dbInfo = db.query('SELECT * FROM task')
    .then(function (dbReturn) {
      var context = {
        title: 'To Do List',
        content: "Here's a list of To Dos",
        dbData: dbReturn
      }
      resp.render('todo.html', context)
    })
    .catch(function (err) {
      console.error(err)
    })
})
app.post('/todos', function (req, resp) {
  // get the entered task and store into db
  var newTask = req.body.task
  if (newTask) {
    db.result('INSERT INTO task (id, description, task_complete) VALUES(default, $1, false)', newTask)
      .then(function () {
        console.log('task written to database')
      })
      .catch(function (err) {
        console.error(err)
      })
  }
  // probably best to just do a redirect back to todos and
  // add compute the todos page from that app handler
  resp.redirect('/todos')
})

app.get('/todos/task_complete/:id', function (req, resp) {
  var id = req.params.id
  db.query('SELECT task_complete FROM task WHERE id=$1', [id])
    .then(function (state) {
      if (state[0]['task_complete']) {
        return db.none('UPDATE task SET task_complete = $1 WHERE id = $2', [false, id])
      } else {
        return db.none('UPDATE task SET task_complete = $1 WHERE id = $2', [true, id])
      }
    })
    .then(function () {
      console.log('updated database')
    })
    .catch(function (err) {
      console.error(err)
    })
  resp.redirect('/todos')
})

app.get('/todos/delete/:id', function (req, resp) {
  var id = req.params.id
  db.query('DELETE FROM task WHERE id=$1', [id])
    .then(function () {
      console.log('task deleted')
    })
    .catch(function (err) {
      console.error(err)
    })
  resp.redirect('/todos')
})

app.get('/todos/add', function (req, resp) {
  var context = {
    title: 'Add Item',
    content: "Here's a form to add an item."
  }
  resp.render('addToDo.html', context)
})

app.listen(8080, function () {
  console.log('Listening on port 8080')
})
