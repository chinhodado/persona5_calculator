///<reference path="DataUtil.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
class PersonaListController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
        $scope.fullPersonaList = fullPersonaList;

        // set the default sort param
        $scope.sortBy = 'level';
        $scope.sortReverse = false;
        $scope.sortFunc = this.getSortValue.bind(this);
    }

    private getSortValue(item) {
        let sortBy = this.$scope.sortBy;
        if (sortBy === "arcana") {
            return item.arcana + (item.level >= 10? item.level : ("0" + item.level));
        }
        else {
            return item[sortBy];
        }
    }
}
