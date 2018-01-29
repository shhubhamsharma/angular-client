var myapp = angular.module('myapp', ['ui.router','chart.js']);

myapp.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    
$urlRouterProvider.otherwise("/");
        $stateProvider
            .state('search', {
                url: "/search",
                templateUrl: "app/templates/search.html",
                data: { requireLogin: false }
            })

        });