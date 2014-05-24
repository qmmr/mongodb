var mongoose = require('mongoose');
var validEmail = require('../helpers/validate/email');

var schema = new mongoose.Schema({
    _id: { type: String, lowercase: true, trime: true, validate: validEmail },
    name: { first: String, last: String },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    created: { type: Date, default: Date.now } // optional index: true
});
