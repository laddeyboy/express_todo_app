var todo = require('../todo')
// This assert is the node.js built in assert library
// var assert = require('assert')
// this uses the chai assert library
var assert = require('chai').assert
var chai = require('chai')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Express To Do App Testing', function () {
  describe('Checking express routing', function () {
    it('responds to /', function (done) {
      chai.request('http://localhost:8080').get('/')
      done()
    })
    it('responds to /todos', function (done) {
      chai.request('http://localhost:8080').get('/todos')
      done()
    })
    it('responds to /todos/add', function (done) {
      chai.request('http://localhost:8080').get('/todos/add')
      done()
    })
  })
})
