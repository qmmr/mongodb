'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanstring');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function(app) {

    var invalid = function () {
        return false;
    };

    app.get('/signup', function(req, res) {
        res.render('signup.jade');
    });

    app.post('/signup', function ( req, res, next ) {
        var email = cleanString(req.param('email'));
        var password = cleanString(req.param('password'));

        if ( !(email && password) ) return invalid();

        User.findById(email, function ( err, user ) {
            if ( err ) return next( err );

            // check if the user was found
            if ( user )
                return res.render('signup.jade', { exists: true });

            crypto.randomBytes(16, function ( err, bytes ) {
                if ( err ) return next( err );

                var user = { _id: email };
                user.salt = bytes.toString('utf8');
                user.hash = hash(password, user.salt);

                User.create(user, function (err, newUser) {
                    if (err) {
                        if (err instanceof mongoose.Error.ValidationError) {
                            return invalid();
                        }
                        return next(err);
                    }

                    req.session.isLoggedIn = true;
                    req.session.user = email;
                    console.log('Created user: %s', email);
                    return res.redirect('/');
                });

            });
        });
    });

    app.get('/login', function ( req, res ) {
        res.render('login.jade');
    });

    app.post('/login', function (req, res, next) {
        // validate input
        var email = cleanString(req.param('email'));
        var password = cleanString(req.param('password'));

        if ( !(email && password))
            return invalid();

        // query mongodb
        User.findById(email, function (err, user) {
            if (err) return next(err);
            if (!user) return invalid();
            // check password
            if (user.hash !== hash(password, user.salt))
                return invalid();
            // everything is OK
            req.session.isLoggedIn = true;
            req.session.user = email;
            res.redirect('/');
        });
    });

};
