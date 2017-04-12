///<reference path="DataUtil.ts"/>
/**
 * Persona fusion calculator. Provides method for fusing 2 persona
 * and getting recipes for a persona.
 *
 * Created by Chin on 08-Apr-17.
 */
var FusionCalculator = (function () {
    function FusionCalculator() {
    }
    /**
     * Fuse 2 persona. Doesn't handle rare fusion and special fusion.
     * @param persona1 First persona to fuse
     * @param persona2 Second persona to fuse
     * @returns The result persona, or null when the fusion is not possible,
     * the fusion is a rare fusion, or the fusion is a special fusion.
     */
    FusionCalculator.fuse2 = function (persona1, persona2) {
        // don't handle rare fusion between a normal persona and a rare persona
        if ((persona1.rare && !persona2.rare) || (persona2.rare && !persona1.rare)) {
            return null;
        }
        // don't handle 2-persona-special fusions
        for (var x = 0; x < specialCombos.length; x++) {
            var combo = specialCombos[x];
            if (((persona1.name === combo.sources[0] && persona2.name === combo.sources[1]) ||
                (persona2.name === combo.sources[0] && persona1.name === combo.sources[1]))) {
                return null;
            }
        }
        var level = 1 + Math.floor((persona1.level + persona2.level) / 2);
        var arcana = getResultArcana(persona1.arcana, persona2.arcana);
        var personae = personaeByArcana[arcana];
        var persona = null;
        var found = false;
        if (persona1.arcana === persona2.arcana) {
            // same-arcana down-rank fusion
            for (var i = personae.length - 1; i >= 0; i--) {
                persona = personae[i];
                if (persona.level <= level) {
                    if (persona.special || persona.rare || persona === persona1 || persona === persona2)
                        continue;
                    found = true;
                    break;
                }
            }
        }
        else {
            // different-arcana fusion
            for (var i = 0; i < personae.length; i++) {
                persona = personae[i];
                if (persona.level >= level) {
                    if (persona.special || persona.rare)
                        continue;
                    found = true;
                    break;
                }
            }
        }
        return found ? persona : null;
    };
    ;
    /**
     * Fuse a rare persona with a normal persona.
     * @param rarePersona The rare persona
     * @param mainPersona The normal persona
     * @returns The result persona, or null when the fusion is not possible.
     */
    FusionCalculator.fuseRare = function (rarePersona, mainPersona) {
        var modifier = rareCombos[mainPersona.arcana][rarePersonae.indexOf(rarePersona.name)];
        var personae = personaeByArcana[mainPersona.arcana];
        var mainPersonaIndex = personae.indexOf(mainPersona);
        var newPersona = personae[mainPersonaIndex + modifier];
        if (!newPersona) {
            return null;
        }
        if (newPersona.special) {
            if (modifier > 0)
                modifier++;
            else if (modifier < 0)
                modifier--;
            newPersona = personae[mainPersonaIndex + modifier];
        }
        return newPersona;
    };
    ;
    /**
     * Get the recipe for a special persona
     * @param persona The special persona
     * @returns {Array} An array of 1 element containing the recipe for the persona
     */
    FusionCalculator.getSpecialRecipe = function (persona) {
        if (!persona.special) {
            throw new Error("Persona is not special!)");
        }
        var allRecipe = [];
        for (var i = 0; i < specialCombos.length; i++) {
            var combo = specialCombos[i];
            if (persona.name === combo.result) {
                var recipe = {
                    sources: [],
                    result: personaMap[combo.result]
                };
                for (var j = 0; j < combo.sources.length; j++) {
                    recipe.sources.push(personaMap[combo.sources[j]]);
                }
                this.addRecipe(recipe, allRecipe);
                return allRecipe;
            }
        }
    };
    /**
     * Get the list of all recipes for the given persona
     * @param persona The resulting persona
     * @returns {Array} List of all recipes for the given persona
     */
    FusionCalculator.getRecipes = function (persona) {
        var allRecipe = [];
        // Rare persona can't be fused
        if (persona.rare) {
            return allRecipe;
        }
        // Check special recipes.
        if (persona.special) {
            return FusionCalculator.getSpecialRecipe(persona);
        }
        var recipes = this.getArcanaRecipes(persona.arcana);
        recipes = recipes.filter(function (value, index, array) {
            return FusionCalculator.isGoodRecipe(value, persona);
        });
        for (var i = 0; i < recipes.length; i++) {
            this.addRecipe(recipes[i], allRecipe);
        }
        return allRecipe;
    };
    /**
     * Return true if the given recipe is good for the expected result.
     * A recipe is good if the sources are different from the expected result,
     * and the actual result is the same as the expected result.
     * @param recipe The recipe to check
     * @param expectedResult The expected resulting persona
     * @returns {boolean} true if the recipe is good for the given persona, false otherwise
     */
    FusionCalculator.isGoodRecipe = function (recipe, expectedResult) {
        if (recipe.sources[0].name === expectedResult.name)
            return false;
        if (recipe.sources[1].name === expectedResult.name)
            return false;
        return recipe.result.name === expectedResult.name;
    };
    /**
     * Get all recipes that result in a persona in the given arcana
     * @param arcana The result arcana
     * @returns {Array} the list of recipes
     */
    FusionCalculator.getArcanaRecipes = function (arcana) {
        var recipes = [];
        var arcanaCombos = arcana2Combos.filter(function (x) { return x.result === arcana; });
        // fuse 2 persona normally (including down-rank)
        for (var i = 0, combo = null; combo = arcanaCombos[i]; i++) {
            var personae1 = personaeByArcana[combo.source[0]];
            var personae2 = personaeByArcana[combo.source[1]];
            for (var j = 0, persona1 = null; persona1 = personae1[j]; j++) {
                for (var k = 0, persona2 = null; persona2 = personae2[k]; k++) {
                    // for same arcana fusion only consider k > j to avoid duplicates
                    if (persona1.arcana === persona2.arcana && k <= j)
                        continue;
                    // rare fusion will be handled separately
                    if (persona1.rare && !persona2.rare)
                        continue;
                    if (persona2.rare && !persona1.rare)
                        continue;
                    var result = FusionCalculator.fuse2(persona1, persona2);
                    if (!result)
                        continue;
                    recipes.push({
                        sources: [persona1, persona2],
                        result: result
                    });
                }
            }
        }
        // rare fusion where one persona is a rare one and the other is a normal one
        for (var i = 0; i < rarePersonae.length; i++) {
            var rarePersona = personaMap[rarePersonae[i]];
            var personae = personaeByArcana[arcana];
            for (var j = 0; j < personae.length; j++) {
                var mainPersona = personae[j];
                if (rarePersona === mainPersona)
                    continue;
                var result = FusionCalculator.fuseRare(rarePersona, mainPersona);
                if (!result)
                    continue;
                recipes.push({
                    sources: [rarePersona, mainPersona],
                    result: result
                });
            }
        }
        return recipes;
    };
    /**
     * Add a recipe to a list of recipe. Before adding, add an estimated cost
     * to the recipe and sort the recipe's sources.
     * @param recipe The recipe to add
     * @param allRecipes List of recipes to add to
     */
    FusionCalculator.addRecipe = function (recipe, allRecipes) {
        // add an approximated cost
        recipe.cost = 0;
        for (var i = 0, source = null; source = recipe.sources[i]; i++) {
            var level = source.level;
            recipe.cost += (27 * level * level) + (126 * level) + 2147;
        }
        // Sort ingredients so that highest level persona is first
        recipe.sources.sort(function (a, b) { return b.level - a.level; });
        allRecipes.push(recipe);
    };
    return FusionCalculator;
}());
