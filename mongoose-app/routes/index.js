'use strict';

var errors = require('./errors');
var login = require('./login');

module.exports = function ( app ) {

    app.route('/')
        .get(function ( req, res ) {
            res.render('home.jade');
        });

    login(app);

    errors(app);
};
