var mongoose = require('mongoose')
var express = require('express')
var routes = require('./routes')

mongoose.connect('mongodb://localhost', function ( err ) {
    if (err) throw err
    var app = express()
    routes(app)

    app.listen(3000, function ( req, resp ) {
        console.log('now listening on http://localhost:3000')
    })
})
