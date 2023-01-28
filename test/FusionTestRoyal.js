///<reference path="../data/ItemDataRoyal.ts"/>
// This is a js file so that tsc does not compile it, so that it doesn't complain about the const globals being redefined
var fs = require('fs');
eval(fs.readFileSync("data/Data5Royal.js") + '');
eval(fs.readFileSync("data/PersonaDataRoyal.js") + '');
eval(fs.readFileSync("data/SkillDataRoyal.js") + '');
eval(fs.readFileSync("data/ItemDataRoyal.js") + '');

// This is ugly as hell
var rarePersonae = rarePersonaeRoyal;
var rareCombos = rareCombosRoyal;
var arcana2Combos = arcana2CombosRoyal;
var specialCombos = specialCombosRoyal;
var dlcPersona = dlcPersonaRoyal;
var personaMap = personaMapRoyal;
var skillMap = skillMapRoyal;
var itemMap = itemMapRoyal;

eval(fs.readFileSync("src/FusionCalculator.js") + '');
eval(fs.readFileSync("src/DataUtil.js") + '');
eval(fs.readFileSync("test/TestUtil.js") + '');
var expect = require('chai').expect;

describe('DataRoyal', function () {
    it("all persona's skills should be in the skill list", function () {
        expect(checkSkill()).to.equal(true);
    });
    it("all persona's traits should be in the skill list", function () {
        expect(checkTrait()).to.equal(true);
    });
    it("all skills in SkillData should have valid persona in the persona list, and " +
        "all skills in SkillData should have correct list of persona that learn that skill at the correct level", function () {
        expect(checkSkillPersona()).to.equal(true);
    });
    it("all items associated with each persona should be found in ItemDataRoyal if it is not a skill card " +
        "and all skill cards should have data in SkillDataRoyal, including alarm itemizations", () => {
        expect(checkItemization()).to.equal(true);
    });
});
