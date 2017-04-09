///<reference path="../data/Data5.ts"/>
///<reference path="../data/PersonaData.ts"/>

/**
 * Created by Chin on 08-Apr-17.
 */

function addStatProperties(persona: PersonaData) : void {
    persona.strength = persona.stats[0];
    persona.magic = persona.stats[1];
    persona.endurance = persona.stats[2];
    persona.agility = persona.stats[3];
    persona.luck = persona.stats[4];
}

function addElementProperties(persona: PersonaData) : void {
    let properties = ['physical', 'gun', 'fire', 'ice', 'electric', 'wind', 'psychic', 'nuclear', 'bless', 'curse'];
    const elemsValue = {"wk":0, "-":1, "rs":2, "nu":3, "rp":4, "ab":5};
    for (let i = 0; i < properties.length; i++) {
        persona[properties[i]] = persona.elems[i];
        persona[properties[i] + 'Value'] = elemsValue[persona.elems[i]];
    }
}

const personaList: PersonaData[] = (() =>{
    let arr = [];
    for (let key in personaMap) {
        if (personaMap.hasOwnProperty(key)) {
            let persona = personaMap[key];
            persona.name = key;
            addStatProperties(persona);
            addElementProperties(persona);
            arr.push(persona);
        }
    }
    return arr;
})();

const personaeByArcana : {[arcana: string]: PersonaData[]} = (() =>{
    let personaeByArcana_ = {};
    for (let i = 0; i < personaList.length; i++) {
        let persona = personaList[i];
        if (!personaeByArcana_[persona.arcana]) {
            personaeByArcana_[persona.arcana] = [];
        }
        personaeByArcana_[persona.arcana].push(persona);
    }

    for (let key in personaeByArcana_) {
        personaeByArcana_[key].sort((a,b) => a.level - b.level);
    }

    return personaeByArcana_;
})();

const getResultArcana = (arcana1, arcana2) => {
    for (let i = 0; i < arcana2Combos.length; i++) {
        let combo = arcana2Combos[i];
        if ((combo.source[0] == arcana1 && combo.source[1] == arcana2) ||
            (combo.source[0] == arcana2 && combo.source[1] == arcana1)) {
            return combo.result;
        }
    }
};