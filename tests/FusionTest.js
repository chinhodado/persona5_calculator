///<reference path="../data/Data5.ts"/>
///<reference path="../src/DataUtil.ts"/>
///<reference path="../src/FusionCalculator.ts"/>
var runFuse2Tests = function () {
    console.log("Testing fuse2()...");
    var tests = [
        //same arcana
        { ingredients: ["Obariyon", "Arsène"], result: null },
        { ingredients: ["Beelzebub", "Belial"], result: "Nebiros" },
        { ingredients: ["Ananta", "Kaiwan"], result: "Fuu-Ki" },
        { ingredients: ["Moloch", "Hecatoncheir"], result: "Take-Minakata" },
        { ingredients: ["Dionysus", "Black Frost"], result: "Ose" },
        { ingredients: ["Shiki-Ouji", "Slime"], result: "Shiisaa" },
        { ingredients: ["Raja Naga", "Makami"], result: "Mithra" },
        { ingredients: ["Take-Minakata", "Hecatoncheir"], result: "Orthrus" },
        // different arcana
        { ingredients: ["Vishnu", "Yoshitsune"], result: null },
        { ingredients: ["Satan", "Forneus"], result: "Mother Harlot" },
        { ingredients: ["Lucifer", "Genbu"], result: "Ganesha" },
        { ingredients: ["Crystal Skull", "Regent"], result: "Mithra" },
        // rare fusion: not handled by fuse2()
        { ingredients: ["Obariyon", "Regent"], result: null },
        { ingredients: ["Nekomata", "Stone of Scone"], result: null },
        // special formula: not handled by fuse2()
        { ingredients: ["Nebiros", "Belial"], result: null },
        { ingredients: ["Rangda", "Barong"], result: null },
    ];
    for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        var result = personaeByName[test.result];
        var persona1 = personaeByName[test.ingredients[0]];
        var persona2 = personaeByName[test.ingredients[1]];
        var resultArcana = getResultArcana(persona1.arcana, persona2.arcana);
        var actualResult = FusionCalculator.fuse2(resultArcana, persona1, persona2);
        if (actualResult == result) {
            console.log("Passed: " + persona1.name + " + " + persona2.name + " = " + (result ? result.name : "null"));
        }
        else {
            console.error("Failed: " + persona1.name + " + " + persona2.name + " = " + (result ? result.name : "null") +
                ", got " + (actualResult ? actualResult.name : "null") + " instead.");
        }
    }
};
