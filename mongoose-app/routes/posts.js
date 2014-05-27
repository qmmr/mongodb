'use strict';

var loggedIn = require('../middleware/islogged');
var mongoose = require('mongoose');
require('../models/post');
var BlogPost = mongoose.model('BlogPost');

module.exports = function ( app ) {
    app.route('/post/:id')
        .get(function ( req, res, next ) {
            var query = BlogPost.findById( req.param('id') );
            // runs additional query to find the author of the post
            query.populate( 'author' );
            // run the query
            query.exec(function ( err, post ) {
                if ( err ) return next( err );
                if ( !post ) return next(); // 404
                res.render( 'post/view', { post: post } );
            });
        });

    app.route('/post/edit/:id')
        .get(loggedIn, function ( req, res, next ) {
            res.render('post/create', {
                post: BlogPost.findById( req.param('id') )
            });
        })
        .post(loggedIn, function ( req, res, next ) {
            BlogPost.edit(req, function ( err ) {
                if ( err ) return next( err );
                res.redirect( '/post/' + req.param('id') );
            });
        });

    app.route( '/post/remove/:id' )
        .get(loggedIn, function ( req, res, next ) {
            var id = req.param('id');

            BlogPost.findOne({ _id: id }, function ( err, post ) {
                if ( err ) return next( err );
                // check if user is author of the post
                if ( post.author !== req.session.user ) {
                    return res.send(403);
                }

                post.remove(function ( err ) {
                    if ( err ) return next( err );
                    // TODO: give information to the user
                    res.redirect('/');
                });
            });
        });

    app.route( '/post/create' )
        .get(loggedIn, function ( req, res ) {
            res.render( 'post/create' );
        })
        .post(loggedIn, function ( req, res, next ) {
            var title = req.param('title');
            var body = req.param('body');
            var user = req.session.user;

            BlogPost.create({
                title: title,
                body: body,
                author: user
            }, function ( err, post ) {
                if ( err ) return next( err );
                res.redirect( '/post/' + post.id );
            });
        });
};
