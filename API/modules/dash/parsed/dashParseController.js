var dashService = require('./dashParseService');

// var GetInvoiceDetails = (req, res, next) =>{
// 	console.log("dash log");
// 	dashService.getDetails(req, res, function(err, response) {
//         if (err) return res.json(err);
//         return res.json(response);
//     });

// }

function GetInvoiceDetails(req, res, next) {
	console.log('hii..');
    dashService.getDetails(req, res, function(err, response) {
        if (err) return res.json(err);
        return res.json(response);
    });
}

module.exports = {
	GetInvoiceDetails: GetInvoiceDetails
}