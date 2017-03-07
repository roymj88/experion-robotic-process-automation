'use strict';

var config = require('./../config.json');

var loginController = require('./../modules/login/loginController');
var signupController = require('./../modules/signup/signupController');

var dashParseController = require('./../modules/dash/parsed/dashParseController');
var dashUnparseController = require('./../modules/dash/unparsed/dashUnparseController');
var dashStatisticsController = require('./../modules/dash/statistics/dashStatisticsController');

var adminInfoController = require('./../modules/admin/dash/dashInfoController');
var adminTableController = require('./../modules/admin/dash/dashTableController');
var adminParseController = require('./../modules/admin/dash/dashParseController');

var security = require('./../helper/security');

module.exports = function(app) {
    // API Status
    app.get("/api", function(req, res) {
        res.json({
            api: config.project.name,
            version: config.project.version,
            status: config.project.status
        });
    });

    //API hook for API.AI

    app.post("/api/login", loginController.DoLogin);
    app.post("/api/signup", signupController.DoSignUp);

    app.get("/api/rpa/dash/parsed/:username", security.auth, dashParseController.GetInvoiceDetails);
    app.get("/api/rpa/dash/unparsed", security.auth, dashUnparseController.GetUnparsedDetails);
    app.get("/api/rpa/dash/statistics/:username", security.auth, dashStatisticsController.GetStatistics);
    
    app.get("/api/rpa/admin/dashinfo", security.auth, adminInfoController.GetStatistics);
    app.get("/api/rpa/admin/dash-details", security.auth, adminTableController.GetDetails);
    app.get("/api/rpa/admin/dash-parsed-details", security.auth, adminParseController.GetParsedDetails);

    // app.post("/api/rpa/admin/dash-parsed-details", security.auth, adminParseController.GetParsedDetails);

//link - /api/rpa/dash/unparsed/?name=username
app.get('/api/rpa/dash/test', function(req, res) {
  res.send("name is set to " + req.query.name);
  console.log("name is set to " + req.query.name)
});

  //     app.get('/api/:version', function(req, res) {
  //   res.send(req.params.version);
  // });
}