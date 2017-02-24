var dashService = require('./dashUnparseService');

var GetUnparsedDetails = (req, res, next) => {
    dashService.getDetails(req, res, function(err, response) {
        if (err) return res.json(err);
        return res.json(response);
    });
}

module.exports = {
	GetUnparsedDetails
}