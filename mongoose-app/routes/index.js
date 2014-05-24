var errors = require('./errors');
var login = require('./login');

module.exports = function ( app ) {

    app.get('/', function ( req, res ) {
        res.render('home.jade')
    });

    login( app );

    errors( app );
}
