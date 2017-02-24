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

function getDetails(req, res, cb) {

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
	return Q(Statement.find({'username': locals.params.username}).select().exec());
}

function response(result) {
	var response = [];
	console.log(result);
	result.forEach(function(statement){
		response.push({
			amount_untaxed : statement.amount_untaxed,
			partner_name : statement.partner_name,
			date_invoice : statement.date_invoice,
			date_due : statement.date_due,
			currency : statement.currency,
			amount : statement.amount,
			invoice_number : statement.invoice_number,
			desc : statement.desc,
    		issuer: statement.issuer,
    		processed_date: statement.processed_date
			//status :leave.status,
		});
	});

	return Q(response);
}

module.exports = {
	getDetails: getDetails
};