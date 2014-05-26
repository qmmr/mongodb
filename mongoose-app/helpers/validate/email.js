'use strict';

module.exports = function ( email ) {
    var re = /[a-z0-9-_.]+@[a-z0-9-_.]+\.[a-z0-9-_.]{2,3}/i;
    return re.test( email );
};
