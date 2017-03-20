'use strict';

angular.module('inspinia')
	.factory('mainService', function($http, API_URL, $log, $q) {

		var getCardDataObj = function() {
     		var deferred = $q.defer();
     		
     		var req = {
			 	method: 'GET',
				url: API_URL+ 'admin/dashinfo',
			};
			
			$http(req).then(function(data){
				deferred.resolve(data);
			}, function(msg, code){
				deferred.reject(msg);
				$log.error(msg, code);
			});
     		
     		return deferred.promise;
  		};

  		var getInvoiceDataObj = function() {
     		var deferred = $q.defer();
     		
     		var req = {
			 	method: 'GET',
				url: API_URL+ 'admin/dash-graph-details',
			};
			
			$http(req).then(function(data){
				deferred.resolve(data);
			}, function(msg, code){
				deferred.reject(msg);
				$log.error(msg, code);
			});
     		
     		return deferred.promise;
  		};

  		var getParsedDataObj = function(){
  			var deferred = $q.defer();
     		
     		var req = {
			 	method: 'GET',
				url: API_URL+ 'admin/dash-parsed-details',
			};
			
			$http(req).then(function(data){
				deferred.resolve(data);
			}, function(msg, code){
				deferred.reject(msg);
				$log.error(msg, code);
			});
     		
     		return deferred.promise;
  		}

  		var getLatestInvoicesDataObj = function(){
  			var deferred = $q.defer();
     		
     		var req = {
			 	method: 'GET',
				url: API_URL+ 'admin/dash-details',
			};
			
			$http(req).then(function(data){
				deferred.resolve(data);
			}, function(msg, code){
				deferred.reject(msg);
				$log.error(msg, code);
			});
     		
     		return deferred.promise;
  		}

  		

	return {
  		getCardsDataRequest: getCardDataObj,
  		getLatestInvoicesDataRequest: getLatestInvoicesDataObj,
  		getInvoiceDataRequest: getInvoiceDataObj,
  		getParsedDataRequest: getParsedDataObj
	}
	
});
