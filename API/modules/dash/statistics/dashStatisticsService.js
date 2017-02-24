'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var errorStatement = require('../../../models/ErrorStatement');
var statement = require('../../../models/Statement');

var failure = require('../../../helper/response').failure;
var success = require('../../../helper/response').success;

var Http = require('../../../helper/http');

var locals = {};
var reqBody = {};
var reqParam = {};


var getStatistics = (req, res, cb) =>{
	locals = req;
	reqParam = locals.params;
	Q.fcall(getParseCount)
		.then(getUnparseCount)
		.spread(response)
		.then(function(output) {
			return cb(null, success('Successfully loaded invoice statistics', Http.EVERYTHING_IS_OK, output));
		})
		.fail(function(reason) {
			return cb(failure(reason, Http.FORBIDDEN));
		})
		.done();
}

function getParseCount(){

return Q(statement.count({'username': locals.params.username}).exec());
}

function getUnparseCount(parsed){

return Q.all([parsed, errorStatement.count({'username': locals.params.username}).exec()]);
}

function response(parsed, unparsed) {
	var response = [];
		response.push({
			parsed_count : parsed,
			unparsed_count : unparsed
		});


	return Q(response);
}

module.exports = {
	getStatistics
}