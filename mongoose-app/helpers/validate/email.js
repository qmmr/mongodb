'use strict';

module.exports = function ( email ) {
    var re = /[a-z0-9-_.]+@[a-z0-9]\.[a-z0-9]{3,4}$/i;
    return re.test( email );
};
