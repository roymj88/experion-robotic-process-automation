'use strict';

angular.module('inspinia')
  .controller('MainController', function ($rootScope, $state) {

    var vm = this;

    vm.userName 		= 'Admin';
    vm.helloText 		= 'Welcome to Robotic Process Automation Dashboard';
    vm.descriptionText 	= 'It is a next gen intelligent step to workforce management';


  	vm.userName = "Admin";

  });
