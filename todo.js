const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const body_parser = require('body-parser');
const pgp = require('pg-promise')({});
const db = pgp({database: 'todoapp', user: 'postgres'});
app.use(express.static('public'));
app.use(body_parser.urlencoded({extended: false}));

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
    var dbInfo = db.query('SELECT * FROM task')
        .then(function() {
            console.log('completed');
        })
        .catch(function(err){
            console.error(err);
        });
    console.log("what is dbInfo?", dbInfo);
    var context = {
        title: "To Do List",
        content: "Here's a list of To Dos"
    };
    resp.render('todo.html', context);
});
app.post('/todos', function (req, resp) {
    //get the entered task and store into db
    var newTask = req.body.task;
    if(newTask) {
        db.result('INSERT INTO task (id, description, done) VALUES(default, $1, false)', newTask)
            .then(function(){
                console.log("task written to database");
            })
            .catch(function(err){
                console.error(err);
            });
    }
  //probably best to just do a redirect back to todos and 
  //add compute the todos page from that app handler
  resp.redirect('/todos');
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
