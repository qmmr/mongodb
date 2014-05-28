'use strict';

var loggedIn = require('../middleware/islogged');
var mongoose = require('mongoose');
require('../models/post');
require('../models/comment');
var BlogPost = mongoose.model('BlogPost');
var Comment = mongoose.model('Comment');

module.exports = function ( app ) {
    app.route( '/post/comment/:id', loggedIn, function ( req, res, next ) {
        var id = req.param( 'id' );
        var text = req.param( 'text' );
        var author = req.session.author;

        Comment.create({
            post: id,
            text: text,
            author: author
        }, function ( err, comment ) {
            if ( err ) return next( err );
            // TODO: probably better to do this with xhr
            res.redirect( '/post/' + id );
        });
    });
};
