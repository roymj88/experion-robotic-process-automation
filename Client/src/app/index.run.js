(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

angular
    .module('inspinia')
   	.constant('API_URL', 'http://192.168.1.137:3000/');



  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
