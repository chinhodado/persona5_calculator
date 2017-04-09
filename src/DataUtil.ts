///<reference path="../data/Data5.ts"/>

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
    persona.physical = persona.elems[0];
    persona.gun = persona.elems[1];
    persona.fire = persona.elems[2];
    persona.ice = persona.elems[3];
    persona.electric = persona.elems[4];
    persona.wind = persona.elems[5];
    persona.psychic = persona.elems[6];
    persona.nuclear = persona.elems[7];
    persona.bless = persona.elems[8];
    persona.curse = persona.elems[9];
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

const arcanaRank = (() =>{
    let arcanaRank_ = {};
    let rank = 0;
    let lastArcana = null;
    for (let i = 0; i < personaList.length; i++) {
        let persona = personaList[i];
        if (persona.arcana == lastArcana) continue;
        lastArcana = persona.arcana;
        arcanaRank_[persona.arcana] = rank++;
    }
    return arcanaRank_;
})();

const getRank = persona => arcanaRank[persona.arcana];

const getResultArcana = (arcana1, arcana2) => {
    for (let i = 0; i < arcana2Combos.length; i++) {
        let combo = arcana2Combos[i];
        if ((combo.source[0] == arcana1 && combo.source[1] == arcana2) ||
            (combo.source[0] == arcana2 && combo.source[1] == arcana1)) {
            return combo.result;
        }
    }
};