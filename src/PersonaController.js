///<reference path="FusionCalculator.ts"/>
///<reference path="../data/Compendium.ts"/>
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
        this.$scope.persona = personaeByName[personaName];
        if (!this.$scope.persona)
            return;
        this.$scope.allRecipes = [];
        this.getRecipes();
        this.$scope.allRecipes.sort(function (a, b) { return a.cost - b.cost; });
        this.$scope.maxCost = 0;
        for (var i = 0, recipe = null; recipe = this.$scope.allRecipes[i]; i++) {
            recipe.num = i;
            this.$scope.maxCost = Math.max(this.$scope.maxCost, recipe.cost);
        }
        var compediumEntry = compendium[personaName];
        this.$scope.persona.stats = compediumEntry.stats;
        this.$scope.persona.statsHeader = ["Strength", "Magic", "Endurance", "Agility", "Luck"];
        this.$scope.persona.elems = this.getElems(personaName);
        this.$scope.persona.elemsHeader = ["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychic", "Nuclear", "Bless", "Curse"];
        this.$scope.persona.skills = this.getSkills(personaName);
        this.$scope.perPage = 100;
        this.$scope.lastPage = Math.floor(this.$scope.allRecipes.length / this.$scope.perPage);
        this.$scope.pageNum = 0;
        this.$scope.$watch('filterStr', this.paginateAndFilter.bind(this));
        this.$scope.$watch('pageNum', this.paginateAndFilter.bind(this), false);
    }
    PersonaController.prototype.addRecipe = function (recipe) {
        recipe.cost = 0;
        for (var i = 0, source = null; source = recipe.sources[i]; i++) {
            var level = source.level;
            recipe.cost += (27 * level * level) + (126 * level) + 2147;
        }
        // Sort ingredients so that highest level persona is first, if tied then use the rank.
        // This is important for 3-way fusion where the highest level persona matter, but not so much
        // for anything else other than looking nicer. Persona 5 doesn't have 3-way fusion anyway.
        recipe.sources = this.$filter('orderBy')(recipe.sources, ['-level', getRank]);
        this.$scope.allRecipes.push(recipe);
    };
    ;
    PersonaController.prototype.getElems = function (personaName) {
        var elems = compendium[personaName].elems;
        for (var i = 0; i < elems.length; i++) {
            if (elems[i] == 'wk')
                elems[i] = 'Weak';
            else if (elems[i] == 'rs')
                elems[i] = 'Resist';
            else if (elems[i] == 'ab')
                elems[i] = 'Absorb';
            else if (elems[i] == 'rp')
                elems[i] = 'Repel';
            else if (elems[i] == 'nu')
                elems[i] = 'Null';
        }
        return elems;
    };
    PersonaController.prototype.getSkills = function (personaName) {
        var skills = compendium[personaName].skills;
        var sorted = [];
        for (var name_1 in skills) {
            if (skills.hasOwnProperty(name_1)) {
                sorted.push([name_1, skills[name_1]]);
            }
        }
        sorted.sort(function (a, b) {
            return a[1] - b[1];
        });
        var resSkills = [];
        for (var i = 0; i < sorted.length; i++) {
            var skillData = FULL_SKILLS[sorted[i][0]];
            resSkills.push({
                name: sorted[i][0],
                level: sorted[i][1],
                description: skillData.effect,
                elem: this.capitalizeFirstLetter(skillData.element),
                cost: this.getSkillCost(skillData)
            });
        }
        return resSkills;
    };
    PersonaController.prototype.capitalizeFirstLetter = function (s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };
    PersonaController.prototype.getSkillCost = function (skill) {
        if (skill.element != 'passive') {
            if (skill.cost < 100) {
                return String(skill.cost) + '% HP';
            }
            else {
                return String(skill.cost / 100) + ' SP';
            }
        }
        else {
            return "-";
        }
    };
    PersonaController.prototype.getRecipes = function () {
        if (this.$scope.persona.rare) {
            var recipe = { 'sources': [] };
            this.addRecipe(recipe);
            return;
        }
        // Check special recipes.
        if (this.$scope.persona.special) {
            for (var i = 0, combo = null; combo = specialCombos[i]; i++) {
                if (this.$scope.persona.name == combo.result) {
                    var recipe = { 'sources': [] };
                    for (var j = 0, source = null; source = combo.sources[j]; j++) {
                        recipe.sources.push(personaeByName[source]);
                    }
                    this.addRecipe(recipe);
                    return;
                }
            }
        }
        // Consider straight fusion.
        function filter2Way(persona1, persona2, result) {
            if (persona1.name == this.$scope.persona.name)
                return true;
            if (persona2.name == this.$scope.persona.name)
                return true;
            if (result.name == this.$scope.persona.name)
                return false;
            return true;
        }
        var recipes = this.getArcanaRecipes(this.$scope.persona.arcana, filter2Way);
        for (var i = 0, recipe = null; recipe = recipes[i]; i++) {
            this.addRecipe(recipe);
        }
    };
    ;
    PersonaController.prototype.getArcanaRecipes = function (arcanaName, filterCallback) {
        var recipes = [];
        var combos = arcana2Combos.filter(function (x) { return x.result == arcanaName; });
        for (var i = 0, combo = null; combo = combos[i]; i++) {
            var personae1 = personaeByArcana[combo.source[0]];
            var personae2 = personaeByArcana[combo.source[1]];
            for (var j = 0, persona1 = null; persona1 = personae1[j]; j++) {
                for (var k = 0, persona2 = null; persona2 = personae2[k]; k++) {
                    if (persona1.arcana == persona2.arcana && k <= j)
                        continue;
                    if (persona1.rare && !persona2.rare)
                        continue;
                    if (persona2.rare && !persona1.rare)
                        continue;
                    var result = FusionCalculator.fuse2(combo.result, persona1, persona2);
                    if (!result)
                        continue;
                    if (filterCallback
                        && filterCallback.call(this, persona1, persona2, result)) {
                        continue;
                    }
                    recipes.push({ 'sources': [persona1, persona2] });
                }
            }
        }
        for (var i = 0; i < rarePersonae.length; i++) {
            var rarePersona = personaeByName[rarePersonae[i]];
            var personae_1 = personaeByArcana[this.$scope.persona.arcana];
            for (var j = 0; j < personae_1.length; j++) {
                var mainPersona = personae_1[j];
                if (rarePersona == mainPersona)
                    continue;
                var result = FusionCalculator.fuseRare(rarePersona, mainPersona);
                if (!result)
                    continue;
                if (filterCallback
                    && filterCallback.call(this, rarePersona, mainPersona, result)) {
                    continue;
                }
                recipes.push({ 'sources': [rarePersona, mainPersona] });
            }
        }
        return recipes;
    };
    ;
    /**
     * Note: this can the scope that is passed in, or this.$scope.
     * Using the passed in scope for brevity.
     */
    PersonaController.prototype.paginateAndFilter = function (newVal, oldVal, scope) {
        if (scope.pageNum < 0)
            scope.pageNum = 0;
        if (scope.pageNum > scope.lastPage)
            scope.pageNum = scope.lastPage;
        if (scope.filterStr) {
            scope.recipes = this.$filter('filter')(scope.allRecipes, scope.filterStr);
        }
        else {
            scope.recipes = scope.allRecipes;
        }
        scope.numRecipes = scope.recipes.length;
        scope.recipes = scope.recipes.slice(scope.pageNum * scope.perPage, scope.pageNum * scope.perPage + scope.perPage);
    };
    ;
    return PersonaController;
}());
