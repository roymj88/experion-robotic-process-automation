
'use strict';

module.exports.failure = function(message, code) {
    return ({
        status: 0,
        message: message.toString(),
        code: code,
        data: null
    });
};

module.exports.success = function(message, code, results) {
    return ({
        status: 1,
        message: message,
        code: code,
        data: results
    });
};
