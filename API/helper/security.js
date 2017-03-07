'use strict';

var jwt = require('jsonwebtoken');
var failure = require('./response').failure;
var HTTP = require('./http');
var config = require('../config.json');

var Login = require('./../models/Login');

// Verify api call
module.exports.auth = function(req, res, next) {
    var bearerToken = req.headers.authorization;
    if (!bearerToken)
        return res.json(failure('Invalid Authentication Token', HTTP.FORBIDDEN));

    var bearer = bearerToken.split(' ')[0].toLowerCase();
    var token = bearerToken.split(' ')[1];

    if (bearer != 'bearer' || !token)
        return res.json(failure('Invalid Authentication Token', HTTP.FORBIDDEN));

    // verifies secret and checks exp
    jwt.verify(token, config.security.secretKey, function(err, decoded) {
        if (err) {
            return res.json(failure('Invalid Authentication Token', HTTP.FORBIDDEN));
        } else {
            Login.findById(decoded._id).exec().then(function(user) {
                if (!user)
                    return res.json(failure('We cannot authenticate the admin with this token!', HTTP.FORBIDDEN));
        
                req.user = {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                };
                next();
            });
        }
    });
};

