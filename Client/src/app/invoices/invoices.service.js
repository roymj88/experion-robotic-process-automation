'use strict';

angular.module('inspinia')
	.factory('alexaService', function($http, API_URL, $log, $q) {

		var leaveRequestObj = function() {
     		var deferred = $q.defer();
     		
     		var req = {
			 	method: 'GET',
				url: API_URL+ 'api/alexa/leaverequest',
			};
			
			$http(req).then(function(data){
				deferred.resolve(data);
			}, function(msg, code){
				deferred.reject(msg);
				$log.error(msg, code);
			});
     		
     		return deferred.promise;
  		};

  		var travelRequestObj = function() {
     		var deferred = $q.defer();
     		
     		var req = {
			 	method: 'GET',
				url: API_URL+ 'api/alexa/travelrequest',
			};
			
			$http(req).then(function(data){
				deferred.resolve(data);
			}, function(msg, code){
				deferred.reject(msg);
				$log.error(msg, code);
			});
     		
     		return deferred.promise;
  		};

	return {
  		getLeaveRequest: leaveRequestObj,
  		getTravelRequest: travelRequestObj
	}
	
});
