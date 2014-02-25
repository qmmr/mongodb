var express = require('express')
var port = 8080
var app = express()
var consolidate = require('consolidate')
var MongoClient = require('mongodb').MongoClient
var Server = require('mongodb').Server

// Handler for internal server errors
function errorHandler (err, req, res, next) {
	console.error(err.message)
	console.error(err.stack)
	res.status(500)
	res.render('error_template', { error: err })
}

app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

var mongoClient = new MongoClient(new Server('localhost', 27017, { 'native_parser': true }))
var db = mongoClient.db('course')

app.use(errorHandler)
app.get('/', function (req, res) {
	db.collection('users').findOne({}, function (err, doc) {
		res.render('index', doc)
	})
})
app.get('/:name', function (req, res, next) {
	var name = req.params.name
	var getVar = req.query.getVar
	res.render('hello', { name: name, getVar: getVar })
})

app.get('*', function (req, res) {
	res.send('Sorry, the page does not exist!')
})

mongoClient.open(function (err, mongoclient) {
	if (err) throw err

	app.listen(port)
	console.log('Express app is listening on port: ' + port)
})
