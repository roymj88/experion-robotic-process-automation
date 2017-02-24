
var loginService = require('./loginService');
 
function DoLogin(req, res, next) {
    loginService.doLogin(req, res, function(err, response) {
        if (err) return res.json(err);
        return res.json(response);
    });
}

module.exports = {
    DoLogin:DoLogin
}
