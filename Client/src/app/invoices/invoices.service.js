'use strict';

angular.module('inspinia')
	.factory('invoicesService', function($http, API_URL, $log, $q) {

		var getInvoicesRequestOj = function() {
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
  		};

  		
	return {
  		getInvoicesRequest: getInvoicesRequestOj
	}
	
});
