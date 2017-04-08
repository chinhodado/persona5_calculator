///<reference path="../data/Data5.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var personaeByName = (function () {
    var personaeByName_ = {};
    for (var i = 0, persona = null; persona = personae[i]; i++) {
        personaeByName_[persona.name] = persona;
    }
    return personaeByName_;
})();
var personaeByArcana = (function () {
    var personaeByArcana_ = {};
    for (var i = 0, persona = null; persona = personae[i]; i++) {
        if (!personaeByArcana_[persona.arcana]) {
            personaeByArcana_[persona.arcana] = [];
        }
        personaeByArcana_[persona.arcana].push(persona);
    }
    return personaeByArcana_;
})();
var arcanaRank = (function () {
    var arcanaRank_ = {};
    var rank = 0;
    var lastArcana = null;
    for (var i = 0, persona = null; persona = personae[i]; i++) {
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
