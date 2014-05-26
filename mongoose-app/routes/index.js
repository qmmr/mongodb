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
                res.render('home.jade', { posts: posts });
            });
        });

    login( app );
    posts( app );
    errors( app );
};
