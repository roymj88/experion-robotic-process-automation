'use strict';

angular.module('inspinia')
  .controller('LogoutController', function ($state) {

    var vm = this;

    // $ngBootbox.confirm('Are you sure you want to logout?')
    	// .then(function() {
    		$state.go('login');
    	// }, function() {

    // });


  });
