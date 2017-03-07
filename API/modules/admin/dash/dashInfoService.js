'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var Login = require('../../../models/Login');
var Statement = require('../../../models/Statement');
var ErrorStatement = require('../../../models/ErrorStatement');

var failure = require('../../../helper/response').failure;
var success = require('../../../helper/response').success;

var Http = require('../../../helper/http');

var locals = {};
var reqBody = {};
var reqParam = {};


function getStatistics(req, res, cb){
	locals = req;

	Q.fcall(get)
		.then(getParseCount)
		.spread(getUnparseCount)
		.spread(response)
		.then(function(output) {
			return cb(null, success('Successfully loaded dash info', Http.EVERYTHING_IS_OK, output));
		})
		.fail(function(reason) {
			return cb(failure(reason, Http.FORBIDDEN));
		})
		.done();

}

function get(){

	return Q(Login.count().exec());
}

function getParseCount(users){

return Q.all([users, Statement.count().exec()]);
}

function getUnparseCount(users,parsed){

return Q.all([users, parsed, ErrorStatement.count().exec()]);
}

function response(users, parsed, unparsed) {
	var response ={
		user_count : users,
		total_files : parsed + unparsed,
		parsed_count : parsed,
		unparsed_count : unparsed
	};

	return Q(response);
}

module.exports = {
	getStatistics: getStatistics
}


