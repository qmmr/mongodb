'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var commentSchema = mongoose.Schema({
    post: { type: ObjectId, index: true },
    text: { type: String, trim: true },
    author: String,
    createdOn: { type: Date, default: Date.now }
});

var comment = mongoose.model( 'Comment', commentSchema );
