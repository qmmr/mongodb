'use strict';

var mongoose = require('mongoose');
var blogSchema = mongoose.Schema({
    title: { type: String, trime: true },
    body: { type: String },
    author: { type: String, ref: 'User' },
    createdOn: { type: Date, default: Date.now }
});

// implement later on real tweet via mongoose-lifecycle plugin
var lifecycle = require('mongoose-lifecycle');
blogSchema.plugin( lifecycle );

var Post = mongoose.model( 'BlogPost', blogSchema );
// handle events
Post.on('afterInsert', function ( post ) {
    // fake tweet this
    var url = 'http://localhost:8888/posts/';
    console.log('Read my new blog post! %s%s', url, post.id);
});
