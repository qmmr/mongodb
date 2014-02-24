var express = require('express')
var port = 8080
var app = express()
var consolidate = require('consolidate')

app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.get('/', function (req, res) {
	res.render('index', { 'name': 'Swig' })
})

app.get('*', function (req, res) {
	res.send('Sorry, the page does not exist!')
})

app.listen(port)
console.log('Express app is listening on port: ' + port)
