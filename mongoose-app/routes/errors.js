module.exports = function ( app ) {
    // 404s
    app.use(function ( req, resp, next ) {
        var errorText = 'I am sorry, there is no such page...'
        resp.status(404)

        if ( req.accepts('html') ) {
            return resp.send( '<h2>' + errorText + '</h2>' )
        }

        if ( req.accepts('json') ) {
            return resp.json( { error: 'Not found' } )
        }

        // default
        resp.type( 'txt' )
        resp.send( errorText )
    })

    // 500s
    app.use(function ( err, req, resp, next ) {
        console.error('error at %s\n', req.url, err)
        resp.send(500, 'Ooops, our highly trained monkeys are looking at this problem!')
    })
}
