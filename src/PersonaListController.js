///<reference path="DataUtil.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var PersonaListController = (function () {
    function PersonaListController($scope) {
        $scope.fullPersonaList = fullPersonaList;
        // set the default sort param
        $scope.sortBy = 'level';
        $scope.reverse = false;
    }
    return PersonaListController;
}());
