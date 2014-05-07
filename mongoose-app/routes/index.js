var errors = require('./errors')
module.exports = function ( app ) {
    app.get('/', function ( req, resp ) {
        resp.render('home.jade')
    })

    errors( app );
}
