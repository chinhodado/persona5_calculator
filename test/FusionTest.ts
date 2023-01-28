///<reference path="../data/Data5.ts"/>
///<reference path="../src/DataUtil.ts"/>
///<reference path="../src/FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="../data/ItemData.ts"/>

var fs = require('fs');
eval(fs.readFileSync("data/Data5.js") + '');
eval(fs.readFileSync("data/PersonaData.js") + '');
eval(fs.readFileSync("data/SkillData.js") + '');
eval(fs.readFileSync("data/ItemData.js") + '');
eval(fs.readFileSync("src/FusionCalculator.js") + '');
eval(fs.readFileSync("src/DataUtil.js") + '');
eval(fs.readFileSync("test/TestUtil.js") + '');

var expect = require('chai').expect;

const fullPersonaeByArcana : {[arcana: string]: PersonaData[]} = (() =>{
    let personaeByArcana_ = {};
    for (let i = 0; i < fullPersonaList.length; i++) {
        let persona = fullPersonaList[i];
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

let calc = new FusionCalculator(fullPersonaeByArcana);

describe('FusionCalculator', () => {
    describe('#fuse()', () => {
        describe('same arcana fusion', () => {
            it('should return null when fusing 2 lowest rank persona', () => {
                expect(fuseTestWrapper("Obariyon", "Arsène")).to.equal(null);
            });

            it('should return correct persona when fusing 2 highest rank persona', () => {
                expect(fuseTestWrapper("Beelzebub", "Belial")).to.equal(personaMap["Nebiros"]);
            });

            it('should return correct persona when have to skip special persona below 2 ingredients', () => {
                expect(fuseTestWrapper("Ananta", "Kaiwan")).to.equal(personaMap["Fuu-Ki"]);
            });

            it('should return correct persona when have to skip rare persona below 2 ingredients', () => {
                expect(fuseTestWrapper("Moloch", "Hecatoncheires")).to.equal(personaMap["Take-Minakata"]);
            });

            it('should return correct persona when have to skip rare and special personae below 2 ingredients', () => {
                expect(fuseTestWrapper("Dionysus", "Black Frost")).to.equal(personaMap["Ose"]);
            });

            it('should return correct persona when result level is midway of 2 ingredients, and right on level', () => {
                expect(fuseTestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });

            it('should return correct persona when result level is midway of 2 ingredients, and have to go down', () => {
                expect(fuseTestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });

            it('should return correct persona when have to skip rare midway and skip ingredient when fusing 2 persona', () => {
                expect(fuseTestWrapper("Take-Minakata", "Hecatoncheires")).to.equal(personaMap["Orthrus"]);
            });

            it('should return null when have to skip special midway, then skip ingredient, and ingredient is lowest in arcana rank', () => {
                expect(fuseTestWrapper("Messiah", "Anubis")).to.equal(null);
            });
        });

        describe('different arcana fusion', function () {
            it('should return null when result level is higher than the highest level persona in the resulting arcana ' +
                '(tower 79 + fool 83 -> empress 81 -> null)', () => {
                expect(fuseTestWrapper("Vishnu", "Yoshitsune")).to.equal(null);
            });

            it('should return correct persona when result is the highest ranked persona in the resulting arcana ' +
                '(judgement 92 + hierophant 63 -> empress 80)', () => {
                expect(fuseTestWrapper("Satan", "Forneus")).to.equal(personaMap["Mother Harlot"]);
            });

            it('should return correct persona when fusing 2 persona, one highest rank and one lowest rank ' +
                '(star 93 + temperance 7 -> sun 53)', () => {
                expect(fuseTestWrapper("Lucifer", "Genbu")).to.equal(personaMap["Ganesha"]);
            });

            it('should return correct persona when fusing 2 rare persona', () => {
                expect(fuseTestWrapper("Crystal Skull", "Regent")).to.equal(personaMap["Mitra"]);
            });
        });

        describe('special fusion', function () {
            it('should return Alice when fusing Nebiros and Belial', () => {
                expect(fuseTestWrapper("Nebiros", "Belial")).to.equal(personaMap["Alice"]);
            });

            it('should return Shiva when fusing Rangda and Barong', () => {
                expect(fuseTestWrapper("Rangda", "Barong")).to.equal(personaMap["Shiva"]);
            });

            it('should return Ardha when fusing Parvati and Shiva', () => {
                expect(fuseTestWrapper("Parvati", "Shiva")).to.equal(personaMap["Ardha"]);
            });
        });

        describe('rare fusion', function () {
            it('should return correct persona when go down one', () => {
                expect(fuseTestWrapper("Regent", "Obariyon")).to.equal(personaMap["Arsène"]);
            });

            it('should return correct persona when go up two', () => {
                expect(fuseTestWrapper("Stone of Scone", "Nekomata")).to.equal(personaMap["Choronzon"]);
            });

            it('should return correct persona when go up one and skip special', () => {
                expect(fuseTestWrapper("Orlov", "Fuu-Ki")).to.equal(personaMap["Kaiwan"]);
            });

            it('should return correct persona when go up one and have special persona as ingredient', () => {
                expect(fuseTestWrapper("Orlov", "Neko Shogun")).to.equal(personaMap["Kaiwan"]);
            });

            it('should return correct persona when go up one and skip multiple specials', () => {
                expect(fuseTestWrapper("Regent", "Cu Chulainn")).to.equal(null);
            });

            it('should return correct persona when go down one and skip rare persona', () => {
                expect(fuseTestWrapper("Regent", "Zouchouten")).to.equal(personaMap["Rakshasa"]);
            });
        });

        describe('impossible fusions with Judgement', function () {
            it('should return null when fusing Judgement + Death', () => {
                expect(fuseTestWrapper("Messiah", "Mandrake")).to.equal(null);
                expect(fuseTestWrapper("Trumpeter", "Hell Biker")).to.equal(null);
            });

            it('should return null when fusing Judgement + Chariot', () => {
                expect(fuseTestWrapper("Messiah", "Agathion")).to.equal(null);
            });

            it('should return null when fusing Judgement + Strength', () => {
                expect(fuseTestWrapper("Messiah Picaro", "Kelpie")).to.equal(null);
            });

            it('should return null when fusing Judgement + Justice', () => {
                expect(fuseTestWrapper("Messiah Picaro", "Angel")).to.equal(null);
                expect(fuseTestWrapper("Power", "Anubis")).to.equal(null);
            });
        });
    });

    describe('#getRecipes()', () => {
        describe('special fusions', function () {
            it('should return correct recipe for Ardha', () => {
                let recipes = calc.getRecipes(personaMap["Ardha"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(2);
                expect(containAll(recipes[0], ['Parvati', 'Shiva'])).to.equal(true);
            });

            it('should return correct recipe for Alice', () => {
                let recipes = calc.getRecipes(personaMap["Alice"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(2);
                expect(containAll(recipes[0], ['Belial', 'Nebiros'])).to.equal(true);
            });

            it('should return correct recipe for Ongyo-Ki', () => {
                let recipes = calc.getRecipes(personaMap["Ongyo-Ki"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(3);
                expect(containAll(recipes[0], ['Kin-Ki', 'Sui-Ki', 'Fuu-Ki'])).to.equal(true);
            });

            it('should return correct recipe for Kohryu', () => {
                let recipes = calc.getRecipes(personaMap["Kohryu"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(4);
                expect(containAll(recipes[0], ['Genbu', 'Seiryu', 'Suzaku', 'Byakko'])).to.equal(true);
            });

            it('should return correct recipe for Sraosha', () => {
                let recipes = calc.getRecipes(personaMap["Sraosha"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(5);
                expect(containAll(recipes[0], ['Mitra', 'Mithras', 'Melchizedek', 'Lilith', 'Gabriel'])).to.equal(true);
            });

            it('should return correct recipe for Satanael', () => {
                let recipes = calc.getRecipes(personaMap["Satanael"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(6);
                expect(containAll(recipes[0], ['Arsène', 'Anzu', 'Ishtar', 'Satan', 'Lucifer', 'Michael'])).to.equal(true);
            });
        });

        describe('rare persona (cannot be fused)', function () {
            it('should return empty recipe list for Regent', () => {
                let recipes = calc.getRecipes(personaMap["Regent"]);
                expect(recipes).to.have.length(0);
            });

            it('should return empty recipe list for Stone of Scone', () => {
                let recipes = calc.getRecipes(personaMap["Stone of Scone"]);
                expect(recipes).to.have.length(0);
            });

            it('should return empty recipe list for Orlov', () => {
                let recipes = calc.getRecipes(personaMap["Orlov"]);
                expect(recipes).to.have.length(0);
            });
        });

        // note: these count the number of recipes and may not be correct
        describe('normal fusion', function () {
            it('should return correct number of recipe for Arsène', () => {
                let recipes = calc.getRecipes(personaMap["Arsène"]);
                expect(recipes).to.have.length(6);
            });

            it('should return correct number of recipe for Apsaras', () => {
                let recipes = calc.getRecipes(personaMap["Apsaras"]);
                expect(recipes).to.have.length(38);
            });

            it('should return correct number of recipe for Orthrus', () => {
                let recipes = calc.getRecipes(personaMap["Orthrus"]);
                expect(recipes).to.have.length(46);
            });

            it('should return correct number of recipe for Kikuri-Hime', () => {
                let recipes = calc.getRecipes(personaMap["Kikuri-Hime"]);
                expect(recipes).to.have.length(333);
            });

            it('should return correct number of recipe for Lilith', () => {
                let recipes = calc.getRecipes(personaMap["Lilith"]);
                expect(recipes).to.have.length(82);
            });

            it('should return correct number of recipe for Ishtar', () => {
                let recipes = calc.getRecipes(personaMap["Ishtar"]);
                expect(recipes).to.have.length(22);
            });
        });
    });
});

describe('Data', () => {
    it("all persona's skills should be in the skill list", () => {
        expect(checkSkill()).to.equal(true);
    });

    it("all skills in SkillData should have valid persona in the persona list, and " +
        "all skills in SkillData should have correct list of persona that learn that skill at the correct level", () => {
        expect(checkSkillPersona()).to.equal(true);
    });
    it("all items associated with each persona should be found in ItemData if it is not a skill card " +
        "and all skill cards should have data in SkillData", () => {
        expect(checkItemization()).to.equal(true);
    });
});