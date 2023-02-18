///<reference path="FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="../data/SkillData.ts"/>
///<reference path="../data/ItemData.ts"/>
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

        let calc = new FusionCalculator(customPersonaeByArcana);

        this.$scope.perPage = 20;

        // fusion to
        let fusionToRecipes = calc.getRecipes(this.$scope.persona);
        fusionToRecipes.sort((a,b) => a.cost - b.cost);
        for (let i = 0, recipe = null; recipe = fusionToRecipes[i]; i++) {
            recipe.num = i;
        }
        let fusionTo : FusionDataModel = {
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
        let fusionFromRecipes = calc.getAllResultingRecipesFrom(this.$scope.persona);
        fusionFromRecipes.sort((a,b) => a.cost - b.cost);
        for (let i = 0, recipe = null; recipe = fusionFromRecipes[i]; i++) {
            recipe.num = i;
        }
        let fusionFrom : FusionDataModel = {
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
        let compediumEntry = personaMap[personaName];
        this.$scope.persona.stats = compediumEntry.stats;
        this.$scope.persona.statsHeader = ["Strength", "Magic", "Endurance", "Agility", "Luck"];

        //item data
        let item = compediumEntry.item;
        if(compediumEntry.skillCard) {
            this.$scope.persona.itemData = getSkillCardInfo(item);
            if(compediumEntry.itemr) {
                let itemr = compediumEntry.itemr;
                this.$scope.persona.itemDataR = getSkillCardInfo(itemr);
            }
            this.$scope.persona.itemDataHeader = ["Type", "Name", "Effect", "Cost"];
        }
        else {
            this.$scope.persona.itemData = getItem(item);
            if(compediumEntry.itemr) {
                let itemr = compediumEntry.itemr;
                this.$scope.persona.itemDataR = getItem(itemr);
            }
            this.$scope.persona.itemDataHeader = ["Type", "Name", "Description"];
        }

        // elements
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

        //inheritance data
        let inheritanceHeader = ["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychic", "Nuclear", "Bless", "Curse", "Healing", "Ailment"];
        this.$scope.persona.inheritanceHeader = inheritanceHeader;
        this.$scope.persona.inheritanceHeader1 = inheritanceHeader.slice(0,6);
        this.$scope.persona.inheritanceHeader2 = inheritanceHeader.slice(6);

        if(compediumEntry.inherits) {
            let inheritanceType = compediumEntry.inherits;
            let inheritance = getInheritance(inheritanceType);
            this.$scope.persona.inheritance = inheritance;
            this.$scope.persona.inheritance1 = inheritance.slice(0,6);
            this.$scope.persona.inheritance2 = inheritance.slice(6);
        }
    }

    private paginateAndFilter(fusionFromTo: FusionDataModel, filterFunc) {
        if (fusionFromTo.pageNum < 0) fusionFromTo.pageNum = 0;
        if (fusionFromTo.pageNum > fusionFromTo.lastPage) fusionFromTo.pageNum = fusionFromTo.lastPage;

        if (fusionFromTo.filterStr) {
            fusionFromTo.recipes = this.$filter('filter')(fusionFromTo.allRecipes, filterFunc(fusionFromTo.filterStr));
        }
        else {
            fusionFromTo.recipes = fusionFromTo.allRecipes;
        }

        const totalPageCount = Math.ceil(fusionFromTo.recipes.length / this.$scope.perPage);
        fusionFromTo.lastPage = Math.max(0, totalPageCount - 1);

        fusionFromTo.numRecipes = fusionFromTo.recipes.length;
        fusionFromTo.recipes = fusionFromTo.recipes.slice(
            fusionFromTo.pageNum * this.$scope.perPage,
            fusionFromTo.pageNum * this.$scope.perPage + this.$scope.perPage
        );
    }

    private getPaginateAndFilterFunc(isFusionFrom: boolean) {
        return (newVal, oldVal, scope) => this.paginateAndFilter(isFusionFrom? scope.fusionFrom : scope.fusionTo,
            this.getRecipeFilterFunc(isFusionFrom));
    }

    private getRecipeFilterFunc(isFusionFrom: boolean) {
        const containsIgnoreCase = (str: string, filter: string) => str.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        if (isFusionFrom) {
            return (filterString) => (recipe: Recipe, index, array) => {
                return containsIgnoreCase(recipe.sources[1].name, filterString) || containsIgnoreCase(recipe.result.name, filterString);
            };
        }
        else {
            return (filterString) => (recipe: Recipe, index, array) => {
                for (let i = 0; i < recipe.sources.length; i++) {
                    if (containsIgnoreCase(recipe.sources[i].name, filterString)) {
                        return true;
                    }
                }
                return false;
            };
        }
    }

    private resetPage(fusionFromTo: FusionDataModel) {
        fusionFromTo.pageNum = 0;
    }

    private getResetPageFunc(isFusionFrom: boolean) {
        return (newVal, oldVal, scope) => this.resetPage(isFusionFrom? scope.fusionFrom : scope.fusionTo);
    }
}

interface FusionDataModel {
    pageNum: number;
    lastPage: number;
    filterStr: String;
    recipes: Recipe[];
    allRecipes: Recipe[];
    numRecipes: number;
}



