///<reference path="FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="../data/SkillData.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var PersonaController = (function () {
    function PersonaController($scope, $routeParams, $filter) {
        var personaName = $routeParams.persona_name;
        this.$filter = $filter;
        this.$scope = $scope;
        this.$scope.Math = Math;
        this.$scope.personaName = personaName;
        this.$scope.persona = personaMap[personaName];
        if (!this.$scope.persona)
            return;
        var calc = new FusionCalculator(customPersonaeByArcana);
        this.$scope.perPage = 20;
        // fusion to
        var fusionToRecipes = calc.getRecipes(this.$scope.persona);
        fusionToRecipes.sort(function (a, b) { return a.cost - b.cost; });
        for (var i = 0, recipe = null; recipe = fusionToRecipes[i]; i++) {
            recipe.num = i;
        }
        this.$scope.fusionTo = {};
        this.$scope.fusionTo.allRecipes = fusionToRecipes;
        this.$scope.fusionTo.lastPage = Math.floor(this.$scope.fusionTo.allRecipes.length / this.$scope.perPage);
        this.$scope.fusionTo.pageNum = 0;
        this.$scope.$watch('fusionTo.filterStr', this.getPaginateAndFilterFunc(false).bind(this));
        this.$scope.$watch('fusionTo.filterStr', this.getResetPageFunc(false).bind(this));
        this.$scope.$watch('fusionTo.pageNum', this.getPaginateAndFilterFunc(false).bind(this), false);
        // fusion from
        var fusionFromRecipes = calc.getAllResultingRecipesFrom(this.$scope.persona);
        fusionFromRecipes.sort(function (a, b) { return a.cost - b.cost; });
        for (var i = 0, recipe = null; recipe = fusionFromRecipes[i]; i++) {
            recipe.num = i;
        }
        this.$scope.fusionFrom = {};
        this.$scope.fusionFrom.allRecipes = fusionFromRecipes;
        this.$scope.fusionFrom.lastPage = Math.floor(this.$scope.fusionFrom.allRecipes.length / this.$scope.perPage);
        this.$scope.fusionFrom.pageNum = 0;
        this.$scope.$watch('fusionFrom.filterStr', this.getPaginateAndFilterFunc(true).bind(this));
        this.$scope.$watch('fusionFrom.filterStr', this.getResetPageFunc(true).bind(this));
        this.$scope.$watch('fusionFrom.pageNum', this.getPaginateAndFilterFunc(true).bind(this), false);
        // stats
        var compediumEntry = personaMap[personaName];
        this.$scope.persona.stats = compediumEntry.stats;
        this.$scope.persona.statsHeader = ["Strength", "Magic", "Endurance", "Agility", "Luck"];
        // elements
        // split the table into 2 for mobile
        var elems = getElems(personaName);
        this.$scope.persona.elems = elems;
        this.$scope.persona.elems1 = elems.slice(0, 5);
        this.$scope.persona.elems2 = elems.slice(5);
        // split the table into 2 for mobile
        var elemsHeader = ["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychic", "Nuclear", "Bless", "Curse"];
        this.$scope.persona.elemsHeader = elemsHeader;
        this.$scope.persona.elemsHeader1 = elemsHeader.slice(0, 5);
        this.$scope.persona.elemsHeader2 = elemsHeader.slice(5);
        // Note: skillList are skills in a sorted list for displaying with Angular.
        // It's different from the existing skills property which is a map.
        this.$scope.persona.skillList = getSkills(personaName);
    }
    /**
     * Note: this can the scope that is passed in, or this.$scope.
     * Using the passed in scope for brevity.
     */
    PersonaController.prototype.paginateAndFilter = function (fusionFromTo, filterFunc) {
        if (fusionFromTo.pageNum < 0)
            fusionFromTo.pageNum = 0;
        if (fusionFromTo.pageNum > fusionFromTo.lastPage)
            fusionFromTo.pageNum = fusionFromTo.lastPage;
        if (fusionFromTo.filterStr) {
            fusionFromTo.recipes = this.$filter('filter')(fusionFromTo.allRecipes, filterFunc(fusionFromTo.filterStr));
        }
        else {
            fusionFromTo.recipes = fusionFromTo.allRecipes;
        }
        fusionFromTo.numRecipes = fusionFromTo.recipes.length;
        fusionFromTo.recipes = fusionFromTo.recipes.slice(fusionFromTo.pageNum * this.$scope.perPage, fusionFromTo.pageNum * this.$scope.perPage + this.$scope.perPage);
    };
    PersonaController.prototype.getPaginateAndFilterFunc = function (isFusionFrom) {
        var _this = this;
        if (isFusionFrom) {
            return function (newVal, oldVal, scope) { return _this.paginateAndFilter(scope.fusionFrom, _this.getRecipeFilterFunc(true)); };
        }
        else {
            return function (newVal, oldVal, scope) { return _this.paginateAndFilter(scope.fusionTo, _this.getRecipeFilterFunc(false)); };
        }
    };
    PersonaController.prototype.getRecipeFilterFunc = function (isFusionFrom) {
        var containsIgnoreCase = function (str, filter) { return str.toLowerCase().indexOf(filter.toLowerCase()) !== -1; };
        if (isFusionFrom) {
            return function (filterString) { return function (recipe, index, array) {
                return containsIgnoreCase(recipe.sources[1].name, filterString) || containsIgnoreCase(recipe.result.name, filterString);
            }; };
        }
        else {
            return function (filterString) { return function (recipe, index, array) {
                for (var i = 0; i < recipe.sources.length; i++) {
                    if (containsIgnoreCase(recipe.sources[i].name, filterString)) {
                        return true;
                    }
                }
                return false;
            }; };
        }
    };
    PersonaController.prototype.resetPage = function (fusionFromTo) {
        fusionFromTo.pageNum = 0;
    };
    PersonaController.prototype.getResetPageFunc = function (isFusionFrom) {
        var _this = this;
        if (isFusionFrom) {
            return function (newVal, oldVal, scope) { return _this.resetPage(scope.fusionFrom); };
        }
        else {
            return function (newVal, oldVal, scope) { return _this.resetPage(scope.fusionTo); };
        }
    };
    return PersonaController;
}());
