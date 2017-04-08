///<reference path="../data/Data5.ts"/>

/**
 * Created by Chin on 08-Apr-17.
 */
const personaeByName = (() =>{
    let personaeByName_ = {};
    for (let i = 0, persona = null; persona = personae[i]; i++) {
        personaeByName_[persona.name] = persona;
    }
    return personaeByName_;
})();

const personaeByArcana = (() =>{
    let personaeByArcana_ = {};
    for (let i = 0, persona = null; persona = personae[i]; i++) {
        if (!personaeByArcana_[persona.arcana]) {
            personaeByArcana_[persona.arcana] = [];
        }
        personaeByArcana_[persona.arcana].push(persona);
    }
    return personaeByArcana_;
})();

const arcanaRank = (() =>{
    let arcanaRank_ = {};
    let rank = 0;
    let lastArcana = null;
    for (let i = 0, persona = null; persona = personae[i]; i++) {
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