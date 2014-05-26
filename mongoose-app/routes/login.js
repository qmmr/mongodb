/* global crypto:true */
'use strict';

var mongoose = require('mongoose');
require('../models/user');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanstring');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function ( app ) {

    var invalid = function ( res, type ) {
        return res.render(type, { invalid: !0 });
    };

    app.route('/signup')
        .get(function ( req, res ) {
            res.render('signup');
        })
        .post(function ( req, res, next ) {
            var email = cleanString(req.param('email'));
            var password = cleanString(req.param('password'));

            if (!(email && password)) return invalid(res, 'signup');

            User.findById(email, function ( err, user ) {
                if (err) return next(err);

                // check if the user was found
                if (user) return res.render('signup.jade', { exists: true });

                crypto.randomBytes(16, function ( err, bytes ) {
                    if (err) return next(err);

                    var user = { _id: email };
                    user.salt = bytes.toString('utf8');
                    user.hash = hash(password, user.salt);

                    User.create(user, function ( err, newUser ) {
                        if (err) {
                            if (err instanceof mongoose.Error.ValidationError) {
                                return invalid(res, 'signup');
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

    app.route('/login')
        .get(function ( req, res ) {
            // console.log('/login req.session', req.session)
            res.render('login.jade', req.session);
        })
        .post(function ( req, res, next ) {
            // validate input
            var email = cleanString(req.param('email'));
            var password = cleanString(req.param('password'));
            if (!(email && password)) return invalid(res, 'login');

            // query mongodb
            User.findById(email, function ( err, user ) {
                if (err) return next(err);
                if (!user) return invalid(res, 'login');

                // check password
                if (user.hash !== hash(password, user.salt)) return invalid(res, 'login');
                // everything is OK
                req.session.isLoggedIn = true;
                req.session.user = email;
                // console.log('req.session', req.session);
                return res.redirect('/');
            });
        });
};
