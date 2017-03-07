(function() {
    'use strict';

    angular
        .module('inspinia')
        .run(runBlock);


    angular
        .module('inspinia')
        .constant('API_URL', 'http://localhost:5000/api/rpa/');


    /** @ngInject */
    function runBlock($log, $http, $window) {

        $log.debug('RunBlock Start');

        if ($window.localStorage.getItem('AuthCode')) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage.getItem('AuthCode');
            $http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';
        }
        
        $log.debug('RunBlock End');

    }

})();