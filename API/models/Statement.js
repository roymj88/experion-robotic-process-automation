
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statementSchema = new Schema({
    amount_untaxed: {
    	type:String
    },
    partner_name: {
    	type:String
    },
    date_invoice: {
    	type:String
    },
    date_due:{
        type: String
    },
    currency:{
    	type: String
    },
    amount:{
    	type: String
    },
    invoice_number: {
    	type: String
    },
    desc : {
        type: String
    },
    username : {
        type: String
    },
    issuer : {
        type: String
    },
    processed_date : {
        type: String
    },
    file_name : {
        type: String
    }
}, {
    versionKey: false,
    collection: 'statement'
});

// the schema is useless so far
// we need to create a model using it
var Statement = mongoose.model('Statement', statementSchema);

// make this available to our users in our Node applications
module.exports = Statement;