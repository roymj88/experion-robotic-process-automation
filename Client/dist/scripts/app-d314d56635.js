!function(){"use strict";angular.module("inspinia",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap","highcharts-ng","smart-table","ngBootbox"])}(),angular.module("inspinia").factory("mainService",["$http","API_URL","$log","$q",function(e,a,t,i){var s=function(){var s=i.defer(),o={method:"GET",url:a+"admin/dashinfo"};return e(o).then(function(e){s.resolve(e)},function(e,a){s.reject(e),t.error(e,a)}),s.promise},o=function(){var s=i.defer(),o={method:"GET",url:a+"admin/dash-graph-details"};return e(o).then(function(e){s.resolve(e)},function(e,a){s.reject(e),t.error(e,a)}),s.promise},n=function(){var s=i.defer(),o={method:"GET",url:a+"admin/dash-parsed-details"};return e(o).then(function(e){s.resolve(e)},function(e,a){s.reject(e),t.error(e,a)}),s.promise},l=function(){var s=i.defer(),o={method:"GET",url:a+"admin/dash-details"};return e(o).then(function(e){s.resolve(e)},function(e,a){s.reject(e),t.error(e,a)}),s.promise},r=function(){var s=i.defer(),o={method:"GET",url:a+"dash/statistics/test-aegis"};return e(o).then(function(e){s.resolve(e)},function(e,a){s.reject(e),t.error(e,a)}),s.promise},d=function(){var s=i.defer(),o={method:"GET",url:a+"dash/parsed/test-aegis"};return e(o).then(function(e){s.resolve(e)},function(e,a){s.reject(e),t.error(e,a)}),s.promise},c=function(){var s=i.defer(),o={method:"GET",url:a+"dash/unparsed?username=test-aegis"};return e(o).then(function(e){s.resolve(e)},function(e,a){s.reject(e),t.error(e,a)}),s.promise},m=function(s){var o=i.defer(),n={method:"POST",url:a+"dash/unparsed/update?username=test-aegis&id=58bd3b601963fd1b00ee4dfc",data:s};return e(n).then(function(e){o.resolve(e)},function(e,a){o.reject(e),t.error(e,a)}),o.promise};return{getCardsDataRequest:s,getLatestInvoicesDataRequest:l,getInvoiceDataRequest:o,getParsedDataRequest:n,getUserCardsDataRequest:r,getUserParsedDataRequest:d,getUserUnParsedDataRequest:c,updateUnparsedDataRequest:m}}]),angular.module("inspinia").controller("MainController",["$rootScope","$state","$window",function(e,a,t){var i=this;i.userName=t.localStorage.getItem("Name"),i.helloText="Welcome to Robotic Process Automation Dashboard",i.descriptionText="It is a next gen intelligent step to workforce management",i.logout=function(){t.localStorage.clear(),a.go("login")}}]),angular.module("inspinia").controller("DashboardController",["$rootScope","$state","mainService","$timeout",function(e,a,t,i){var s=this;"A"==e.UserType&&(s.cardsPromise=!0,t.getCardsDataRequest().then(function(e){s.cardsData=e.data.data,s.cardsPromise=!1;var a=e.data.data.parsed_count,t=e.data.data.unparsed_count,i=e.data.data.total_files,o=a/i*100,n=t/i*100,l={chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:""},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!1},showInLegend:!0}},series:[{name:"Brands",colorByPoint:!0,data:[{name:"Parsed",y:o},{name:"Unparsed",y:n,sliced:!0,selected:!0}]}]};s.dashboardPieOptions=l}),s.getInvoiceDataPromise=!0,t.getInvoiceDataRequest().then(function(e){s.getInvoiceDataPromise=!1;var a=e.data.data.categories,t=e.data.data.series,i={chart:{type:"line"},title:{text:""},subtitle:{text:""},xAxis:{categories:a},yAxis:{title:{text:""}},plotOptions:{line:{dataLabels:{enabled:!0},enableMouseTracking:!1}},series:t,responsive:{rules:[{condition:{maxWidth:1e3},chartOptions:{legend:{align:"center",verticalAlign:"bottom",layout:"horizontal"},yAxis:{labels:{align:"left",x:0,y:-5},title:{text:null}},subtitle:{text:null},credits:{enabled:!1}}}]}};s.graphOptions=i}),s.latestInvoicesPromise=!0,t.getLatestInvoicesDataRequest().then(function(e){s.latestInvoicesData=e.data.data,s.latestInvoicesPromise=!1})),"U"==e.UserType&&(s.userCardsPromise=!0,t.getUserCardsDataRequest().then(function(e){s.userCardsData=e.data.data[0],s.userCardsPromise=!1}),s.parsedPromise=!0,t.getUserParsedDataRequest().then(function(e){console.log(e),s.parsedData=e.data.data,s.parsedPromise=!1}),s.unParsedPromise=!0,t.getUserUnParsedDataRequest().then(function(e){console.log(e),s.unParsedData=e.data.data,s.unParsedPromise=!1})),s.edit=function(e){s.editInvoice=e,bootbox.dialog({buttons:[{label:"Save",className:"btn btn-success",callback:function(){var e={date_due:"03-09-2016",processed_date:"2017-02-24 17:07:08",partner_name:$("#partner_name").val(),file_name:"INV-8516-17.pdf",date_invoice:"19-08-2016",currency:"USD",amount:"7953",invoice_number:$("#invoice_number").val(),desc:"Invoice INV-85/16-17 from Experion Technologies",issuer:$("#issuer").val()};t.updateUnparsedDataRequest(e).then(function(e){bootbox.alert("Successfully Updated")})}},{label:"Close",className:"btn btn-default",callback:function(){}}],message:'<div class="form-group"> <label for="Issuer">Issuer:</label> <input id="issuer" ng-model="dc.editInvoice.issuer" type="text" class="form-control"> </div><div class="form-group"> <label for="Partner">Partner:</label> <input ng-model="dc.editInvoice.partner_name" type="text" class="form-control" id="partner_name"> </div><div class="form-group"> <label for="InvoiceNo">Invoice No:</label> <input ng-model="dc.editInvoice.invoice_number" type="text" class="form-control" id="invoice_number"> </div>'})}}]),angular.module("inspinia").controller("LogoutController",["$state",function(e){e.go("login")}]),angular.module("inspinia").factory("loginService",["$http","API_URL","$log","$q",function(e,a,t,i){var s=function(s){var o=i.defer(),n={method:"POST",url:a+"login",data:s};return e(n).then(function(e){o.resolve(e)},function(e,a){o.reject(e),t.error(e,a)}),o.promise};return{login:s}}]),angular.module("inspinia").controller("LoginController",["$state","loginService","$rootScope","$window",function(e,a,t,i){var s=this;s.doLogin=function(o){if(o){var n={email:s.formData.email,password:s.formData.password};t.AuthCode="",i.localStorage.setItem("AuthCode",""),a.login(n).then(function(a){1===a.data.status?(i.localStorage.setItem("AuthCode",a.data.data.token),i.localStorage.setItem("UserType",a.data.data.user_type),i.localStorage.setItem("Name",a.data.data.name),t.AuthCode=a.data.data.token,t.UserType=a.data.data.user_type,e.go("index.main")):alert(a.data.message)})}}}]),angular.module("inspinia").factory("invoicesService",["$http","API_URL","$log","$q",function(e,a,t,i){var s=function(){var s=i.defer(),o={method:"GET",url:a+"admin/dash-details"};return e(o).then(function(e){s.resolve(e)},function(e,a){s.reject(e),t.error(e,a)}),s.promise};return{getInvoicesRequest:s}}]),angular.module("inspinia").controller("InvoicesController",["invoicesService",function(e){var a=this;a.invoicePromise=!0,e.getInvoicesRequest().then(function(e){a.invoicePromise=!1,a.latestInvoicesData=e.data.data})}]),angular.module("inspinia").controller("ForgotPasswordController",["$state",function(e){var a=this;a.submit=function(e){}}]),angular.element(document).ready(function(e){function a(){var e=angular.element("body > #wrapper").height()-61;angular.element(".sidebard-panel").css("min-height",e+"px");var a=angular.element("nav.navbar-default").height(),t=angular.element("#page-wrapper").height();a>t&&angular.element("#page-wrapper").css("min-height",a+"px"),t>a&&angular.element("#page-wrapper").css("min-height",angular.element(window).height()+"px"),angular.element("body").hasClass("fixed-nav")&&(a>t?angular.element("#page-wrapper").css("min-height",a+"px"):angular.element("#page-wrapper").css("min-height",angular.element(window).height()-60+"px"))}angular.element(window).bind("load resize scroll",function(){angular.element("body").hasClass("body-small")||a()}),angular.element(window).scroll(function(){angular.element(window).scrollTop()>0&&!angular.element("body").hasClass("fixed-nav")?angular.element("#right-sidebar").addClass("sidebar-top"):angular.element("#right-sidebar").removeClass("sidebar-top")}),e(function(){a()}),angular.element(window).bind("load resize",function(){angular.element(document).width()<769?angular.element("body").addClass("body-small"):angular.element("body").removeClass("body-small")})}),function(){"use strict";function e(e,a,t,i){e.debug("RunBlock Start"),t.localStorage.getItem("UserType")&&(i.UserType=t.localStorage.getItem("UserType")),e.debug("RunBlock End")}e.$inject=["$log","$http","$window","$rootScope"],angular.module("inspinia").run(e),angular.module("inspinia").constant("API_URL","http://35.154.53.23:3030/api/rpa/"),angular.module("inspinia").config(["$httpProvider",function(e){e.interceptors.push("requestInterceptor")}]).factory("requestInterceptor",["$q","$rootScope","$window",function(e,a,t){return{request:function(a){return t.localStorage.getItem("AuthCode")?(a.headers.Authorization="Bearer "+t.localStorage.getItem("AuthCode"),a.headers.Accept="application/json;odata=verbose",a):a||e.when(a)},requestError:function(a){return e.reject(a)},response:function(a){return a||e.when(a)},responseError:function(a){return e.reject(a)}}}])}(),function(){"use strict";function e(e,a){e.state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"lc"}).state("forgotpassword",{url:"/forgotpassword",templateUrl:"app/forgot-password/forgot-password.html",controller:"ForgotPasswordController",controllerAs:"fpc"}).state("logout",{url:"/logout",controller:"LogoutController",controllerAs:"lgc"}).state("index",{"abstract":!0,url:"/index",templateUrl:"app/components/common/content.html"}).state("index.main",{url:"/main",templateUrl:"app/main/main.html",data:{pageTitle:"Example view"},controller:"DashboardController",controllerAs:"dc"}).state("index.invoices",{url:"/invoices",templateUrl:"app/invoices/invoices.html",data:{pageTitle:"Invoices Dashboard"},controller:"InvoicesController",controllerAs:"ic"}),a.otherwise("/login")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("inspinia").config(e)}(),angular.module("inspinia").directive("sideNavigation",["$timeout",function(e){return{restrict:"A",link:function(a,t){a.$watch("authentication.user",function(){e(function(){t.metisMenu()})})}}}]).directive("minimalizaSidebar",["$timeout",function(e){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',controller:["$scope",function(a){a.minimalize=function(){angular.element("body").toggleClass("mini-navbar"),!angular.element("body").hasClass("mini-navbar")||angular.element("body").hasClass("body-small")?(angular.element("#side-menu").hide(),e(function(){angular.element("#side-menu").fadeIn(400)},200)):angular.element("#side-menu").removeAttr("style")}}]}}]),angular.module("inspinia").run(["$templateCache",function(e){e.put("app/forgot-password/forgot-password.html",'<div class="passwordBox animated"><div class="row login-container"><div class="col-md-12"><div class="ibox-content"><h2 class="font-bold">Forgot password</h2><p>Enter your email address and your password will be reset and emailed to you.</p><div class="row"><div class="col-lg-12"><form class="m-t" name="forgotPasswordForm" ng-submit="fpc.submit(forgotPasswordForm.$valid)" novalidate=""><div class="form-group"><input name="email" type="email" class="form-control" placeholder="Email" ng-model="fpc.email" ng-minlength="6" required=""><p ng-show="forgotPasswordForm.email.$invalid && !forgotPasswordForm.email.$pristine" class="help-block">A valid email is required.</p></div><button type="submit" class="btn btn-primary block full-width m-b" ng-disabled="forgotPasswordForm.$invalid">Send new password</button></form><a href="" ui-sref="login"><small>Back to Login</small></a></div></div></div></div></div><hr><div class="row text-white"><div class="col-md-6">Experion</div><div class="col-md-6 text-right"><small>&copy; 2016-2017</small></div></div></div>'),e.put("app/invoices/invoices.html",'<div class="wrapper wrapper-content animated"><div class="row"><div class="col-lg-12"><div ng-if="ic.invoicePromise" class="text-center">Loading...</div><div ng-if="!ic.invoicePromise"><table class="table table-striped table-bordered table-hover"><thead class="thead-inverse"><tr><th>Employee</th><th>File</th><th>Issuer</th><th>Partner</th><th>Invoice No</th><th>Processed Date</th><th>Status</th></tr></thead><tbody><tr ng-repeat="row in ic.latestInvoicesData | orderBy:\'processed_date\'"><td class="text-capitalize">{{row.username}}</td><td class="text-capitalize">{{row.file_name}}</td><td>{{row.issuer}}</td><td>{{row.partner_name}}</td><td>{{row.invoice_number}}</td><td class="text-capitalize">{{row.processed_date | date}}</td><td class="text-capitalize"><small ng-if="row.parsed" class="label label-primary"><i class="fa fa-check"></i> Parsed</small> <small ng-if="!row.parsed" class="label label-danger"><i class="fa fa-times"></i> Unparsed</small></td></tr></tbody></table></div></div></div></div>'),e.put("app/login/login.html",'<div class="loginColumns animated"><div class="row text-white login-container"><div class="col-md-6"><h2 class="font-bold margin-top-0">Welcome to Experion RPA Dashboard</h2><p><small>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.</small></p><p><small>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</small></p></div><div class="col-md-6"><div class="ibox-content"><form class="m-t" name="loginForm" ng-submit="lc.doLogin(loginForm.$valid)" novalidate=""><div class="form-group"><input name="email" type="email" class="form-control" placeholder="Email" ng-model="lc.formData.email" ng-minlength="4" required=""><p ng-show="loginForm.formData.email.$invalid && !loginForm.formData.email.$pristine" class="help-block">A valid email is required.</p></div><div class="form-group"><input name="password" type="password" class="form-control" placeholder="Password" ng-model="lc.formData.password" ng-minlength="4" required=""><p ng-show="loginForm.formData.password.$error.minlength" class="help-block">Password is too short.</p></div><button type="submit" class="btn btn-primary block full-width m-b" ng-disabled="loginForm.$invalid">Login</button> <a href="" ui-sref="forgotpassword"><small>Forgot password?</small></a></form></div></div></div><hr><div class="row text-white"><div class="col-md-6">Experion Technologies</div><div class="col-md-6 text-right"><small>&copy; 2016-2017</small></div></div></div>'),e.put("app/main/main.html",'<div class="wrapper wrapper-content animated"><div class="row"><div class="col-lg-12"><div class="text-center m-t-lg"><h1>{{main.helloText}}</h1><small>{{main.descriptionText}}</small></div><br><div class="row" ng-if="UserType===\'A\'"><div class="col-lg-12"><div class="row"><div class="col-lg-3"><div class="ibox float-e-margins"><div class="ibox-title"><span class="label label-success pull-right">Monthly</span><h5>Users</h5></div><div class="ibox-content"><span class="text-center" ng-if="dc.cardsPromise">Loading...</span> <span ng-if="!dc.cardsPromise"><h1 class="no-margins" ng-bind="dc.cardsData.user_count"></h1><div class="stat-percent font-bold text-success">98% <i class="fa fa-bolt"></i></div><small>Total users</small></span></div></div></div><div class="col-lg-3"><div class="ibox float-e-margins"><div class="ibox-title"><span class="label label-info pull-right">Annual</span><h5>Files</h5></div><div class="ibox-content"><h1 class="no-margins" ng-bind="dc.cardsData.total_files"></h1><div class="stat-percent font-bold text-info">20% <i class="fa fa-level-up"></i></div><small>New files</small></div></div></div><div class="col-lg-3"><div class="ibox float-e-margins"><div class="ibox-title"><span class="label label-primary pull-right">Today</span><h5>Parsed</h5></div><div class="ibox-content"><h1 class="no-margins" ng-bind="dc.cardsData.parsed_count"></h1><div class="stat-percent font-bold text-navy">44% <i class="fa fa-level-up"></i></div><small>Total parsed</small></div></div></div><div class="col-lg-3"><div class="ibox float-e-margins"><div class="ibox-title"><span class="label label-danger pull-right">Annual</span><h5>Unparsed</h5></div><div class="ibox-content"><h1 class="no-margins" ng-bind="dc.cardsData.unparsed_count"></h1><div class="stat-percent font-bold text-danger">38% <i class="fa fa-level-down"></i></div><small>total unparsed</small></div></div></div></div></div><div class="row"><div class="col-lg-6"><div class="ibox float-e-margins"><div class="ibox-title">Total Invoices(month-wise)<div ibox-tools=""></div></div><div class="ibox-content"><span ng-if="!dc.getInvoiceDataPromise"><highchart id="chart1" config="dc.graphOptions"></highchart></span><div class="text-center" ng-if="dc.getInvoiceDataPromise">Loading...</div></div></div></div><div class="col-lg-6"><div class="ibox float-e-margins"><div class="ibox-title">Total Invoices(percentage)<div ibox-tools=""></div></div><div class="ibox-content"><span ng-if="!dc.cardsPromise"><highchart id="chart1" config="dc.dashboardPieOptions"></highchart></span><div class="text-center" ng-if="dc.cardsPromise">Loading...</div></div></div></div></div><div class="row"><div class="col-lg-12"><div class="ibox float-e-margins"><div class="ibox-title">Last 10 Transactions<div ibox-tools=""></div></div><div class="ibox-content"><div class="text-center" ng-if="dc.latestInvoicesPromise">Loading...</div><span ng-if="!dc.latestInvoicesPromise"><table class="table table-striped table-bordered table-hover"><thead class="thead-inverse"><tr><th>Employee</th><th>File</th><th>Issuer</th><th>Partner</th><th>Invoice No</th><th>Processed Date</th><th>Status</th></tr></thead><tbody><tr ng-repeat="row in dc.latestInvoicesData | orderBy:\'processed_date\' | limitTo: 10"><td class="text-capitalize">{{row.username}}</td><td class="text-capitalize">{{row.file_name}}</td><td>{{row.issuer}}</td><td>{{row.partner_name}}</td><td>{{row.invoice_number}}</td><td class="text-capitalize">{{row.processed_date | date}}</td><td class="text-capitalize"><small ng-if="row.parsed" class="label label-primary"><i class="fa fa-check"></i> Parsed</small> <small ng-if="!row.parsed" class="label label-danger"><i class="fa fa-times"></i> Unparsed</small></td></tr></tbody></table></span></div></div></div></div></div><div class="row" ng-if="UserType===\'U\'"><div class="col-lg-12"><div class="row"><div class="col-lg-4"><div class="ibox float-e-margins"><div class="ibox-title"><span class="label label-info pull-right">Annual</span><h5>Files</h5></div><div class="ibox-content"><h1 class="no-margins" ng-bind="(dc.userCardsData.parsed_count)+(dc.userCardsData.unparsed_count)"></h1><div class="stat-percent font-bold text-info">20% <i class="fa fa-level-up"></i></div><small>New files</small></div></div></div><div class="col-lg-4"><div class="ibox float-e-margins"><div class="ibox-title"><span class="label label-primary pull-right">Today</span><h5>Parsed</h5></div><div class="ibox-content"><h1 class="no-margins" ng-bind="dc.userCardsData.parsed_count"></h1><div class="stat-percent font-bold text-navy">44% <i class="fa fa-level-up"></i></div><small>Total parsed</small></div></div></div><div class="col-lg-4"><div class="ibox float-e-margins"><div class="ibox-title"><span class="label label-danger pull-right">Annual</span><h5>Unparsed</h5></div><div class="ibox-content"><h1 class="no-margins" ng-bind="dc.userCardsData.unparsed_count"></h1><div class="stat-percent font-bold text-danger">38% <i class="fa fa-level-down"></i></div><small>total unparsed</small></div></div></div></div><div class="row"><div class="col-lg-12"><div class="ibox float-e-margins"><div class="ibox-title">Last 10 Parsed Invoices<div ibox-tools=""></div></div><div class="ibox-content"><div class="text-center" ng-if="dc.parsedPromise">Loading...</div><span ng-if="!dc.parsedPromise"><table class="table table-striped table-bordered table-hover"><thead class="thead-inverse"><tr><th>Employee</th><th>Issuer</th><th>Partner</th><th>Invoice No</th><th>Processed Date</th></tr></thead><tbody><tr ng-repeat="row in dc.parsedData | orderBy:\'processed_date\' | limitTo: 10"><td>{{row.date_invoice | date}}</td><td>{{row.issuer}}</td><td>{{row.partner_name}}</td><td>{{row.invoice_number}}</td><td class="text-capitalize">{{row.processed_date | date}}</td></tr></tbody></table></span></div></div></div></div><div class="row"><div class="col-lg-12"><div class="ibox float-e-margins"><div class="ibox-title">Last 10 Unparsed Invoices<div ibox-tools=""></div></div><div class="ibox-content"><div class="text-center" ng-if="dc.unParsedPromise">Loading...</div><span ng-if="!dc.unParsedPromise"><table class="table table-striped table-bordered table-hover"><thead class="thead-inverse"><tr><th>Employee</th><th>File</th><th>Issuer</th><th>Partner</th><th>Invoice No</th><th>Processed Date</th><th>Status</th><th>Action</th></tr></thead><tbody><tr ng-repeat="row in dc.unParsedData | orderBy:\'processed_date\' | limitTo: 10"><td class="text-capitalize">{{row.username}}</td><td class="text-capitalize">{{row.file_name}}</td><td>{{row.issuer}}</td><td>{{row.partner_name}}</td><td>{{row.invoice_number}}</td><td class="text-capitalize">{{row.processed_date | date}}</td><td class="text-capitalize"><small ng-if="row.parsed" class="label label-primary"><i class="fa fa-check"></i> Parsed</small> <small ng-if="!row.parsed" class="label label-danger"><i class="fa fa-times"></i> Unparsed</small></td><td><button class="btn btn-xs btn-primary" ng-click="dc.edit(row)"><i class="fa fa-edit"></i> Edit</button></td></tr><tr ng-if="!dc.unParsedData.length" class="text-center"><td colspan="100%">No data found</td></tr></tbody></table></span></div></div></div></div></div></div></div></div></div>'),e.put("app/components/common/content.html",'<div id="wrapper"><div ng-include="\'app/components/common/navigation.html\'"></div><div id="page-wrapper" class="gray-bg {{$state.current.name}}"><div ng-include="\'app/components/common/topnavbar.html\'"></div><div ui-view=""></div><div ng-include="\'app/components/common/footer.html\'"></div></div></div>'),e.put("app/components/common/footer.html",'<div class="footer"><div><strong>Copyright</strong> Experion Technologies &copy; 2017</div></div>'),e.put("app/components/common/ibox_tools.html",'<div class="ibox-tools" uib-dropdown=""><a ng-click="showhide()"><i class="fa fa-chevron-up"></i></a> <a uib-dropdown-toggle="" href=""><i class="fa fa-wrench"></i></a><ul uib-dropdown-menu=""><li><a href="">Config option 1</a></li><li><a href="">Config option 2</a></li></ul><a ng-click="closebox()"><i class="fa fa-times"></i></a></div>'),e.put("app/components/common/navigation.html",'<nav class="navbar-default navbar-static-side" role="navigation"><div class="sidebar-collapse"><ul side-navigation="" class="nav metismenu" id="side-menu"><li class="nav-header"><div class="profile-element" uib-dropdown=""><a href=""><span class="clear"><span class="block m-t-xs"><strong class="font-bold">{{main.userName}}</strong></span></span></a><ul uib-dropdown-menu="" class="animated flipInX m-t-xs"><li><a href="">Logout</a></li></ul></div><div class="logo-element">Exp RPA</div></li><li ui-sref-active="active"><a ui-sref="index.main"><i class="fa fa-tachometer"></i> <span class="nav-label">Dashboard</span></a></li><li ui-sref-active="active"><a ui-sref="index.invoices"><i class="fa fa-files-o"></i> <span class="nav-label">Invoices</span></a></li></ul></div></nav>'),e.put("app/components/common/topnavbar.html",'<div class="row border-bottom"><nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0"><div class="navbar-header"><span minimaliza-sidebar=""></span></div><ul class="nav navbar-top-links navbar-right"><li><a ng-click="main.logout()" href=""><i class="fa fa-sign-out"></i> Log out</a></li></ul></nav></div>')}]);
//# sourceMappingURL=../maps/scripts/app-d314d56635.js.map