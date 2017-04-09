///<reference path="../data/Data5.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
function addStatProperties(persona) {
    persona.strength = persona.stats[0];
    persona.magic = persona.stats[1];
    persona.endurance = persona.stats[2];
    persona.agility = persona.stats[3];
    persona.luck = persona.stats[4];
}
function addElementProperties(persona) {
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
var personaList = (function () {
    var arr = [];
    for (var key in personaMap) {
        if (personaMap.hasOwnProperty(key)) {
            var persona = personaMap[key];
            persona.name = key;
            addStatProperties(persona);
            addElementProperties(persona);
            arr.push(persona);
        }
    }
    return arr;
})();
var personaeByArcana = (function () {
    var personaeByArcana_ = {};
    for (var i = 0; i < personaList.length; i++) {
        var persona = personaList[i];
        if (!personaeByArcana_[persona.arcana]) {
            personaeByArcana_[persona.arcana] = [];
        }
        personaeByArcana_[persona.arcana].push(persona);
    }
    for (var key in personaeByArcana_) {
        personaeByArcana_[key].sort(function (a, b) { return a.level - b.level; });
    }
    return personaeByArcana_;
})();
var arcanaRank = (function () {
    var arcanaRank_ = {};
    var rank = 0;
    var lastArcana = null;
    for (var i = 0; i < personaList.length; i++) {
        var persona = personaList[i];
        if (persona.arcana == lastArcana)
            continue;
        lastArcana = persona.arcana;
        arcanaRank_[persona.arcana] = rank++;
    }
    return arcanaRank_;
})();
var getRank = function (persona) { return arcanaRank[persona.arcana]; };
var getResultArcana = function (arcana1, arcana2) {
    for (var i = 0; i < arcana2Combos.length; i++) {
        var combo = arcana2Combos[i];
        if ((combo.source[0] == arcana1 && combo.source[1] == arcana2) ||
            (combo.source[0] == arcana2 && combo.source[1] == arcana1)) {
            return combo.result;
        }
    }
};
