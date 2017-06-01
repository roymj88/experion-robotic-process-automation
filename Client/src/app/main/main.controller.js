'use strict';

angular.module('inspinia')
  .controller('MainController', function ($rootScope, $state, $window) {

    var vm = this;

    vm.userName 		= $window.localStorage.getItem('Name');
    vm.helloText 		= 'Welcome to Robotic Process Automation Dashboard';
    vm.descriptionText 	= 'It is a next gen intelligent step to workforce management';


    vm.logout = function(){
    	$window.localStorage.clear();
    	$state.go('login');
    }
  });
