'use strict';

var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var PORT = 8888;

mongoose.connect('mongodb://localhost', function(err) {
    if (err) throw err;

    var app = express();
    app.use(bodyParser());
    routes(app);

    app.listen(PORT, function() {
        console.log('now listening on http://localhost:' + PORT);
    });
});
