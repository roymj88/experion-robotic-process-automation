'use strict';

angular.module('inspinia')
	.factory('loginService', function($http, API_URL, $log, $q) {

		var login = function(data) {
     		
     		var deferred = $q.defer();

     		var req = {
			 	method: 'POST',
				url: API_URL+ 'api/login',
				data: data
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
  		login: login
	}
	
});
