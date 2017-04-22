///<reference path="../data/Data5.ts"/>
///<reference path="../src/DataUtil.ts"/>
///<reference path="../src/FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="d.ts/mocha.d.ts"/>
///<reference path="d.ts/expect.js.d.ts"/>
var fullPersonaeByArcana = (function () {
    var personaeByArcana_ = {};
    for (var i = 0; i < fullPersonaList.length; i++) {
        var persona = fullPersonaList[i];
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
var calc = new FusionCalculator(fullPersonaeByArcana);
function fuseTestWrapper(persona1Name, persona2Name) {
    return calc.fuse(personaMap[persona1Name], personaMap[persona2Name]);
}
function containAll(recipe, personaNames) {
    return personaNames.map(function (a) { return personaMap[a]; })
        .every(function (val) { return recipe.sources.indexOf(val) !== -1; });
}
describe('FusionCalculator', function () {
    describe('#fuse()', function () {
        describe('same arcana fusion', function () {
            it('should return null when fusing 2 lowest rank persona', function () {
                expect(fuseTestWrapper("Obariyon", "Arsene")).to.equal(null);
            });
            it('should return correct persona when fusing 2 highest rank persona', function () {
                expect(fuseTestWrapper("Beelzebub", "Belial")).to.equal(personaMap["Nebiros"]);
            });
            it('should return correct persona when have to skip special persona below 2 ingredients', function () {
                expect(fuseTestWrapper("Ananta", "Kaiwan")).to.equal(personaMap["Fuu-Ki"]);
            });
            it('should return correct persona when have to skip rare persona below 2 ingredients', function () {
                expect(fuseTestWrapper("Moloch", "Hecatoncheir")).to.equal(personaMap["Take-Minakata"]);
            });
            it('should return correct persona when have to skip rare and special personae below 2 ingredients', function () {
                expect(fuseTestWrapper("Dionysus", "Black Frost")).to.equal(personaMap["Ose"]);
            });
            it('should return correct persona when result level is midway of 2 ingredients, and right on level', function () {
                expect(fuseTestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });
            it('should return correct persona when result level is midway of 2 ingredients, and have to go down', function () {
                expect(fuseTestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });
            it('should return correct persona when have to skip rare midway and skip ingredient when fusing 2 persona', function () {
                expect(fuseTestWrapper("Take-Minakata", "Hecatoncheir")).to.equal(personaMap["Orthrus"]);
            });
        });
        describe('different arcana fusion', function () {
            it('should return null when result level is higher than the highest level persona in the resulting arcana ' +
                '(tower 79 + fool 83 -> empress 81 -> null)', function () {
                expect(fuseTestWrapper("Vishnu", "Yoshitsune")).to.equal(null);
            });
            it('should return correct persona when result is the highest ranked persona in the resulting arcana ' +
                '(judgement 92 + hierophant 63 -> empress 80)', function () {
                expect(fuseTestWrapper("Satan", "Forneus")).to.equal(personaMap["Mother Harlot"]);
            });
            it('should return correct persona when fusing 2 persona, one highest rank and one lowest rank ' +
                '(star 93 + temperance 7 -> sun 53)', function () {
                expect(fuseTestWrapper("Lucifer", "Genbu")).to.equal(personaMap["Ganesha"]);
            });
            it('should return correct persona when fusing 2 rare persona', function () {
                expect(fuseTestWrapper("Crystal Skull", "Regent")).to.equal(personaMap["Mithra"]);
            });
        });
        describe('special fusion)', function () {
            it('should return Alice when fusing Nebiros and Belial', function () {
                expect(fuseTestWrapper("Nebiros", "Belial")).to.equal(personaMap["Alice"]);
            });
            it('should return Shiva when fusing Rangda and Barong', function () {
                expect(fuseTestWrapper("Rangda", "Barong")).to.equal(personaMap["Shiva"]);
            });
            it('should return Ardha when fusing Parvati and Shiva', function () {
                expect(fuseTestWrapper("Parvati", "Shiva")).to.equal(personaMap["Ardha"]);
            });
        });
        describe('rare fusion', function () {
            it('should return correct persona when go down one', function () {
                expect(fuseTestWrapper("Regent", "Obariyon")).to.equal(personaMap["Arsene"]);
            });
            it('should return correct persona when go up two', function () {
                expect(fuseTestWrapper("Stone of Scone", "Nekomata")).to.equal(personaMap["Choronzon"]);
            });
            it('should return correct persona when go up one and skip special', function () {
                expect(fuseTestWrapper("Orlov", "Fuu-Ki")).to.equal(personaMap["Kaiwan"]);
            });
            it('should return correct persona when go up one and have special persona as ingredient', function () {
                expect(fuseTestWrapper("Orlov", "Neko Shogun")).to.equal(personaMap["Kaiwan"]);
            });
        });
    });
    describe('#getRecipes()', function () {
        describe('special fusions', function () {
            it('should return correct recipe for Ardha', function () {
                var recipes = calc.getRecipes(personaMap["Ardha"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(2);
                expect(containAll(recipes[0], ['Parvati', 'Shiva'])).to.be(true);
            });
            it('should return correct recipe for Alice', function () {
                var recipes = calc.getRecipes(personaMap["Alice"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(2);
                expect(containAll(recipes[0], ['Belial', 'Nebiros'])).to.be(true);
            });
            it('should return correct recipe for Ongyo-Ki', function () {
                var recipes = calc.getRecipes(personaMap["Ongyo-Ki"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(3);
                expect(containAll(recipes[0], ['Kin-Ki', 'Sui-Ki', 'Fuu-Ki'])).to.be(true);
            });
            it('should return correct recipe for Kohryu', function () {
                var recipes = calc.getRecipes(personaMap["Kohryu"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(4);
                expect(containAll(recipes[0], ['Genbu', 'Seiryu', 'Suzaku', 'Byakko'])).to.be(true);
            });
            it('should return correct recipe for Sraosha', function () {
                var recipes = calc.getRecipes(personaMap["Sraosha"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(5);
                expect(containAll(recipes[0], ['Mithra', 'Mithras', 'Melchizedek', 'Lilith', 'Gabriel'])).to.be(true);
            });
            it('should return correct recipe for Satanael', function () {
                var recipes = calc.getRecipes(personaMap["Satanael"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(6);
                expect(containAll(recipes[0], ['Arsene', 'Anzu', 'Ishtar', 'Satan', 'Lucifer', 'Michael'])).to.be(true);
            });
        });
        describe('rare persona (cannot be fused)', function () {
            it('should return empty recipe list for Regent', function () {
                var recipes = calc.getRecipes(personaMap["Regent"]);
                expect(recipes).to.have.length(0);
            });
            it('should return empty recipe list for Stone of Scone', function () {
                var recipes = calc.getRecipes(personaMap["Stone of Scone"]);
                expect(recipes).to.have.length(0);
            });
            it('should return empty recipe list for Orlov', function () {
                var recipes = calc.getRecipes(personaMap["Orlov"]);
                expect(recipes).to.have.length(0);
            });
        });
        // note: these count the number of recipes and may not be correct
        describe('normal fusion', function () {
            it('should return correct number of recipe for Arsene', function () {
                var recipes = calc.getRecipes(personaMap["Arsene"]);
                expect(recipes).to.have.length(6);
            });
            it('should return correct number of recipe for Apsaras', function () {
                var recipes = calc.getRecipes(personaMap["Apsaras"]);
                expect(recipes).to.have.length(35);
            });
            it('should return correct number of recipe for Orthrus', function () {
                var recipes = calc.getRecipes(personaMap["Orthrus"]);
                expect(recipes).to.have.length(46);
            });
            it('should return correct number of recipe for Kikuri-Hime', function () {
                var recipes = calc.getRecipes(personaMap["Kikuri-Hime"]);
                expect(recipes).to.have.length(333);
            });
            it('should return correct number of recipe for Lilith', function () {
                var recipes = calc.getRecipes(personaMap["Lilith"]);
                expect(recipes).to.have.length(82);
            });
            it('should return correct number of recipe for Ishtar', function () {
                var recipes = calc.getRecipes(personaMap["Ishtar"]);
                expect(recipes).to.have.length(22);
            });
        });
    });
});
describe('Data', function () {
    it("all persona's skills should be in the skill list", function () {
        expect(checkSkill()).to.equal(true);
    });
});
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
