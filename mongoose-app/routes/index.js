'use strict';

var errors = require('./errors');
var login = require('./login');
var posts = require('./posts');

module.exports = function ( app ) {

    app.route('/')
        .get(function ( req, res ) {
            console.log('req.session', req.session);
            res.render('home.jade', req.session);
        });

    login( app );
    posts( app );
    errors( app );
};
