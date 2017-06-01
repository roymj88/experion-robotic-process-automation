'use strict';

angular.module('inspinia')
  .controller('DashboardController', function ($rootScope, $state, mainService, $timeout) {

    var vm = this;

    if($rootScope.UserType == "A"){

	    // Cards 
	    vm.cardsPromise = true;
	    mainService.getCardsDataRequest().then(function(result){
			vm.cardsData = result.data.data;
			vm.cardsPromise = false;

			var parsed_count = result.data.data.parsed_count;
			var unparsed_count = result.data.data.unparsed_count;
			var total = result.data.data.total_files;
			
			var parsedPercent = (parsed_count/total)*100;
			var unparsedPercent = (unparsed_count/total)*100;

			var dashboardPieOptions =  {
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
		            type: 'pie'
		        },
		        title: {
		            text: ''
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: false
		                },
		                showInLegend: true
		            }
		        },
		        series: [{
		            name: 'Brands',
		            colorByPoint: true,
		            data: [{
		                name: 'Parsed',
		                y: parsedPercent
		            }, {
		                name: 'Unparsed',
		                y: unparsedPercent,
		                sliced: true,
		                selected: true
		            }]
		        }]
		    };
			vm.dashboardPieOptions = dashboardPieOptions;


		});

		vm.getInvoiceDataPromise = true;

		mainService.getInvoiceDataRequest().then(function(invoiceData){
			

			vm.getInvoiceDataPromise = false;
			var graphDataCategories = invoiceData.data.data.categories;
			var graphDataSeries = invoiceData.data.data.series;
			var dashboardGraphOptions =  {
			    chart: {
			        type: 'line'
			    },
			    title: {
			        text: ''
			    },
			    subtitle: {
			        text: ''
			    },
			    xAxis: {
			        categories: graphDataCategories
			    },
			    yAxis: {
			        title: {
			            text: ''
			        }
			    },
			    plotOptions: {
			        line: {
			            dataLabels: {
			                enabled: true
			            },
			            enableMouseTracking: false
			        }
			    },
			    series: graphDataSeries,
			    responsive: {
			        rules: [{
			            condition: {
			                maxWidth: 1000
			            },
			            chartOptions: {
			                legend: {
			                    align: 'center',
			                    verticalAlign: 'bottom',
			                    layout: 'horizontal'
			                },
			                yAxis: {
			                    labels: {
			                        align: 'left',
			                        x: 0,
			                        y: -5
			                    },
			                    title: {
			                        text: null
			                    }
			                },
			                subtitle: {
			                    text: null
			                },
			                credits: {
			                    enabled: false
			                }
			            }
			        }]
			    }
			};

			vm.graphOptions = dashboardGraphOptions;

		});


	    vm.latestInvoicesPromise = true;
	    mainService.getLatestInvoicesDataRequest().then(function(result){
			vm.latestInvoicesData = result.data.data;
			vm.latestInvoicesPromise = false;

		});
	}



    if($rootScope.UserType == "U"){
		// User Cards 
	    vm.userCardsPromise = true;
	    mainService.getUserCardsDataRequest().then(function(result){
			vm.userCardsData = result.data.data[0];
			vm.userCardsPromise = false;
		});

	    // Parsed List
	    vm.parsedPromise = true;
	    mainService.getUserParsedDataRequest().then(function(result){
	    	console.log(result);
			vm.parsedData = result.data.data;
			vm.parsedPromise = false;

		});


	    // UnParsed List
	    vm.unParsedPromise = true;
	    mainService.getUserUnParsedDataRequest().then(function(result){
	    	console.log(result);
			vm.unParsedData = result.data.data;
			vm.unParsedPromise = false;

		});

	}

	vm.edit = function(obj){
		vm.editInvoice = obj;






		bootbox.dialog({
			buttons: [
				{
					label: "Save",
					className: "btn btn-success",
					callback: function() {

						var dataToSend = {
							"date_due": "03-09-2016",
							"processed_date": "2017-02-24 17:07:08",
							"partner_name": $('#partner_name').val(),
							"file_name": "INV-8516-17.pdf",
							"date_invoice": "19-08-2016",
							"currency": "USD",
							"amount": "7953",
							"invoice_number": $('#invoice_number').val(),
							"desc": "Invoice INV-85/16-17 from Experion Technologies",
							"issuer": $('#issuer').val()
						}

						mainService.updateUnparsedDataRequest(dataToSend).then(function(result){
					    	bootbox.alert("Successfully Updated");
						});
					}
				},
				{
					label: "Close",
					className: "btn btn-default",
					callback: function() {

					}
				}
			],
    		message: '<div class="form-group"> <label for="Issuer">Issuer:</label> <input id="issuer" ng-model="dc.editInvoice.issuer" type="text" class="form-control"> </div><div class="form-group"> <label for="Partner">Partner:</label> <input ng-model="dc.editInvoice.partner_name" type="text" class="form-control" id="partner_name"> </div><div class="form-group"> <label for="InvoiceNo">Invoice No:</label> <input ng-model="dc.editInvoice.invoice_number" type="text" class="form-control" id="invoice_number"> </div>',
		});
	}

  });
