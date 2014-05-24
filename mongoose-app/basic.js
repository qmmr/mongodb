'use strict';
var mongoose = require('mongoose');
var express = require('express');

mongoose.connect('mongodb://localhost', function ( err ) {
	if (err) throw err;

	console.log('connected to mongodb!');

	var app = express();
	app.get('/', function ( req, res ) {
		res.send(200, 'hello from mongoose!');
	});

	app.listen(3000, function () {
		console.log('App is listening! localhost:3000');
	});
});
