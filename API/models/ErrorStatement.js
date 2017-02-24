
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var errorStatementSchema = new Schema({
    message: {
        type:String
    },
    unparsed_file: {
        type: String
    },
    file_name: {
        type: String
    },
    processed_date: {
        type:String
    },
    username : {
        type: String
    }
}, {
    versionKey: false,
    collection: 'errorstatement'
});

// the schema is useless so far
// we need to create a model using it
var ErrorStatement = mongoose.model('ErrorStatement', errorStatementSchema);

// make this available to our users in our Node applications
module.exports = ErrorStatement;