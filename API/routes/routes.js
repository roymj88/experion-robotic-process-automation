'use strict';

var express = require('express');
var config = require('./../config.json');

var loginController = require('./../modules/login/loginController');
var signupController = require('./../modules/signup/signupController');

var dashParseController = require('./../modules/dash/parsed/dashParseController');
var dashUnparseController = require('./../modules/dash/unparsed/dashUnparseController');
var dashUpdateController = require('./../modules/dash/unparsed/dashUpdateController');
var dashStatisticsController = require('./../modules/dash/statistics/dashStatisticsController');

var adminInfoController = require('./../modules/admin/dash/dashInfoController');
var adminTableController = require('./../modules/admin/dash/dashTableController');
var adminParseController = require('./../modules/admin/dash/dashParseController');
var adminGraphController = require('./../modules/admin/dash/dashGraphController');

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
// Path for unparsed image files.
  const __dirname = '/home/ubuntu/rpa-invoice/parser/domain';
  
    app.use('/invoice', security.auth, function(req,res,next){
      express.static(__dirname + '/'+next.name);
    });
    //API hook for API.AI

    app.post("/api/rpa/login", loginController.DoLogin);
    app.post("/api/rpa/signup", signupController.DoSignUp);

    app.get("/api/rpa/dash/parsed/:username", security.auth, dashParseController.GetInvoiceDetails);
    app.get("/api/rpa/dash/unparsed", security.auth, dashUnparseController.GetUnparsedDetails);
    app.post("/api/rpa/dash/unparsed/update", security.auth, dashUpdateController.UpdateDetails);
    app.get("/api/rpa/dash/statistics/:username", security.auth, dashStatisticsController.GetStatistics);
    
    app.get("/api/rpa/admin/dashinfo", security.adminAuth, adminInfoController.GetStatistics);
    app.get("/api/rpa/admin/dash-details/:limit?", security.adminAuth, adminTableController.GetDetails);
    app.get("/api/rpa/admin/dash-graph-details", security.adminAuth, adminGraphController.GetGraphDetails);
    app.get("/api/rpa/admin/dash-parsed-details", security.adminAuth, adminParseController.GetParsedDetails);

    // app.post("/api/rpa/admin/dash-parsed-details", security.auth, adminParseController.GetParsedDetails);

//link - /api/rpa/dash/unparsed/?name=username
app.get('/api/rpa/dash/test', security.auth,function(req, res) {
  console.log("sec : " + security.auth);
  res.send("name is set to " + req.query.name);
  console.log("name is set to " + req.query.name)
});

  //     app.get('/api/:version', function(req, res) {
  //   res.send(req.params.version);
  // });
}
