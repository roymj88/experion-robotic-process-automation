'use strict'

var Q = require('q');
var jwt = require('jsonwebtoken');

var Login  = require('./../../models/Login')
var failure = require('../../helper/response').failure;
var success = require('../../helper/response').success;

var Http = require('../../helper/http');

var locals = {};
var reqBody = {};
var reqParam = {};

function doSignUp(req, res, cb) {
    locals = req;

    Q.fcall(validate)
        .then(saveUser)
        .then(function(output) {
            return cb(null, success('Successfully Registered'), Http.EVERYTHING_IS_OK)
        })
        .fail(function(reasone){
            return cb(failure(reasone), Http.FORBIDDEN)
        })
        .done()
}

function validate() {
    reqBody = locals.body;

    if(!reqBody.username) 
        throw new Error('Name is required')
    
    if(!reqBody.email)
        throw new Error('Email is required')

    if(!reqBody.password)
        throw new Error('Password is required')

    if(!reqBody.emailPassword)
        throw new Error('Password for email is required')
}

function saveUser() {
    reqBody = locals.body

    var login = new Login();
    login.username = reqBody.username;
    login.email = reqBody.email;
    login.password = reqBody.password;
    login.emailPassword = reqBody.emailPassword;
console.log("hello");
    return Q(login.save())
}

module.exports = {
    doSignUp: doSignUp
}