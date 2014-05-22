var errors = require('./errors')

module.exports = function ( app ) {

    app.get('/', function ( req, resp ) {
        resp.render('home.jade')
    });

    app.get('/login', function ( req, resp ) {
        resp.render('login.jade');
    });

    app.get('/signup', function ( req, resp ) {
        resp.render('signup.jade');
    });

    errors( app );
}
