var dashService = require('./dashStatisticsService');

var GetStatistics = (req, res, next) =>{
	dashService.getStatistics(req, res, function(err, response) {
		if (err) return res.json(err);
		return res.json(response);
	});

}


module.exports ={
	GetStatistics
}