var dashService = require('./dashUnparseService');
var failure = require('../../../helper/response').failure;
var Http = require('../../../helper/http');
var validate = require('../../../helper/util').validateUser;

var GetUnparsedDetails = (req, res, next) => {

    validate(req, function(data){
        console.log(data);
        if(data) {
            dashService.getDetails(req, res, function(err, response) {
                if (err) return res.json(err);
                return res.json(response);
            });
        } else {
            return res.json(failure('Invalid Token', Http.UNAUTHORIZED));
        }
    });    
}


module.exports = {
	GetUnparsedDetails
}