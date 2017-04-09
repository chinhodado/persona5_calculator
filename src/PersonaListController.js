///<reference path="../data/Data5.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var PersonaListController = (function () {
    function PersonaListController($scope, $routeParams) {
        $scope.personae = personae;
        $scope.sortBy = $routeParams.sort_by || 'level';
    }
    return PersonaListController;
}());
