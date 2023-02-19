///<reference path="FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="../data/SkillData.ts"/>
///<reference path="../data/ItemData.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var PersonaController = /** @class */ (function () {
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
        var fusionTo = {
            allRecipes: fusionToRecipes,
            recipes: fusionToRecipes,
            numRecipes: fusionToRecipes.length,
            lastPage: Math.floor(fusionToRecipes.length / this.$scope.perPage),
            pageNum: 0,
            filterStr: ""
        };
        this.$scope.fusionTo = fusionTo;
        this.$scope.$watch('fusionTo.filterStr', this.getPaginateAndFilterFunc(false).bind(this));
        this.$scope.$watch('fusionTo.filterStr', this.getResetPageFunc(false).bind(this));
        this.$scope.$watch('fusionTo.pageNum', this.getPaginateAndFilterFunc(false).bind(this));
        // fusion from
        var fusionFromRecipes = calc.getAllResultingRecipesFrom(this.$scope.persona);
        fusionFromRecipes.sort(function (a, b) { return a.cost - b.cost; });
        for (var i = 0, recipe = null; recipe = fusionFromRecipes[i]; i++) {
            recipe.num = i;
        }
        var fusionFrom = {
            allRecipes: fusionFromRecipes,
            recipes: fusionFromRecipes,
            numRecipes: fusionFromRecipes.length,
            lastPage: Math.floor(fusionFromRecipes.length / this.$scope.perPage),
            pageNum: 0,
            filterStr: ""
        };
        this.$scope.fusionFrom = fusionFrom;
        this.$scope.$watch('fusionFrom.filterStr', this.getPaginateAndFilterFunc(true).bind(this));
        this.$scope.$watch('fusionFrom.filterStr', this.getResetPageFunc(true).bind(this));
        this.$scope.$watch('fusionFrom.pageNum', this.getPaginateAndFilterFunc(true).bind(this));
        // stats
        var compediumEntry = personaMap[personaName];
        this.$scope.persona.stats = compediumEntry.stats;
        this.$scope.persona.statsHeader = ["Strength", "Magic", "Endurance", "Agility", "Luck"];
        //item data
        var item = compediumEntry.item;
        if(compediumEntry.skillCard) {
            this.$scope.persona.itemData = getSkillCardInfo(item);
            if(compediumEntry.itemr) {
                var itemr = compediumEntry.itemr;
                this.$scope.persona.itemDataR = getSkillCardInfo(itemr);
            }
            this.$scope.persona.itemDataHeader = ["Type", "Name", "Effect", "Cost"];
        }
        else {
            this.$scope.persona.itemData = getItem(item);
            if(compediumEntry.itemr) {
                var itemr = compediumEntry.itemr;
                this.$scope.persona.itemDataR = getItem(itemr);
            }
            this.$scope.persona.itemDataHeader = ["Type", "Name", "Description"];
        }
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

        //inheritance data
        var inheritanceHeader = ["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychic", "Nuclear", "Bless", "Curse", "Healing", "Ailment"];
        this.$scope.persona.inheritanceHeader = inheritanceHeader;
        this.$scope.persona.inheritanceHeader1 = inheritanceHeader.slice(0,6);
        this.$scope.persona.inheritanceHeader2 = inheritanceHeader.slice(6);

        if(compediumEntry.inherits) {
            var inheritanceType = compediumEntry.inherits;
            var inheritance = getInheritance(inheritanceType);
            this.$scope.persona.inheritance = inheritance;
            this.$scope.persona.inheritance1 = inheritance.slice(0,6);
            this.$scope.persona.inheritance2 = inheritance.slice(6);
        }
    }
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
        var totalPageCount = Math.ceil(fusionFromTo.recipes.length / this.$scope.perPage);
        fusionFromTo.lastPage = Math.max(0, totalPageCount - 1);
        fusionFromTo.numRecipes = fusionFromTo.recipes.length;
        fusionFromTo.recipes = fusionFromTo.recipes.slice(fusionFromTo.pageNum * this.$scope.perPage, fusionFromTo.pageNum * this.$scope.perPage + this.$scope.perPage);
    };
    PersonaController.prototype.getPaginateAndFilterFunc = function (isFusionFrom) {
        var _this = this;
        return function (newVal, oldVal, scope) { return _this.paginateAndFilter(isFusionFrom ? scope.fusionFrom : scope.fusionTo, _this.getRecipeFilterFunc(isFusionFrom)); };
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
        return function (newVal, oldVal, scope) { return _this.resetPage(isFusionFrom ? scope.fusionFrom : scope.fusionTo); };
    };
    return PersonaController;
}());
