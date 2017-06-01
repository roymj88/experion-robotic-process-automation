'use strict'

var Q = require('q');

var Statement = require('../../../models/Statement');
var errorStatement = require('../../../models/ErrorStatement');

var failure = require('../../../helper/response').failure;
var success = require('../../../helper/response').success;

var Http = require('../../../helper/http');

var locals = {};
var reqBody = {};
var reqParam = {};

function doUpdate(req, res, cb) {
    locals = req;

    Q.fcall(validate)
        .then(saveStatement)
        .then(updateErrorStatement)
        .then(function(output) {
            return cb(null, success('Successfully Updated'), Http.EVERYTHING_IS_OK)
        })
        .fail(function(reasone){
            return cb(failure(reasone), Http.FORBIDDEN)
        })
        .done()
}

function validate() {
    reqBody = locals.body;

    if(!reqBody.invoice_number) 
        throw new Error('Invoice Number is required')
    
    if(!reqBody.amount)
        throw new Error('Amount is required')

}

function saveStatement() {
    reqBody = locals.body

    var statement = new Statement();
        statement.username = locals.query.username,
        statement.amount_untaxed = reqBody.amount_untaxed,
        statement.partner_name = reqBody.partner_name,
        statement.date_invoice = reqBody.date_invoice,
        statement.date_due = reqBody.date_due,
        statement.currency = reqBody.currency,
        statement.amount = reqBody.amount,
        statement.invoice_number = reqBody.invoice_number,
        statement.desc = reqBody.desc,
        statement.issuer = reqBody.issuer,
        statement.processed_date = reqBody.processed_date

    statement.save();
}

function updateErrorStatement() {

    errorStatement.findById(locals.query.id, function(err, es) {
      if (!es)
        return next(new Error('Could not load Document'));
      else {
        // do your updates here
        es.isParsed = true;

        es.save(function(err) {
          if (err){
            console.log('error')
            return Q();
            }
          else {
            console.log('success')
            return Q();
            }   
        });
      }
    });

}

module.exports = {
    doUpdate: doUpdate
}