var mongoose = require('mongoose')
var express = require('express')
var routes = require('./routes')
var PORT = 8888;

mongoose.connect('mongodb://localhost', function ( err ) {
    if (err) throw err

    var app = express();
    routes( app );

    app.listen(PORT, function ( req, res ) {
        console.log( 'now listening on http://localhost:' + PORT );
    })
})
