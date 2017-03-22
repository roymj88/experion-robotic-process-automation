var dashService = require('./dashGraphService');

var GetGraphDetails = (req, res, next) =>{
	dashService.getGraphDetails(req, res, function(err, response){
		if (err) return res.json(err);
		return res.json(response);
	});

}

module.exports = {
	GetGraphDetails
}