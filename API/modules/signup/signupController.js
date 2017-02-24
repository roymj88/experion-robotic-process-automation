'use strict';

var signupService = require('./signupService') 

function DoSignUp(req, res, next) {
    signupService.doSignUp(req, res, function(err, response){
        if(err) {
            return res.json(err)
        } else {
            return res.json(response)
        }
    });
}


module.exports = {
    DoSignUp: DoSignUp
}