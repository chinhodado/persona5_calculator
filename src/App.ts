///<reference path="CalcCtrl.ts"/>
///<reference path="ListCtrl.ts"/>

angular.service('myAngularApp', function ($route, $location, $window) {
    $route.when('/list', {template: 'list.html', controller: ListCtrl});
    $route.when('/list/:sort_by', {template: 'list.html', controller: ListCtrl});
    $route.when('/persona/:persona_name', {template: 'calc.html', controller: CalcCtrl});

    let self = this;
    $route.onChange(() => {
        if (!$route.current) {
            $location.updateHash('/list/level');
            self.$eval();
        } else {
            $route.current.scope.params = $route.current.params;
            $window.scrollTo(0, 0);
        }
    });
}, {$inject: ['$route', '$location', '$window'], $eager: true});