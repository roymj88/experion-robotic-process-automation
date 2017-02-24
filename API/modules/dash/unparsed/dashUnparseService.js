'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var errorStatement = require('../../../models/ErrorStatement');

var failure = require('../../../helper/response').failure;
var success = require('../../../helper/response').success;

var Http = require('../../../helper/http');

var locals = {};
var reqBody = {};
var reqParam = {};

function getDetails(req, res, cb) {
	
	//If you want to get a query parameter ?tagId=5, then use req.query

	locals = req;
	reqParam = locals.query;
 	
	Q.fcall(get)
		.then(response)
		.then(function(output) {
			return cb(null, success('Successfully loaded unparsed invoice details', Http.EVERYTHING_IS_OK, output));
		})
		.fail(function(reason) {
			return cb(failure(reason, Http.FORBIDDEN));
		})
		.done();
}

function get() {
	return Q(errorStatement.find({'username': locals.query.username}).select().exec());
}

function response(result) {
	var response = [];
	console.log('result--', result);
	result.forEach(function(errorStatement){
		response.push({
			message : errorStatement.message,
			unparsed_file : errorStatement.unparsed_file,
			file_name : errorStatement.file_name,
			processed_date : errorStatement.processed_date
		});
	});

	return Q(response);
}

module.exports = {
	getDetails: getDetails
};