///<reference path="DataUtil.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
class PersonaListController {
    constructor($scope) {
        $scope.personaList = personaList;

        // set the default sort param
        $scope.sortBy = 'level';
        $scope.reverse = false;
    }
}
