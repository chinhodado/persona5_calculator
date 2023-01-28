function fuseTestWrapper(persona1Name, persona2Name) {
    return calc.fuse(personaMap[persona1Name], personaMap[persona2Name]);
}
function containAll(recipe, personaNames) {
    return personaNames.map(function (a) { return personaMap[a]; })
        .every(function (val) { return recipe.sources.indexOf(val) !== -1; });
}
function checkSkill() {
    var isGood = true;
    for (var i = 0; i < fullPersonaList.length; i++) {
        for (var key in fullPersonaList[i].skills) {
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
    var isGood = true;
    for (var i = 0; i < fullPersonaList.length; i++) {
        var trait = fullPersonaList[i].trait;
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
    var isGood = true;
    for (var i = 0; i < skillList.length; i++) {
        for (var key in skillList[i].personas) {
            if (skillList[i].personas.hasOwnProperty(key)) {
                if (!personaMap[key]) {
                    isGood = false;
                    throw new Error("Persona not found: " + key);
                }
                var skillLevelInPersonaMap = personaMap[key].skills[skillList[i].name];
                var skillLevelInSkillMap = skillList[i].personas[key];
                var skillIsTraitForPersona = personaMap[key].trait === skillList[i].name;
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
function checkItemization() {
    var isGood = true;
    for (var i = 0; i < fullPersonaList.length; i++) {
        var item = fullPersonaList[i].item;
        if(fullPersonaList[i].skillCard) {
            if(!skillMap[item]) {
                isGood = false;
                throw new Error("Skill data not found for: " + item + " for skill card itemization for: " + fullPersonaList[i].name);
            }
            if(fullPersonaList[i].itemr) {
                var itemr = fullPersonaList[i].itemr;
                if (!skillMap[itemr]) {
                    isGood = false;
                    throw new Error("Skill data not found for: " + itemr + " for fusion alarm skill card itemization for: " + fullPersonaList[i].name);
                }
            }
        }
        else {
            if(!itemMap[item]) {
                isGood = false;
                throw new Error("Item not found: " + item + " for persona: " + fullPersonaList[i].name);
            }
            if(fullPersonaList[i].itemr) {
                var itemr = fullPersonaList[i].itemr;
                if (!itemMap[itemr]) {
                    isGood = false;
                    throw new Error("Fusion Alarm item not found: " + itemr + " for persona: " + fullPersonaList[i].name);
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
