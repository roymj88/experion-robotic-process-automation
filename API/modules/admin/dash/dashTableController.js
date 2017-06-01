var dashTableService = require('./dashTableService');


function GetDetails(req, res, next) {
	
	dashTableService.getDetails(req, res, function(err, response){
		if (err) return res.json(err);
		return res.json(response);
	});
}


module.exports = {
	GetDetails: GetDetails
}



