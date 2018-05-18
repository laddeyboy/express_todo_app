var express = require('express');
var app = express();
var nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.get('/', function(req, resp) {
    var context = {
        title: "Welcome",
        content: "WELCOME LET'S GET PRODUCTIVE!"
    };
    resp.render('index.html', context);
});

app.get('/todos', function(req, resp) {
    var context = {
        title: "To Do List",
        content: "Here's a list of To Dos"
    };
        resp.render('todo.html', context);
});

app.get('/todos/add', function(req, resp) {
    var context = {
        title: "Add Item",
        content: "Here's a form to add an item."
    };
        resp.render('addToDo.html', context);
});

app.get('/todo/done/:id', function(req, resp) {
    var id = req.params.id;
    resp.render(`Mark this To Do item ${id} is completed`);
});


app.listen(8080, function () {
  console.log('Listening on port 8000');
});