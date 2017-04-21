///<reference path="../data/Data5.ts"/>
///<reference path="../src/DataUtil.ts"/>
///<reference path="../src/FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="d.ts/mocha.d.ts"/>
///<reference path="d.ts/expect.js.d.ts"/>

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

function fuse2TestWrapper(persona1Name: string, persona2Name: string): PersonaData {
    return calc.fuse2(personaMap[persona1Name], personaMap[persona2Name]);
}

function fuseRareTestWrapper(rarePersonaName: string, persona2Name: string): PersonaData {
    return calc.fuseRare(personaMap[rarePersonaName], personaMap[persona2Name]);
}

function containAll(recipe: Recipe, personaNames: string[]): boolean {
    return personaNames.map(a => personaMap[a])
        .every(val => recipe.sources.indexOf(val) !== -1);
}

describe('FusionCalculator', () => {
    describe('#fuse2()', () => {
        describe('same arcana fusion', () => {
            it('should return null when fusing 2 lowest rank persona', () => {
                expect(fuse2TestWrapper("Obariyon", "Arsene")).to.equal(null);
            });

            it('should return correct persona when fusing 2 highest rank persona', () => {
                expect(fuse2TestWrapper("Beelzebub", "Belial")).to.equal(personaMap["Nebiros"]);
            });

            it('should return correct persona when have to skip special persona below 2 ingredients', () => {
                expect(fuse2TestWrapper("Ananta", "Kaiwan")).to.equal(personaMap["Fuu-Ki"]);
            });

            it('should return correct persona when have to skip rare persona below 2 ingredients', () => {
                expect(fuse2TestWrapper("Moloch", "Hecatoncheir")).to.equal(personaMap["Take-Minakata"]);
            });

            it('should return correct persona when have to skip rare and special personae below 2 ingredients', () => {
                expect(fuse2TestWrapper("Dionysus", "Black Frost")).to.equal(personaMap["Ose"]);
            });

            it('should return correct persona when result level is midway of 2 ingredients, and right on level', () => {
                expect(fuse2TestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });

            it('should return correct persona when result level is midway of 2 ingredients, and have to go down', () => {
                expect(fuse2TestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });

            it('should return correct persona when have to skip rare midway and skip ingredient when fusing 2 persona', () => {
                expect(fuse2TestWrapper("Take-Minakata", "Hecatoncheir")).to.equal(personaMap["Orthrus"]);
            });
        });

        describe('different arcana fusion', function () {
            it('should return null when result level is higher than the highest level persona in the resulting arcana ' +
                '(tower 79 + fool 83 -> empress 81 -> null)', () => {
                expect(fuse2TestWrapper("Vishnu", "Yoshitsune")).to.equal(null);
            });

            it('should return correct persona when result is the highest ranked persona in the resulting arcana ' +
                '(judgement 92 + hierophant 63 -> empress 80)', () => {
                expect(fuse2TestWrapper("Satan", "Forneus")).to.equal(personaMap["Mother Harlot"]);
            });

            it('should return correct persona when fusing 2 persona, one highest rank and one lowest rank ' +
                '(star 93 + temperance 7 -> sun 53)', () => {
                expect(fuse2TestWrapper("Lucifer", "Genbu")).to.equal(personaMap["Ganesha"]);
            });

            it('should return correct persona when fusing 2 rare persona', () => {
                expect(fuse2TestWrapper("Crystal Skull", "Regent")).to.equal(personaMap["Mithra"]);
            });
        });

        describe('rare fusion (not handled by fuse2())', function () {
            it('should return null when doing a rare fusion, and rare persona is first argument', () => {
                expect(fuse2TestWrapper("Obariyon", "Regent")).to.equal(null);
            });

            it('should return null when doing a rare fusion, and rare persona is second argument', () => {
                expect(fuse2TestWrapper("Stone of Scone", "Nekomata")).to.equal(null);
            });
        });

        describe('special formula (not handled by fuse2())', function () {
            it('should return null when fusing Nebiros and Belial', () => {
                expect(fuse2TestWrapper("Nebiros", "Belial")).to.equal(null);
            });

            it('should return null when fusing Rangda and Barong', () => {
                expect(fuse2TestWrapper("Rangda", "Barong")).to.equal(null);
            });

            it('should return null when fusing Parvati and Shiva', () => {
                expect(fuse2TestWrapper("Parvati", "Shiva")).to.equal(null);
            });
        });
    });

    describe('#fuseRare()', function () {
        it('should return correct persona when go down one', () => {
            expect(fuseRareTestWrapper("Regent", "Obariyon")).to.equal(personaMap["Arsene"]);
        });

        it('should return correct persona when go up two', () => {
            expect(fuseRareTestWrapper("Stone of Scone", "Nekomata")).to.equal(personaMap["Choronzon"]);
        });

        it('should return correct persona when go up one and skip special', () => {
            expect(fuseRareTestWrapper("Orlov", "Fuu-Ki")).to.equal(personaMap["Kaiwan"]);
        });

        it('should return correct persona when go up one and have special persona as ingredient', () => {
            expect(fuseRareTestWrapper("Orlov", "Neko Shogun")).to.equal(personaMap["Kaiwan"]);
        });
    });
    describe('#getRecipes()', () => {
        describe('special fusions', function () {
            it('should return correct recipe for Ardha', () => {
                let recipes = calc.getRecipes(personaMap["Ardha"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(2);
                expect(containAll(recipes[0], ['Parvati', 'Shiva'])).to.be(true);
            });

            it('should return correct recipe for Alice', () => {
                let recipes = calc.getRecipes(personaMap["Alice"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(2);
                expect(containAll(recipes[0], ['Belial', 'Nebiros'])).to.be(true);
            });

            it('should return correct recipe for Ongyo-Ki', () => {
                let recipes = calc.getRecipes(personaMap["Ongyo-Ki"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(3);
                expect(containAll(recipes[0], ['Kin-Ki', 'Sui-Ki', 'Fuu-Ki'])).to.be(true);
            });

            it('should return correct recipe for Kohryu', () => {
                let recipes = calc.getRecipes(personaMap["Kohryu"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(4);
                expect(containAll(recipes[0], ['Genbu', 'Seiryu', 'Suzaku', 'Byakko'])).to.be(true);
            });

            it('should return correct recipe for Sraosha', () => {
                let recipes = calc.getRecipes(personaMap["Sraosha"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(5);
                expect(containAll(recipes[0], ['Mithra', 'Mithras', 'Melchizedek', 'Lilith', 'Gabriel'])).to.be(true);
            });

            it('should return correct recipe for Satanael', () => {
                let recipes = calc.getRecipes(personaMap["Satanael"]);
                expect(recipes).to.have.length(1);
                expect(recipes[0].sources).to.have.length(6);
                expect(containAll(recipes[0], ['Arsene', 'Anzu', 'Ishtar', 'Satan', 'Lucifer', 'Michael'])).to.be(true);
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
            it('should return correct number of recipe for Arsene', () => {
                let recipes = calc.getRecipes(personaMap["Arsene"]);
                expect(recipes).to.have.length(6);
            });

            it('should return correct number of recipe for Apsaras', () => {
                let recipes = calc.getRecipes(personaMap["Apsaras"]);
                expect(recipes).to.have.length(35);
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
});

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
