///<reference path="../data/Data5.ts"/>

/**
 * Created by Chin on 08-Apr-17.
 */
class ListCtrl {
    constructor($scope, $routeParams) {
        $scope.personae = personae;
        $scope.sortBy = $routeParams.sort_by || 'level';
    }
}
