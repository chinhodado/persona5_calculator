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
            let arcanaIndex = Object.keys(rareCombos).indexOf(item.arcana);
            let arcanaValue = arcanaIndex >= 10 ? arcanaIndex.toString() : "0" + arcanaIndex;

            let level = 100 - item.level;
            let levelValue = level >= 10 ? level.toString() : ("0" + level);
            
            return arcanaValue + levelValue;
        }
        else {
            return item[sortBy];
        }
    }
}
