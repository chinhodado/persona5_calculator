///<reference path="FusionCalculator.ts"/>
///<reference path="../data/Compendium.ts"/>
///<reference path="../data/SkillData.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var CalcCtrl = (function () {
    function CalcCtrl() {
        this.ceil = Math.ceil;
        this.persona = personaeByName[this.params.persona_name];
        if (!this.persona)
            return;
        this.allRecipes = [];
        this.getRecipes();
        this.allRecipes = angular.Array.orderBy(this.allRecipes, 'cost');
        this.maxCost = 0;
        for (var i = 0, recipe = null; recipe = this.allRecipes[i]; i++) {
            recipe.num = i;
            this.maxCost = Math.max(this.maxCost, recipe.cost);
        }
        var compediumEntry = compendium[this.params.persona_name];
        this.persona.stats = compediumEntry.stats;
        this.persona.statsHeader = ["Strength", "Magic", "Endurance", "Agility", "Luck"];
        this.persona.elems = this.getElems(this.params.persona_name);
        this.persona.elemsHeader = ["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychic", "Nuclear", "Bless", "Curse"];
        this.persona.skills = this.getSkills(this.params.persona_name);
        this.perPage = 100;
        this.lastPage = Math.floor(this.allRecipes.length / this.perPage);
        this.pageNum = 0;
        this.$watch('filter', this.paginateAndFilter);
        this.$watch('pageNum', this.paginateAndFilter, false);
    }
    CalcCtrl.prototype.addRecipe = function (recipe) {
        recipe.cost = 0;
        for (var i = 0, source = null; source = recipe.sources[i]; i++) {
            var level = source.level;
            recipe.cost += (27 * level * level) + (126 * level) + 2147;
        }
        // Sort so that the "3rd persona" in triangle fusion (the one that needs
        // to have the highest current level) is always listed first.  In case
        // of a tie in level, the persona with the lowest arcana rank is used.
        recipe.sources = angular.Array.orderBy(recipe.sources, ['-level', getRank]);
        this.allRecipes.push(recipe);
    };
    ;
    CalcCtrl.prototype.getElems = function (personaName) {
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
    CalcCtrl.prototype.getSkills = function (personaName) {
        var skills = compendium[personaName].skills;
        var sorted = [];
        for (var name in skills) {
            sorted.push([name, skills[name]]);
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
    CalcCtrl.prototype.capitalizeFirstLetter = function (s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };
    CalcCtrl.prototype.getSkillCost = function (skill) {
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
    CalcCtrl.prototype.getRecipes = function () {
        if (this.persona.rare) {
            var recipe = { 'sources': [] };
            this.addRecipe(recipe);
            return;
        }
        // Check special recipes.
        if (this.persona.special) {
            for (var i = 0, combo = null; combo = specialCombos[i]; i++) {
                if (this.persona.name == combo.result) {
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
            if (persona1.name == this.persona.name)
                return true;
            if (persona2.name == this.persona.name)
                return true;
            if (result.name == this.persona.name)
                return false;
            return true;
        }
        var recipes = this.getArcanaRecipes(this.persona.arcana, filter2Way);
        for (var i = 0, recipe = null; recipe = recipes[i]; i++) {
            this.addRecipe(recipe);
        }
    };
    ;
    CalcCtrl.prototype.getArcanaRecipes = function (arcanaName, filterCallback) {
        var recipes = [];
        var combos = angular.Array.filter(arcana2Combos, function (x) { return x.result == arcanaName; });
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
            var personae_1 = personaeByArcana[this.persona.arcana];
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
    CalcCtrl.prototype.paginateAndFilter = function () {
        if (this.pageNum < 0)
            this.pageNum = 0;
        if (this.pageNum > this.lastPage)
            this.pageNum = this.lastPage;
        this.recipes = angular.Array.filter(this.allRecipes, this.filter);
        this.numRecipes = this.recipes.length;
        this.recipes = this.recipes.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
    };
    ;
    return CalcCtrl;
}());
