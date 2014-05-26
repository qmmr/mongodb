'use strict';

var loggedIn = require('../middleware/islogged');

module.exports = function( app ) {
    app.route('/post')
        .get(loggedIn, function ( req, res ) {
            res.render('posts/create');
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
                res.redirect('/post/' + post.id);
            });
        });
};
