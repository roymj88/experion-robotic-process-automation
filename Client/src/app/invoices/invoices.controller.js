'use strict';

angular.module('inspinia')
  .controller('InvoicesController', function (invoicesService) {

    var vm = this;

    vm.invoicePromise = true;
	invoicesService.getInvoicesRequest().then(function(result){
	    vm.invoicePromise = false;
		vm.latestInvoicesData = result.data.data;
	});

	

});
