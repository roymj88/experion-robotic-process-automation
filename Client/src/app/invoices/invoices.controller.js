'use strict';

angular.module('inspinia')
  .controller('AlexaController', function (alexaService) {

    var vm = this;

	alexaService.getLeaveRequest().then(function(result){
		console.log(result)
		vm.leaveRequestData = result.data.data;
	});

	alexaService.getTravelRequest().then(function(result){
		vm.travelRequestData = result.data.data;
	});

  });
