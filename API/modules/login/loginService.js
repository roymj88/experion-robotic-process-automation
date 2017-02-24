'use strict';

var Q = require('q');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var config = require('../../config.json');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var Login = require('../../models/Login');

var failure = require('../../helper/response').failure;
var success = require('../../helper/response').success;

var Http = require('../../helper/http');

var locals = {};
var reqBody = {};
var reqParam = {};

function doLogin(req, res, cb) {

	// Use this global variable for another functions
	locals = req;

	Q.fcall(validate)
		.then(verifyUser)
        .then(authenticateUser)
        .then(generateToken)
		.then(function(output) {
			return cb(null, success('Login Successfully', Http.EVERYTHING_IS_OK, output ));
		})
		.fail(function(reason) {
			return cb(failure(reason, Http.FORBIDDEN));
		})
		.done();
}

function validate() {
	reqBody = locals.body;

	if (!reqBody.email)
		throw new Error('Name is required!');

	if (!reqBody.password)
		throw new Error('Password is required!');
}

function verifyUser() {
	var reqBody = locals.body;

	return Q(Login.findOne({ email : reqBody.email }).select().exec());
}

function authenticateUser(login) {
	if(!login || !login.email)
		throw new Error('Access is denied due to invalid credentials');

	var deferred = Q.defer();

	comparePassword(reqBody.password, login.password, function(err, isMatch) {
        if(err){
			deferred.reject(err); 
		} else {
			if(!isMatch)
				deferred.reject('Access is denied due to invalid credentials');
			else
	       		deferred.resolve(login);
	    }
    });

    return deferred.promise;
}

function comparePassword(userPassword, candidatePassword, cb) {
    bcrypt.compare(userPassword, candidatePassword, function(err, isMatch) {
        if (err) return cb(err);
            return cb(null, isMatch);
    });
};

function generateToken(login) {

	var token = jwt.sign({
		_id: login._id,
		time: new Date().getTime()
	}, config.security.secretKey);

	var op = {
		_id : login._id,
		email:login.email,
		name:login.name,
	    token:token
	};

	return Q(op);
}

module.exports = {
	doLogin: doLogin
};