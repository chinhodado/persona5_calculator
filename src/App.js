///<reference path="CalcCtrl.ts"/>
///<reference path="ListCtrl.ts"/>
var myModule = angular.module('myModule', ['ngRoute']);
myModule.controller('CalcCtrl', ['$scope', CalcCtrl]);
myModule.controller('ListCtrl', ['$scope', ListCtrl]);
myModule.config(function ($routeProvider) {
    $routeProvider.when('/list', { templateUrl: 'list.html', controller: ListCtrl });
    $routeProvider.when('/list/:sort_by', { templateUrl: 'list.html', controller: ListCtrl });
    $routeProvider.when('/persona/:persona_name', { templateUrl: 'calc.html', controller: CalcCtrl });
});
myModule.run(function ($rootScope, $location, $route, $window) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if (!$location.path()) {
            $location.path('/list/level');
            $route.reload();
        }
        else {
            $window.scrollTo(0, 0);
        }
    });
});
