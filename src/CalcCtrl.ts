///<reference path="FusionCalculator.ts"/>
///<reference path="../data/Compendium.ts"/>
///<reference path="../data/SkillData.ts"/>

/**
 * Created by Chin on 08-Apr-17.
 */
class CalcCtrl {
    $scope;
    $filter;

    constructor($scope, $routeParams, $filter) {
        let personaName = $routeParams.persona_name;
        this.$filter = $filter;
        this.$scope = $scope;
        this.$scope.Math = Math;

        this.$scope.personaName = personaName;
        this.$scope.persona = personaeByName[personaName];
        if (!this.$scope.persona) return;

        this.$scope.allRecipes = [];
        this.getRecipes();
        this.$scope.allRecipes.sort((a,b) => a.cost - b.cost);
        this.$scope.maxCost = 0;
        for (let i = 0, recipe = null; recipe = this.$scope.allRecipes[i]; i++) {
            recipe.num = i;
            this.$scope.maxCost = Math.max(this.$scope.maxCost, recipe.cost);
        }

        let compediumEntry = compendium[personaName];
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

    addRecipe(recipe) {
        recipe.cost = 0;
        for (let i = 0, source = null; source = recipe.sources[i]; i++) {
            let level = source.level;
            recipe.cost += (27 * level * level) + (126 * level) + 2147;
        }

        // Sort ingredients so that highest level persona is first, if tied then use the rank.
        // This is important for 3-way fusion where the highest level persona matter, but not so much
        // for anything else other than looking nicer. Persona 5 doesn't have 3-way fusion anyway.
        recipe.sources = this.$filter('orderBy')(recipe.sources, ['-level', getRank]);
        this.$scope.allRecipes.push(recipe);
    };

    getElems(personaName: string) {
        let elems = compendium[personaName].elems;
        for (let i = 0; i < elems.length; i++) {
            if (elems[i] == 'wk') elems[i] = 'Weak';
            else if (elems[i] == 'rs') elems[i] = 'Resist';
            else if (elems[i] == 'ab') elems[i] = 'Absorb';
            else if (elems[i] == 'rp') elems[i] = 'Repel';
            else if (elems[i] == 'nu') elems[i] = 'Null';
        }
        return elems;
    }

    getSkills(personaName: string) {
        let skills = compendium[personaName].skills;
        let sorted = [];
        for (let name in skills) {
            if (skills.hasOwnProperty(name)) {
                sorted.push([name, skills[name]]);
            }
        }

        sorted.sort(function(a, b) {
            return a[1] - b[1];
        });

        let resSkills = [];
        for (let i = 0; i < sorted.length; i++) {
            let skillData = FULL_SKILLS[sorted[i][0]];
            resSkills.push({
                name: sorted[i][0],
                level: sorted[i][1],
                description: skillData.effect,
                elem: this.capitalizeFirstLetter(skillData.element),
                cost: this.getSkillCost(skillData)
            })
        }

        return resSkills;
    }

    capitalizeFirstLetter(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    getSkillCost(skill) {
        if (skill.element != 'passive') {
            if (skill.cost < 100) {
                return String(skill.cost) + '% HP'
            }
            else {
                return String(skill.cost / 100) + ' SP';
            }
        }
        else {
            return "-"
        }
    }

    getRecipes() {
        if (this.$scope.persona.rare) {
            let recipe = {'sources': []};
            this.addRecipe(recipe);
            return;
        }

        // Check special recipes.
        if (this.$scope.persona.special) {
            for (let i = 0, combo = null; combo = specialCombos[i]; i++) {
                if (this.$scope.persona.name == combo.result) {
                    let recipe = {'sources': []};
                    for (let j = 0, source = null; source = combo.sources[j]; j++) {
                        recipe.sources.push(personaeByName[source]);
                    }
                    this.addRecipe(recipe);
                    return;
                }
            }
        }

        // Consider straight fusion.
        function filter2Way(persona1, persona2, result) {
            if (persona1.name == this.$scope.persona.name) return true;
            if (persona2.name == this.$scope.persona.name) return true;
            if (result.name == this.$scope.persona.name) return false;
            return true;
        }

        let recipes = this.getArcanaRecipes(this.$scope.persona.arcana, filter2Way);
        for (let i = 0, recipe = null; recipe = recipes[i]; i++) {
            this.addRecipe(recipe);
        }
    };

    getArcanaRecipes(arcanaName, filterCallback) {
        let recipes = [];
        let combos = arcana2Combos.filter(x => x.result == arcanaName);
        for (let i = 0, combo = null; combo = combos[i]; i++) {
            let personae1 = personaeByArcana[combo.source[0]];
            let personae2 = personaeByArcana[combo.source[1]];
            for (let j = 0, persona1 = null; persona1 = personae1[j]; j++) {
                for (let k = 0, persona2 = null; persona2 = personae2[k]; k++) {
                    if (persona1.arcana == persona2.arcana && k <= j) continue;
                    if (persona1.rare && !persona2.rare) continue;
                    if (persona2.rare && !persona1.rare) continue;
                    let result = FusionCalculator.fuse2(combo.result, persona1, persona2);
                    if (!result) continue;
                    if (filterCallback
                        && filterCallback.call(this, persona1, persona2, result)) {
                        continue;
                    }

                    recipes.push({'sources': [persona1, persona2]});
                }
            }
        }

        for (let i = 0; i < rarePersonae.length; i++) {
            let rarePersona = personaeByName[rarePersonae[i]];
            let personae = personaeByArcana[this.$scope.persona.arcana];
            for (let j = 0; j < personae.length; j++) {
                let mainPersona = personae[j];
                if (rarePersona == mainPersona) continue;
                let result = FusionCalculator.fuseRare(rarePersona, mainPersona);
                if (!result) continue;
                if (filterCallback
                    && filterCallback.call(this, rarePersona, mainPersona, result)) {
                    continue;
                }

                recipes.push({'sources': [rarePersona, mainPersona]});
            }
        }

        return recipes;
    };

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
    };
}



