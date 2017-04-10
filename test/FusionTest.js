///<reference path="../data/Data5.ts"/>
///<reference path="../src/DataUtil.ts"/>
///<reference path="../src/FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="d.ts/mocha.d.ts"/>
///<reference path="d.ts/expect.js.d.ts"/>
function fuse2TestWrapper(persona1Name, persona2Name) {
    var persona1 = personaMap[persona1Name];
    var persona2 = personaMap[persona2Name];
    var resultArcana = getResultArcana(persona1.arcana, persona2.arcana);
    var actualResult = FusionCalculator.fuse2(resultArcana, persona1, persona2);
    return actualResult;
}
describe('FusionCalculator', function () {
    describe('#fuse2()', function () {
        describe('same arcana', function () {
            it('should return null when fusing 2 lowest rank persona in an arcana', function () {
                expect(fuse2TestWrapper("Obariyon", "Arsene")).to.equal(null);
            });
            it('should return correct persona when fusing 2 highest rank persona in an arcana', function () {
                expect(fuse2TestWrapper("Beelzebub", "Belial")).to.equal(personaMap["Nebiros"]);
            });
            it('should skip special below 2 ingredients', function () {
                expect(fuse2TestWrapper("Ananta", "Kaiwan")).to.equal(personaMap["Fuu-Ki"]);
            });
            it('should skip rare below 2 ingredients', function () {
                expect(fuse2TestWrapper("Moloch", "Hecatoncheir")).to.equal(personaMap["Take-Minakata"]);
            });
            it('should skip rare and special below 2 ingredients', function () {
                expect(fuse2TestWrapper("Dionysus", "Black Frost")).to.equal(personaMap["Ose"]);
            });
            it('should return correct persona when result level is midway of 2 ingredients, and right on level', function () {
                expect(fuse2TestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });
            it('should return correct persona when result level is midway of 2 ingredients, and have to go down', function () {
                expect(fuse2TestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });
            it('should return correct persona when have to skip rare midway and skip ingredient', function () {
                expect(fuse2TestWrapper("Take-Minakata", "Hecatoncheir")).to.equal(personaMap["Orthrus"]);
            });
        });
        describe('different arcana', function () {
            it('should return null when result level is higher than the highest level persona in the resulting arcana ' +
                '(tower 79 + fool 83 -> empress 81 -> null)', function () {
                expect(fuse2TestWrapper("Vishnu", "Yoshitsune")).to.equal(null);
            });
            it('should return correct persona when result is the highest ranked persona in the resulting arcana ' +
                '(judgement 92 + hierophant 63 -> empress 80)', function () {
                expect(fuse2TestWrapper("Satan", "Forneus")).to.equal(personaMap["Mother Harlot"]);
            });
            it('should return correct persona when fusing 2 persona in different arcana, one highest rank and one lowest rank ' +
                '(star 93 + temperance 7 -> sun 53)', function () {
                expect(fuse2TestWrapper("Lucifer", "Genbu")).to.equal(personaMap["Ganesha"]);
            });
            it('should return correct persona when fusing 2 rare persona)', function () {
                expect(fuse2TestWrapper("Crystal Skull", "Regent")).to.equal(personaMap["Mithra"]);
            });
        });
        describe('rare fusion (not handled by fuse2())', function () {
            it('should return null when fusing 2 rare persona', function () {
                expect(fuse2TestWrapper("Obariyon", "Regent")).to.equal(null);
            });
            it('should return null when fusing 2 rare persona', function () {
                expect(fuse2TestWrapper("Nekomata", "Stone of Scone")).to.equal(null);
            });
        });
        describe('special formula (not handled by fuse2())', function () {
            it('should return null when fusing 2 persona that are part of a special formula', function () {
                expect(fuse2TestWrapper("Nebiros", "Belial")).to.equal(null);
            });
            it('should return null when fusing 2 persona that are part of a special formula', function () {
                expect(fuse2TestWrapper("Rangda", "Barong")).to.equal(null);
            });
        });
    });
});
