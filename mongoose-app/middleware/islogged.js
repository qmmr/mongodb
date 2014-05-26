'use strict';

module.exports = function ( req, res, next ) {
    if ( !(req.session && req.session.user) )
        res.redirect('/login');
    next();
};
