///<reference path="../data/Data5.ts"/>
///<reference path="../src/DataUtil.ts"/>
///<reference path="../src/FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>
///<reference path="d.ts/mocha.d.ts"/>
///<reference path="d.ts/expect.js.d.ts"/>

function fuse2TestWrapper(persona1Name: string, persona2Name: string): PersonaData {
    let persona1 = personaMap[persona1Name];
    let persona2 = personaMap[persona2Name];
    let resultArcana = getResultArcana(persona1.arcana, persona2.arcana);
    let actualResult = FusionCalculator.fuse2(resultArcana, persona1, persona2);
    return actualResult;
}

describe('FusionCalculator', () => {
    describe('#fuse2()', () => {
        describe('same arcana', () => {
            it('should return null when fusing 2 lowest rank persona in an arcana', () => {
                expect(fuse2TestWrapper("Obariyon", "Arsene")).to.equal(null);
            });

            it('should return correct persona when fusing 2 highest rank persona in an arcana', () => {
                expect(fuse2TestWrapper("Beelzebub", "Belial")).to.equal(personaMap["Nebiros"]);
            });

            it('should skip special below 2 ingredients', () => {
                expect(fuse2TestWrapper("Ananta", "Kaiwan")).to.equal(personaMap["Fuu-Ki"]);
            });

            it('should skip rare below 2 ingredients', () => {
                expect(fuse2TestWrapper("Moloch", "Hecatoncheir")).to.equal(personaMap["Take-Minakata"]);
            });

            it('should skip rare and special below 2 ingredients', () => {
                expect(fuse2TestWrapper("Dionysus", "Black Frost")).to.equal(personaMap["Ose"]);
            });

            it('should return correct persona when result level is midway of 2 ingredients, and right on level', () => {
                expect(fuse2TestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });

            it('should return correct persona when result level is midway of 2 ingredients, and have to go down', () => {
                expect(fuse2TestWrapper("Shiki-Ouji", "Slime")).to.equal(personaMap["Shiisaa"]);
            });

            it('should return correct persona when have to skip rare midway and skip ingredient', () => {
                expect(fuse2TestWrapper("Take-Minakata", "Hecatoncheir")).to.equal(personaMap["Orthrus"]);
            });
        });

        describe('different arcana', function () {
            it('should return null when result level is higher than the highest level persona in the resulting arcana ' +
                '(tower 79 + fool 83 -> empress 81 -> null)', () => {
                expect(fuse2TestWrapper("Vishnu", "Yoshitsune")).to.equal(null);
            });

            it('should return correct persona when result is the highest ranked persona in the resulting arcana ' +
                '(judgement 92 + hierophant 63 -> empress 80)', () => {
                expect(fuse2TestWrapper("Satan", "Forneus")).to.equal(personaMap["Mother Harlot"]);
            });

            it('should return correct persona when fusing 2 persona in different arcana, one highest rank and one lowest rank ' +
                '(star 93 + temperance 7 -> sun 53)', () => {
                expect(fuse2TestWrapper("Lucifer", "Genbu")).to.equal(personaMap["Ganesha"]);
            });

            it('should return correct persona when fusing 2 rare persona)', () => {
                expect(fuse2TestWrapper("Crystal Skull", "Regent")).to.equal(personaMap["Mithra"]);
            });
        });

        describe('rare fusion (not handled by fuse2())', function () {
            it('should return null when fusing 2 rare persona', () => {
                expect(fuse2TestWrapper("Obariyon", "Regent")).to.equal(null);
            });

            it('should return null when fusing 2 rare persona', () => {
                expect(fuse2TestWrapper("Nekomata", "Stone of Scone")).to.equal(null);
            });
        });

        describe('special formula (not handled by fuse2())', function () {
            it('should return null when fusing 2 persona that are part of a special formula', () => {
                expect(fuse2TestWrapper("Nebiros", "Belial")).to.equal(null);
            });

            it('should return null when fusing 2 persona that are part of a special formula', () => {
                expect(fuse2TestWrapper("Rangda", "Barong")).to.equal(null);
            });
        });
    });
});