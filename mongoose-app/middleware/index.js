'use strict';

var express = require('express');

module.exports = function ( app ) {

    app.use(express.logger('dev'));

    // this is simple solution, consider using connect-mongo
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'mongoose' }));
    app.use(express.bodyParser());

    // expose session to views
    app.use(function ( req, res, next ) {
        // anything we set on locals is available in views
        res.locals.session = req.session;
        next();
    });
};
