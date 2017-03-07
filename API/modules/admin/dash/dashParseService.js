'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var Statement = require('../../../models/Statement');

var failure = require('../../../helper/response').failure;
var success = require('../../../helper/response').success;

var Http = require('../../../helper/http');

var locals = {};
var reqBody = {};
var reqParam = {};

function getParsedDetails(req, res, cb) {

	locals = req;
	reqParam = locals.params;
	   console.log("req :" + locals.params.username);
 // console.log("req :" + locals.query.username);
 	
	Q.fcall(get)
		.then(response)
		.then(function(output) {
			return cb(null, success('Successfully loaded invoice details', Http.EVERYTHING_IS_OK, output));
		})
		.fail(function(reason) {
			return cb(failure(reason, Http.FORBIDDEN));
		})
		.done();
}

function get() {
	return Q(Statement.find().select().exec());
}

function response(result) {
	var response = [];
	console.log(result);
	result.forEach(function(statement){
		response.push({
			username: statement.username,
			invoice_number : statement.invoice_number,
			issuer: statement.issuer,
			date_invoice : statement.date_invoice,
			date_due : statement.date_due,
			amount : statement.amount,
			currency : statement.currency,
			processed_date: statement.processed_date,
			amount_untaxed : statement.amount_untaxed,
			partner_name : statement.partner_name,
			desc : statement.desc
			//status :leave.status,
		});
	});

	return Q(response);
}

module.exports = {
	getParsedDetails: getParsedDetails
};