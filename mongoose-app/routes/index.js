'use strict';

var mongoose = require('mongoose');
require('../models/post');
var BlogPost = mongoose.model('BlogPost');
var errors = require('./errors');
var login = require('./login');
var posts = require('./posts');

module.exports = function ( app ) {
    app.route('/')
        .get(function ( req, res ) {
            BlogPost.find().sort('createdOn').limit(10).exec(function ( err, posts ) {
                if ( err ) throw new Error( err );

                res.render('home.jade', { posts: posts, user: req.session.user });
            });
        });

    login( app );
    posts( app );
    errors( app );
};
