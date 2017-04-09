///<reference path="../data/Data5.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var ListCtrl = (function () {
    function ListCtrl($scope, $routeParams) {
        $scope.personae = personae;
        $scope.sortBy = $routeParams.sort_by || 'level';
    }
    return ListCtrl;
}());
