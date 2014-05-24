'use strict';

module.exports = function ( app ) {
    // 404s
    app.use(function ( req, res, next ) {
        var errorText = 'I am sorry, there is no such page...';
        res.status(404);

        if ( req.accepts('html') )
            return res.send( '<h2>' + errorText + '</h2>' );

        if ( req.accepts('json') )
            return res.json( { error: 'Not found' } );

        // default
        res.type( 'txt' );
        res.send( errorText );
    });

    // 500s
    app.use(function ( err, req, res, next ) {
        console.error('error at %s\n', req.url, err);
        res.send(500, 'Ooops, our highly trained monkeys are looking at this problem!');
    });
};
