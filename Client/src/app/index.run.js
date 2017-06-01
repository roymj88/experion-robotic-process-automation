(function() {
    'use strict';

    angular
        .module('inspinia')
        .run(runBlock);


    angular
        .module('inspinia')
        .constant('API_URL', 'http://35.154.53.23:3030/api/rpa/');


    angular.module('inspinia')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('requestInterceptor');
        })
        .factory('requestInterceptor', function ($q, $rootScope, $window) {
            return {
                'request': function (config) {
                    if ($window.localStorage.getItem('AuthCode')) {
                        config.headers['Authorization'] = 'Bearer '+  $window.localStorage.getItem('AuthCode');
                        config.headers['Accept'] = 'application/json;odata=verbose';
                        return config;
                    }
                    return config || $q.when(config);
                },

                'requestError': function(rejection) {
                    return $q.reject(rejection);
                },

                'response': function(response) {
                    return response || $q.when(response);
                },

                'responseError': function(rejection) {
                    return $q.reject(rejection);
                }
            }
        });

    /** @ngInject */
    function runBlock($log, $http, $window, $rootScope) {

        $log.debug('RunBlock Start');
        
        if ($window.localStorage.getItem('UserType')) {
            $rootScope.UserType = $window.localStorage.getItem('UserType');
        }
        
        $log.debug('RunBlock End');

    }




})();