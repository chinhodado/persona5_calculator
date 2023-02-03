///<reference path="DataUtil.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var PersonaListController = /** @class */ (function () {
    function PersonaListController($scope) {
        this.$scope = $scope;
        $scope.fullPersonaList = fullPersonaList;
        // set the default sort param
        $scope.sortBy = 'level';
        $scope.sortReverse = false;
        $scope.sortFunc = this.getSortValue.bind(this);
    }
    PersonaListController.prototype.getSortValue = function (item) {
        var sortBy = this.$scope.sortBy;
        if (sortBy === "arcana") {
            var arcanaIndex = Object.keys(rareCombos).indexOf(item.arcana);
            var arcanaValue = arcanaIndex >= 10 ? arcanaIndex.toString() : "0" + arcanaIndex;
            var level = 100 - item.level;
            var levelValue = level >= 10 ? level.toString() : ("0" + level);
            return arcanaValue + levelValue;
        }
        else {
            return item[sortBy];
        }
    };
    return PersonaListController;
}());
