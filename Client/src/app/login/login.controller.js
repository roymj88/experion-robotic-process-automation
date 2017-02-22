'use strict';

angular.module('inspinia')
    .controller('LoginController', function ($state, loginService) {

        var vm = this;

        // function to submit the form after all validation has occurred            
      	vm.doLogin = function(isValid) {

        	// check to make sure the form is completely valid
        	if (isValid) {
                console.log(vm.formData);
                
                var dataToSend = {
                    "email" : vm.email,
                    "password" : vm.password
                };

                // loginService.login(dataToSend).then(function(result){
                    $state.go('index.main');
                // });


        	}

      	};

  });
