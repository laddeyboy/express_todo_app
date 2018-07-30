# express_todo_app
[![Build Status](https://travis-ci.org/laddeyboy/express_todo_app.svg?branch=master)](https://travis-ci.org/laddeyboy/express_todo_app)
 
###Live Demo
###Video of App (Optional)
###Contents
⋅⋅*App functionality (what it is/does)
⋅⋅*Built With (what languages/libraries were used)
⋅⋅*Challenges & Solutions
⋅⋅*MVP
⋅⋅*Stretch Goals
⋅⋅*Screenshots
⋅⋅*GitHub Link
⋅⋅*Code Examples
⋅⋅*Testing (library like chai or mocha/examples)

###App functionality (what it is/does)
###Built With (what languages/libraries were used)
⋅⋅*JavaScript
⋅⋅*Express.js
⋅⋅*HTML5
⋅⋅*CSS3
⋅⋅*PostgreSQL.  App uses one table 'task', run todoDBSetup.sql to setup 'task' schema.
###Challenges & Solutions
1) Cloning this repo and running locally with VSCode.
    This todo app was originally written on AWS with a connected database and tables.  However, after cloning this repo to work locally with VSCode I forget to factor
    the database connection and received an error.
    SOLUTION: Ensure that a database with the correct todo app name is created, setup and available before attempting to use this app locally.
2) When a task is marked completed or unmarked.  The whole list is reordered instead of staying         statically ordered.
    SOLUTION: This has not been resolved yet.

###MVP
--The basic goal for this app was to create a todo app that allows the user to enter a task into a webform.  The task would then be written to the Postgres database and then display on a ToDo List page.  Each task would have two options.  1) The task can be deleted, which will delete the task from the database and remove from the ToDo list.  2) The task can be toggled between a complete or an uncomplete state.
###Stretch Goals
⋅⋅*Allow for user login
⋅⋅*Allow for a "Completed Tasks" list.  Move completed tasks to the "Completed Task" Page.
###Screenshots
###GitHub Link
https://github.com/laddeyboy/express_todo_app
###Code Examples
###Testing (library like chai or mocha/examples)