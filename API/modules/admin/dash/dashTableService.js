'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var Statement = require('../../../models/Statement');
var ErrorStatement = require('../../../models/ErrorStatement');

var failure = require('../../../helper/response').failure;
var success = require('../../../helper/response').success;

var Http = require('../../../helper/http');

var locals = {};
var reqBody = {};
var reqParam = {};

var _ = require('lodash');

function getDetails(req, res, cb) {
	locals = req;
	Q.fcall(getStatements)
		.then(getErrorStatements)
		.spread(response)
		.then(function(output) {
			return cb(null, success('Successfully loaded dash table', Http.EVERYTHING_IS_OK, output));
		})
		.fail(function(reason) {
			return cb(failure(reason, Http.FORBIDDEN));
		})
		.done();
}
function getStatements(){
	var limit = typeof locals.params.limit !== 'undefined' ? parseInt(locals.params.limit) : 0;
	return Q(Statement.find().select().limit(limit).exec());
}

function getErrorStatements(parsed){
	return Q.all([parsed, ErrorStatement.find().select().exec()]);
}

function response(parsed,unparsed) {
	var response = [];
	// this will pass all vaules incudling id
	// response.push(parsed, unparsed);
	_.forEach(parsed,function(Statement){
		response.push({
			username: Statement.username,
			file_name: Statement.file_name,
			processed_date: Statement.processed_date,
			issuer: Statement.issuer,
			invoice_number : Statement.invoice_number,
			partner_name : Statement.partner_name,
			parsed : true
		});
	});
	_.forEach(unparsed, function(ErrorStatement){
		if(!ErrorStatement.isParsed){
		response.push({
			username: ErrorStatement.username,
			file_name: ErrorStatement.file_name,
			processed_date: ErrorStatement.processed_date,
			parsed : false
		});
		}
	});

	return Q(response);
}

module.exports = {
	getDetails: getDetails
}