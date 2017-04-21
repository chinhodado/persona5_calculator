///<reference path="FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="../data/SkillData.ts"/>

/**
 * Created by Chin on 08-Apr-17.
 */
class PersonaController {
    $scope;
    $filter;

    constructor($scope, $routeParams, $filter) {
        let personaName = $routeParams.persona_name;
        this.$filter = $filter;
        this.$scope = $scope;
        this.$scope.Math = Math;

        this.$scope.personaName = personaName;
        this.$scope.persona = personaMap[personaName];
        if (!this.$scope.persona) return;

        this.$scope.allRecipes = FusionCalculator.getRecipes(this.$scope.persona);
        this.$scope.allRecipes.sort((a,b) => a.cost - b.cost);
        this.$scope.maxCost = 0;

        for (let i = 0, recipe = null; recipe = this.$scope.allRecipes[i]; i++) {
            recipe.num = i;
            this.$scope.maxCost = Math.max(this.$scope.maxCost, recipe.cost);
        }

        let compediumEntry = personaMap[personaName];
        this.$scope.persona.stats = compediumEntry.stats;
        this.$scope.persona.statsHeader = ["Strength", "Magic", "Endurance", "Agility", "Luck"];

        // split the table into 2 for mobile
        let elems = getElems(personaName);
        this.$scope.persona.elems = elems;
        this.$scope.persona.elems1 = elems.slice(0,5);
        this.$scope.persona.elems2 = elems.slice(5);

        // split the table into 2 for mobile
        let elemsHeader = ["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychic", "Nuclear", "Bless", "Curse"];
        this.$scope.persona.elemsHeader = elemsHeader;
        this.$scope.persona.elemsHeader1 = elemsHeader.slice(0,5);
        this.$scope.persona.elemsHeader2 = elemsHeader.slice(5);

        // Note: skillList are skills in a sorted list for displaying with Angular.
        // It's different from the existing skills property which is a map.
        this.$scope.persona.skillList = getSkills(personaName);

        this.$scope.perPage = 100;
        this.$scope.lastPage = Math.floor(this.$scope.allRecipes.length / this.$scope.perPage);
        this.$scope.pageNum = 0;
        this.$scope.$watch('filterStr', this.paginateAndFilter.bind(this));
        this.$scope.$watch('filterStr', this.resetPage.bind(this));
        this.$scope.$watch('pageNum', this.paginateAndFilter.bind(this), false);
    }

    /**
     * Note: this can the scope that is passed in, or this.$scope.
     * Using the passed in scope for brevity.
     */
    paginateAndFilter(newVal, oldVal, scope) {
        if (scope.pageNum < 0) scope.pageNum = 0;
        if (scope.pageNum > scope.lastPage) scope.pageNum = scope.lastPage;

        if (scope.filterStr) {
            scope.recipes = this.$filter('filter')(scope.allRecipes, scope.filterStr);
        }
        else {
            scope.recipes = scope.allRecipes;
        }

        scope.numRecipes = scope.recipes.length;
        scope.recipes = scope.recipes.slice(
            scope.pageNum * scope.perPage,
            scope.pageNum * scope.perPage + scope.perPage
        );
    }

    resetPage(newVal, oldVal, scope) {
        scope.pageNum = 0;
    }
}



