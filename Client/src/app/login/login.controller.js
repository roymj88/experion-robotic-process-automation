'use strict';

angular.module('inspinia')
    .controller('LoginController', function ($state, loginService, $rootScope, $window) {

        var vm = this;

        // function to submit the form after all validation has occurred            
        vm.doLogin = function(isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                
                var dataToSend = {
                    "email" : vm.formData.email,
                    "password" : vm.formData.password
                };

                $rootScope.AuthCode = "";
                $window.localStorage.setItem('AuthCode', "");

                loginService.login(dataToSend).then(function(result){
                    if(result.data.status === 1){
                        
                        $window.localStorage.setItem('AuthCode', result.data.data.token);
                        $window.localStorage.setItem('UserType', result.data.data.user_type);
                        $window.localStorage.setItem('Name', result.data.data.name);
                        
                        $rootScope.AuthCode = result.data.data.token;
                        $rootScope.UserType = result.data.data.user_type;
                        $state.go("index.main");
                    }else{
                        alert(result.data.message);
                    }

                });


            }

        };

  });
