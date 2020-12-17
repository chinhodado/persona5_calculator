function fuseTestWrapper(persona1Name: string, persona2Name: string): PersonaData {
    return calc.fuse(personaMap[persona1Name], personaMap[persona2Name]);
}

function containAll(recipe: Recipe, personaNames: string[]): boolean {
    return personaNames.map(a => personaMap[a])
        .every(val => recipe.sources.indexOf(val) !== -1);
}

function checkSkill() {
    let isGood = true;
    for (let i = 0; i < fullPersonaList.length; i++) {
        for (let key in fullPersonaList[i].skills) {
            if (fullPersonaList[i].skills.hasOwnProperty(key)) {
                if (!skillMap[key]) {
                    isGood = false;
                    throw new Error("Skill not found: " + key);
                }
            }
        }
    }
    return isGood;
}

function checkTrait() {
    let isGood = true;
    for (let i = 0; i < fullPersonaList.length; i++) {
        let trait = fullPersonaList[i].trait;
        if (!skillMap[trait] || skillMap[trait].element !== 'trait') {
            isGood = false;
            throw new Error("Trait not found: " + trait + " for persona: " + fullPersonaList[i].name);
        }

        if (skillMap[trait].personas[fullPersonaList[i].name] === undefined) {
            isGood = false;
            throw new Error("Persona name: " + fullPersonaList[i].name + " not in list for trait: " + trait);
        }
    }
    return isGood;
}

function checkSkillPersona() {
    let isGood = true;
    for (let i = 0; i < skillList.length; i++) {
        for (let key in skillList[i].personas) {
            if (skillList[i].personas.hasOwnProperty(key)) {
                if (!personaMap[key]) {
                    isGood = false;
                    throw new Error("Persona not found: " + key);
                }

                let skillLevelInPersonaMap = personaMap[key].skills[skillList[i].name];
                let skillLevelInSkillMap = skillList[i].personas[key];
                let skillIsTraitForPersona = personaMap[key].trait === skillList[i].name;
                if (skillLevelInPersonaMap === undefined && !skillIsTraitForPersona) {
                    isGood = false;
                    throw new Error(key + " doesn't learn " + skillList[i].name);
                }

                if (skillLevelInPersonaMap !== skillLevelInSkillMap && !skillIsTraitForPersona) {
                    isGood = false;
                    throw new Error(key + " learns " + skillList[i].name + " at mismatched level");
                }
            }
        }
    }
    return isGood;
}
//
// function checkTraitPersona() {
//     let isGood = true;
//     for (let i = 0; i < skillList.length; i++) {
//         if (skillList[i].element === 'trait') {
//             for (let key in skillList[i].personas) {
//                 if (skillList[i].personas.hasOwnProperty(key)) {
//                     if (!personaMap[key]) {
//                         isGood = false;
//                         throw new Error("Persona not found: " + key);
//                     }
//
//                     let skillLevelInPersonaMap = personaMap[key].skills[skillList[i].name];
//                     let skillLevelInSkillMap = skillList[i].personas[key];
//                     if (skillLevelInPersonaMap === undefined) {
//                         isGood = false;
//                         throw new Error(key + " doesn't learn " + skillList[i].name);
//                     }
//
//                     if (skillLevelInPersonaMap !== skillLevelInSkillMap) {
//                         isGood = false;
//                         throw new Error(key + " learns " + skillList[i].name + " at at mismatched level");
//                     }
//                 }
//             }
//         }
//     }
//     return isGood;
// }