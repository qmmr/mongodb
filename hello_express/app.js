var express = require('express')
var port = 8080
var app = express()

app.get('/', function (req, res) {
	res.send('Hello from express!')
})

app.get('*', function (req, res) {
	res.send('Sorry, the page does not exist!')
})

app.listen(port)
console.log('Express app is listening on port: ' + port)
