var dashService = require('./dashParseService');

var failure = require('../../../helper/response').failure;
var Http = require('../../../helper/http');
var validate = require('../../../helper/util').validateUser;

// var GetInvoiceDetails = (req, res, next) =>{
// 	console.log("dash log");
// 	dashService.getDetails(req, res, function(err, response) {
//         if (err) return res.json(err);
//         return res.json(response);
//     });

// }

function GetInvoiceDetails(req, res, next) {
    validate(req, function(data) {
        if (data) {
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
    GetInvoiceDetails: GetInvoiceDetails
}