(function() {
  'use strict';

  angular
  .module('inspinia')
  .config(routerConfig);


  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: "/login",
        templateUrl: "app/login/login.html",
        controller: "LoginController",
        controllerAs: "lc"
    })
    .state('forgotpassword', {
        url: "/forgotpassword",
        templateUrl: "app/forgot-password/forgot-password.html",
        controller: "ForgotPasswordController",
        controllerAs: "fpc"
    })
    .state('logout', {
        url: "/logout",
        controller: "LogoutController",
        controllerAs: "lgc"
    })
    .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html"
    })
    .state('index.main', {
        url: "/main",
        templateUrl: "app/main/main.html",
        data: { pageTitle: 'Example view' },
        controller:"DashboardController",
        controllerAs:"dc"
    })
    .state('index.invoices', {
        url: "/invoices",
        templateUrl: "app/invoices/invoices.html",
        data: { pageTitle: 'Invoices Dashboard' },
        controller: "InvoicesController",
        controllerAs: "ic"
    });

    $urlRouterProvider.otherwise('/login');
}

})();
