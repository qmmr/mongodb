'use strict';

var mongoose = require('mongoose');
var blogSchema = mongoose.Schema({
    title: { type: String, trime: true },
    body: { type: String },
    author: { type: String, ref: 'User' },
    createdOn: { type: Date, default: Date.now }
});

blogSchema.statics.edit = function ( req, cb ) {
    var id = req.param( 'id' );
    var author = req.session.user;

    // validate that current user authored the post
    var query = { _id: id, author: author };
    var update = {
        title: req.param( 'title' ),
        body: req.param( 'body' )
    };

    this.update(query, update, function ( err, updatedDoc ) {
        if ( err ) return cb( err );
        if ( updatedDoc === 0 )
            return cb( new Error('no post to modify!') );
        cb();
    });
};

// implement later on real tweet via mongoose-lifecycle plugin
var lifecycle = require('mongoose-lifecycle');
blogSchema.plugin( lifecycle );

var Post = mongoose.model( 'BlogPost', blogSchema );
// handle events
Post.on('afterInsert', function ( post ) {
    // fake tweet this
    var url = 'http://localhost:8888/post/';
    console.log('Read my new blog post! %s%s', url, post.id);
});
