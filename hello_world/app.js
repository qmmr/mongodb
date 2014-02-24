var http = require('http')
var express = require('express')
var cons = require('consolidate')
var mongodb = require('mongodb')

var server = http.createServer(function (req, res) {
	res.writeHead(200, { "Content-type": "text/plain" })
	res.end('Hello, World!')
})

server.listen(8000)

console.log('Running localhost:8000')
