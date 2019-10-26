///<reference path="DataUtil.ts"/>

/**
 * Persona fusion calculator. Provides method for fusing 2 persona
 * and getting recipes for a persona.
 *
 * Created by Chin on 08-Apr-17.
 */
class FusionCalculator {
    private personaeByArcana;

    constructor(personaeByArcana: {[arcana: string]: PersonaData[]}) {
        this.personaeByArcana = personaeByArcana;
    }

    /**
     * Fuse 2 persona. This can handle normal fusion, rare fusion or special fusion.
     * @param persona1 First persona to fuse
     * @param persona2 Second persona to fuse
     * @returns {PersonaData} The result persona, or null if the fusion is not possible
     */
    public fuse(persona1: PersonaData, persona2: PersonaData): PersonaData {
        // special fusion
        let result = this.getSpecialFuseResult(persona1, persona2);
        if (result !== null) {
            return result;
        }

        // rare fusion
        if ((persona1.rare && !persona2.rare) || (!persona1.rare && persona2.rare)) {
            let rarePersona = persona1.rare? persona1 : persona2;
            let normalPersona = persona1.rare? persona2 : persona1;
            result = this.fuseRare(rarePersona, normalPersona);
            return result;
        }

        // either both rare or both normal => normal fusion
        result = this.fuseNormal(persona1, persona2);
        return result;
    }

    /**
     * Get all 2-fusion recipes with the given persona as one of the ingredients
     * @param persona The persona to fuse from
     * @returns {Recipe[]} The list of recipes. In each recipe's sources, the given persona
     * is guaranteed to be the first one.
     */
    public getAllResultingRecipesFrom(persona: PersonaData): Recipe[] {
        let recipes: Recipe[] = [];
        for (let i = 0; i < customPersonaList.length; i++) {
            let result = this.fuse(persona, customPersonaList[i]);
            if (result !== null) {
                let recipe = {
                    sources: [persona, customPersonaList[i]],
                    result: result
                };

                this.addRecipe(recipe, recipes, false);
            }
        }

        return recipes;
    }

    /**
     * Return the result persona if 2 given persona are part of a special formula
     * @param persona1 The first persona
     * @param persona2 The second persona
     * @returns {boolean} the result persona if persona1 + persona2 is a special formula, false otherwise
     */
    private getSpecialFuseResult(persona1: PersonaData, persona2: PersonaData): PersonaData {
        for (let x = 0; x < special2Combos.length; x++) {
            let combo = special2Combos[x];
            if (((persona1.name === combo.sources[0] && persona2.name === combo.sources[1]) ||
                (persona2.name === combo.sources[0] && persona1.name === combo.sources[1]))) {
                return personaMap[combo.result];
            }
        }

        return null;
    }

    /**
     * Fuse 2 persona. Doesn't handle rare fusion and special fusion.
     * @param persona1 First persona to fuse
     * @param persona2 Second persona to fuse
     * @returns The result persona, or null when the fusion is not possible,
     * the fusion is a rare fusion, or the fusion is a special fusion.
     */
    private fuseNormal(persona1: PersonaData, persona2: PersonaData): PersonaData {
        // don't handle rare fusion between a normal persona and a rare persona
        if ((persona1.rare && !persona2.rare) || (persona2.rare && !persona1.rare)) {
            return null;
        }

        // don't handle 2-persona-special fusions
        if (this.getSpecialFuseResult(persona1, persona2) !== null) {
            return null;
        }

        let level = 1 + Math.floor((persona1.level + persona2.level) / 2);
        let arcana = getResultArcana(persona1.arcana, persona2.arcana);
        if (!arcana) {
            // only Judgement + [Justice/Strength/Chariot/Death] can result in this
            return null;
        }

        let personae = this.personaeByArcana[arcana];

        let persona: PersonaData = null;
        let found = false;
        if (persona1.arcana === persona2.arcana) {
            // same-arcana down-rank fusion
            for (let i = personae.length - 1; i >= 0; i--) {
                persona = personae[i];
                if (persona.level <= level) {
                    if (persona.special || persona.rare || persona === persona1 || persona === persona2) continue;
                    found = true;
                    break;
                }
            }
        }
        else {
            // different-arcana fusion
            for (let i = 0; i < personae.length; i++) {
                persona = personae[i];
                if (persona.level >= level) {
                    if (persona.special || persona.rare) continue;
                    found = true;
                    break;
                }
            }
        }

        return found? persona : null;
    };

    /**
     * Fuse a rare persona with a normal persona.
     * @param rarePersona The rare persona
     * @param mainPersona The normal persona
     * @returns The result persona, or null when the fusion is not possible.
     */
    private fuseRare(rarePersona: PersonaData, mainPersona: PersonaData): PersonaData {
        let modifier = rareCombos[mainPersona.arcana][rarePersonae.indexOf(rarePersona.name)];
        let personae = this.personaeByArcana[mainPersona.arcana];
        let mainPersonaIndex = personae.indexOf(mainPersona);
        let newPersona = personae[mainPersonaIndex + modifier];

        if (!newPersona) {
            return null;
        }

        while (newPersona && (newPersona.special || newPersona.rare)) {
            if (modifier > 0) modifier++;
            else if (modifier < 0) modifier--;

            newPersona = personae[mainPersonaIndex + modifier];
        }

        if (!newPersona) {
            return null;
        }
        return newPersona;
    };

