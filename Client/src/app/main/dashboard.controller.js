'use strict';

angular.module('inspinia')
  .controller('DashboardController', function ($rootScope, $state, mainService, $timeout) {

    var vm = this;

    // Cards 
    vm.cardsPromise = true;
    mainService.getCardsDataRequest().then(function(result){
		vm.cardsData = result.data.data;
		vm.cardsPromise = false;
	});

	vm.graphPromise = true;
    // mainService.getGraphDataRequest().then(function(result){
		// var graphDataCategories = result.data.data.categories;
		// var graphDataSeries = result.data.data.series;
		var graphDataCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var graphDataSeries = [{
	        name: 'Parsed',
	        data: [70, 69, 95, 145, 184, 215, 252, 265, 233, 183, 139, 96]
	    }, {
	        name: 'Unparsed',
	        data: [39, 42, 57, 85, 119, 152, 170, 166, 142, 103, 66, 48]
	    }];

		vm.graphPromise = false;
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
                y: 56.33
            }, {
                name: 'Unparsed',
                y: 24.03,
                sliced: true,
                selected: true
            }]
        }]
    };

    vm.latestInvoicesPromise = true;
    mainService.getLatestInvoicesDataRequest().then(function(result){
		vm.latestInvoicesData = result.data.data;
		vm.latestInvoicesPromise = false;

	});

	vm.dashboardPieOptions = dashboardPieOptions;



  });
