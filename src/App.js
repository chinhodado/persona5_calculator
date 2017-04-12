///<reference path="PersonaController.ts"/>
///<reference path="PersonaListController.ts"/>
///<reference path="SkillListController.ts"/>
var myModule = angular.module('myModule', ['ngRoute']);
myModule.controller('PersonaController', ['$scope', PersonaController]);
myModule.controller('PersonaListController', ['$scope', PersonaListController]);
myModule.config(function ($routeProvider) {
    $routeProvider.when('/list', { templateUrl: 'list.html', controller: PersonaListController });
    $routeProvider.when('/skill', { templateUrl: 'skill.html', controller: SkillListController });
    $routeProvider.when('/persona/:persona_name', { templateUrl: 'persona.html', controller: PersonaController });
});
myModule.run(function ($rootScope, $location, $route, $window) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if (!$location.path()) {
            $location.path('/list');
            $route.reload();
        }
        else {
            $window.scrollTo(0, 0);
        }
    });
});
