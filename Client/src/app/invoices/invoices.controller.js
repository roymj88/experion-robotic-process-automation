'use strict';

angular.module('inspinia')
  .controller('InvoicesController', function (invoicesService, $modal) {

    var vm = this;
    console.log($modal);
    var modalInstance = $modal.open({
        templateUrl: 'modal-form.html',
        controller: ModalInstanceCtrl,
        scope: $scope,
        resolve: {
            userForm: function () {
                return $scope.userForm;
            }
        }
    });

    modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });



    vm.invoicePromise = true;
	invoicesService.getInvoicesRequest().then(function(result){
	    vm.invoicePromise = false;
		vm.latestInvoicesData = result.data.data;
	});

	

});
