///<reference path="../data/Data5.ts"/>

/**
 * Created by Chin on 08-Apr-17.
 */
class PersonaListController {
    constructor($scope, $routeParams) {
        $scope.personae = personae;

        // set the default sort param
        $scope.sortBy = 'level';
        $scope.reverse = false;
    }
}
