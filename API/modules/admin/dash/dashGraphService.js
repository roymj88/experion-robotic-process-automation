'use strict';

var Q = require('q');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var moment = require('moment');

var Login = require('../../../models/Login');
var Statement = require('../../../models/Statement');
var ErrorStatement = require('../../../models/ErrorStatement');

var failure = require('../../../helper/response').failure;
var success = require('../../../helper/response').success;

var Http = require('../../../helper/http');

var _ = require('lodash');

var locals = {};
var reqBody = {};
var reqParam = {};


function getGraphDetails(req, res, cb) {
    locals = req;

    Q.fcall(getParsed)
        .then(getUnparsed)
        .spread(parsedResponse)
        .then(function(output) {
            return cb(null, success('Successfully loaded dash info', Http.EVERYTHING_IS_OK, output));
        })
        .fail(function(reason) {
            return cb(failure(reason, Http.FORBIDDEN));
        })
        .done();

}

function getParsed() {
    return Q(getAggregate(Statement));
}

function getUnparsed(parsed) {
    return Q.all([parsed, getAggregate(ErrorStatement)]);
}

function getAggregate(model) {
    return Q(model.aggregate([{
            $match: {
                processed_date: {
                    $gte: new Date(new Date().getFullYear() + '-01-01'),
                    $lte: new Date(new Date().getFullYear() + '-12-31')
                }
            }
        },
        {
            $project: {
                Month: {
                    $substr: ["$processed_date", 5, 2]
                }
            } //moment().format("MMMM")
        }, {
            $group: {
                _id: "$Month",
                count: {
                    $sum: 1
                }
            }
        }
    ]));

}

function parsedResponse(parsed, unparsed) {
    return Q(response([getResponse('Parsed', parsed), getResponse('UnParsed', unparsed)]));
}

function response(resp) {

    var response = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: []
    }
    _.forEach(resp, function(data) {
        response.series.push(data)
    });
    return response;
}

function getResponse(name, data) {
    var series = {
        "name": name,
        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    data.forEach(function(statement) {
        //_.forEach(data, function(satement){
        switch (statement._id) {
            case "01":
                series.data[0] = statement.count;
                break;
            case "02":
                series.data[1] = statement.count;
                break;
            case "03":
                series.data[2] = statement.count;
                break;
            case "04":
                series.data[3] = statement.count;
                break;
            case "05":
                series.data[4] = statement.count;
                break;
            case "06":
                series.data[5] = statement.count;
                break;
            case "07":
                series.data[6] = statement.count;
                break;
            case "08":
                series.data[7] = statement.count;
                break;
            case "09":
                series.data[8] = statement.count;
                break;
            case "10":
                series.data[9] = statement.count;
                break;
            case "11":
                series.data[10] = statement.count;
                break;
            case "12":
                series.data[11] = statement.count;
                break;
        }
    });
    return series

}


module.exports = {
    getGraphDetails: getGraphDetails
}