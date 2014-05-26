'use strict';

var errors = require('./errors');
var login = require('./login');

module.exports = function ( app ) {

    app.route('/')
        .get(function ( req, res ) {
            console.log('req.session', req.session);
            res.render('home.jade', req.session);
        });

    login(app);

    errors(app);
};
