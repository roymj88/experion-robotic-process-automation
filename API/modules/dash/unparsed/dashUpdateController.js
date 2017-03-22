var dashService = require('./dashUpdateService');
var failure = require('../../../helper/response').failure;
var Http = require('../../../helper/http');
var validate = require('../../../helper/util').validateUser;

var UpdateDetails = (req, res, next) => {
    validate(req, function(data) {
        if (data) {
            dashService.doUpdate(req, res, function(err, response) {
                if (err) return res.json(err);
                return res.json(response);
            });
        } else {
            return res.json(failure('Invalid Token', Http.UNAUTHORIZED));
        }
    });
}

module.exports = {
    UpdateDetails
}