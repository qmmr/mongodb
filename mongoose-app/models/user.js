'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validEmail = require('../helpers/validate/email');

var User = new Schema({
    _id: { type: String, lowercase: true, trim: true, validate: validEmail },
    name: { first: String, last: String },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    created: { type: Date, default: Date.now } // optional index: true
});

mongoose.model('User', User);
