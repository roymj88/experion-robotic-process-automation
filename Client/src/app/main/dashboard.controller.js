'use strict';

angular.module('inspinia')
  .controller('DashboardController', function ($rootScope, $state, mainService, $timeout) {

    var vm = this;
    $rootScope.userRole = "user";

    if($rootScope.userRole ==="admin"){

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

		// mainService.getInvoiceDataRequest().then(function(invoiceData){
			var invoiceData = {
			    "status": 1,
			    "message": "Successfully loaded dash info",
			    "code": 200,
			    "data": {
			        "categories": [
			            "Jan",
			            "Feb",
			            "Mar",
			            "Apr",
			            "May",
			            "Jun",
			            "Jul",
			            "Aug",
			            "Sep",
			            "Oct",
			            "Nov",
			            "Dec"
			        ],
			        "series": [{
			                "name": "Parsed",
			                "data": [
			                    0,
			                    0,
			                    18,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0
			                ]
			            },
			            {
			                "name": "UnParsed",
			                "data": [
			                    0,
			                    0,
			                    7,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0,
			                    0
			                ]
			            }
			        ]
			    }
			};
			vm.getInvoiceDataPromise = false;
			var graphDataCategories = invoiceData.data.categories;
			var graphDataSeries = invoiceData.data.series;
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

		// });


	    vm.latestInvoicesPromise = true;
	    mainService.getLatestInvoicesDataRequest().then(function(result){
	    	console.log(result);
			vm.latestInvoicesData = result.data.data;
			vm.latestInvoicesPromise = false;

		});
	}




    if($rootScope.userRole ==="user"){
		// User Cards 
	    vm.userCardsPromise = true;
	    mainService.getUserCardsDataRequest().then(function(result){
			vm.userCardsData = result.data.data[0];
			vm.userCardsPromise = false;

			// var parsed_count = result.data.data.parsed_count;
			// var unparsed_count = result.data.data.unparsed_count;
			// var total = result.data.data.total_files;
		});

	}

  });
