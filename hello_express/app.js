var express = require('express')
var port = 8080
var app = express()
var consolidate = require('consolidate')
var MongoClient = require('mongodb').MongoClient
var Server = require('mongodb').Server

app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

var mongoClient = new MongoClient(new Server('localhost', 27017, { 'native_parser': true }))
var db = mongoClient.db('course')

app.get('/', function (req, res) {
	db.collection('hello_mongon_express').findOne({}, function (err, doc) {
		res.render('index', doc)
	})
})

app.get('*', function (req, res) {
	res.send('Sorry, the page does not exist!')
})

mongoClient.open(function (err, mongoclient) {
	if (err) throw err

	app.listen(port)
	console.log('Express app is listening on port: ' + port)
})