    /**
     * Get the recipe for a special persona
     * @param persona The special persona
     * @returns {Array} An array of 1 element containing the recipe for the persona
     */
    private getSpecialRecipe(persona: PersonaData): Recipe[] {
        if (!persona.special) {
            throw new Error("Persona is not special!)");
        }
        let allRecipe = [];
        for (let i = 0; i < specialCombos.length; i++) {
            let combo = specialCombos[i];
            if (persona.name === combo.result) {
                let recipe = {
                    sources: [],
                    result: personaMap[combo.result]
                };
                for (let j = 0; j < combo.sources.length ; j++) {
                    recipe.sources.push(personaMap[combo.sources[j]]);
                }
                this.addRecipe(recipe, allRecipe, true);
                return allRecipe;
            }
        }
    }

    /**
     * Get the list of all recipes for the given persona
     * @param persona The resulting persona
     * @returns {Array} List of all recipes for the given persona
     */
    public getRecipes(persona: PersonaData): Recipe[] {
        let allRecipe = [];
        // Rare persona can't be fused
        if (persona.rare) {
            return allRecipe;
        }

        // Check special recipes.
        if (persona.special) {
            return this.getSpecialRecipe(persona);
        }

        let recipes = this.getArcanaRecipes(persona.arcana);
        recipes = recipes.filter((value, index, array) => {
           return this.isGoodRecipe(value, persona);
        });
        for (let i = 0; i < recipes.length; i++) {
            this.addRecipe(recipes[i], allRecipe, true);
        }

        return allRecipe;
    }

    /**
     * Return true if the given recipe is good for the expected result.
     * A recipe is good if the sources are different from the expected result,
     * and the actual result is the same as the expected result.
     * @param recipe The recipe to check
     * @param expectedResult The expected resulting persona
     * @returns {boolean} true if the recipe is good for the given persona, false otherwise
     */
    private isGoodRecipe(recipe: Recipe, expectedResult: PersonaData): boolean {
        if (recipe.sources[0].name === expectedResult.name) return false;
        if (recipe.sources[1].name === expectedResult.name) return false;
        return recipe.result.name === expectedResult.name;
    }

    /**
     * Get all recipes that result in a persona in the given arcana
     * @param arcana The result arcana
     * @returns {Array} the list of recipes
     */
    private getArcanaRecipes(arcana: string): Recipe[] {
        let recipes : Recipe[] = [];
        let arcanaCombos = arcana2Combos.filter(x => x.result === arcana);

        // fuse 2 persona normally (including down-rank)
        for (let i = 0, combo = null; combo = arcanaCombos[i]; i++) {
            let personae1 = this.personaeByArcana[combo.source[0]];
            let personae2 = this.personaeByArcana[combo.source[1]];
            for (let j = 0, persona1 = null; persona1 = personae1[j]; j++) {
                for (let k = 0, persona2 = null; persona2 = personae2[k]; k++) {
                    // for same arcana fusion only consider k > j to avoid duplicates
                    if (persona1.arcana === persona2.arcana && k <= j) continue;

                    // rare fusion will be handled separately
                    if (persona1.rare && !persona2.rare) continue;
                    if (persona2.rare && !persona1.rare) continue;

                    let result = this.fuseNormal(persona1, persona2);
                    if (!result) continue;
                    recipes.push({
                        sources: [persona1, persona2],
                        result: result
                    });
                }
            }
        }

        // rare fusion where one persona is a rare one and the other is a normal one
        for (let i = 0; i < rarePersonae.length; i++) {
            let rarePersona = personaMap[rarePersonae[i]];
            let personae = this.personaeByArcana[arcana];
            for (let j = 0; j < personae.length; j++) {
                let mainPersona = personae[j];
                if (rarePersona === mainPersona) continue;
                let result = this.fuseRare(rarePersona, mainPersona);
                if (!result) continue;
                recipes.push({
                    sources: [rarePersona, mainPersona],
                    result: result
                });
            }
        }

        return recipes;
    }

    /**
     * Add a recipe to a list of recipe. Before adding, add an estimated cost
     * to the recipe and sort the recipe's sources.
     * @param recipe The recipe to add
     * @param allRecipes List of recipes to add to
     * @param sortIngredients if true the ingredient list will be sorted
     */
    private addRecipe(recipe: Recipe, allRecipes: Recipe[], sortIngredients: boolean): void {
        // add an approximated cost
        recipe.cost = this.getApproxCost(recipe);

        if (sortIngredients) {
            // Sort ingredients so that highest level persona is first
            recipe.sources.sort((a, b)=> b.level - a.level);
        }

        // help with rare persona fusion warning
        let isAllRare = true;
        for (let i = 0; i < recipe.sources.length; i++) {
            isAllRare = isAllRare && recipe.sources[i].rare;
        }
        recipe.isAllRare = isAllRare;

        allRecipes.push(recipe);
    }

    private getApproxCost(recipe: Recipe): number {
        let cost = 0;
        for (let i = 0, source = null; source = recipe.sources[i]; i++) {
            let level = source.level;
            cost += (27 * level * level) + (126 * level) + 2147;
        }

        return cost;
    }
}

/**
 * Interface for a recipe, which includes the source personae,
 * the result persona, and the cost.
 */
interface Recipe {
    sources: PersonaData[];
    result: PersonaData;
    cost?: number;
    isAllRare?: boolean;
}
