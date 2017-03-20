(function() {
    'use strict';

    angular
        .module('inspinia')
        .run(runBlock);


    angular
        .module('inspinia')
        .constant('LOGIN_URL', 'http://localhost:5000/api/')
        .constant('API_URL', 'http://localhost:5000/api/rpa/');
        // .constant('API_URL', 'http://35.154.53.23:3030/api/');



    /** @ngInject */
    function runBlock($log, $http, $window) {

        $log.debug('RunBlock Start');

        if ($window.localStorage.getItem('AuthCode')) {
            console.log($window.localStorage.getItem('AuthCode'));
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage.getItem('AuthCode');
            $http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';
        }
        
        $log.debug('RunBlock End');

    }

})();