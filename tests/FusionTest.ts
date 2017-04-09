///<reference path="../data/Data5.ts"/>
///<reference path="../src/DataUtil.ts"/>
///<reference path="../src/FusionCalculator.ts"/>
///<reference path="../data/PersonaData.ts"/>

var runFuse2Tests = function() {
    console.log("Testing fuse2()...");
    const tests = [
        //same arcana
        {ingredients: ["Obariyon", "Arsene"], result: null},                 // two lowest ranks
        {ingredients: ["Beelzebub", "Belial"], result: "Nebiros"},           // two highest ranks
        {ingredients: ["Ananta", "Kaiwan"], result: "Fuu-Ki"},               // skip special below 2 ingredients
        {ingredients: ["Moloch", "Hecatoncheir"], result: "Take-Minakata"},  // skip rare below 2 ingredients
        {ingredients: ["Dionysus", "Black Frost"], result: "Ose"},           // skip rare and special below 2 ingredients
        {ingredients: ["Shiki-Ouji", "Slime"], result: "Shiisaa"},           // midway, right on level
        {ingredients: ["Raja Naga", "Makami"], result: "Mithra"},            // midway, have to go down
        {ingredients: ["Take-Minakata", "Hecatoncheir"], result: "Orthrus"}, // skip rare midway, skip ingredient

        // different arcana
        {ingredients: ["Vishnu", "Yoshitsune"], result: null},               // tower 79 + fool 83 -> empress 81 -> null
        {ingredients: ["Satan", "Forneus"], result: "Mother Harlot"},        // judgement 92 + hierophant 63 -> empress 80
        {ingredients: ["Lucifer", "Genbu"], result: "Ganesha"},              // star 93 + temperance 7 -> sun 53
        {ingredients: ["Crystal Skull", "Regent"], result: "Mithra"},        // 2 rares: fool 50 + emperor 10 -> temperance 30

        // rare fusion: not handled by fuse2()
        {ingredients: ["Obariyon", "Regent"], result: null},
        {ingredients: ["Nekomata", "Stone of Scone"], result: null},

        // special formula: not handled by fuse2()
        {ingredients: ["Nebiros", "Belial"], result: null},                  // 2-way special
        {ingredients: ["Rangda", "Barong"], result: null},                   // 2-way special
    ];

    for (let i = 0; i < tests.length; i++) {
        let test = tests[i];
        let result = personaMap[test.result];
        let persona1 = personaMap[test.ingredients[0]];
        let persona2 = personaMap[test.ingredients[1]];
        let resultArcana = getResultArcana(persona1.arcana, persona2.arcana);
        let actualResult = FusionCalculator.fuse2(resultArcana, persona1, persona2);
        if (actualResult == result) {
            console.log("Passed: " + persona1.name + " + " + persona2.name + " = " + (result? result.name : "null"));
        }
        else {
            console.error("Failed: " + persona1.name + " + " + persona2.name + " = " + (result? result.name : "null") +
                ", got " + (actualResult? actualResult.name : "null") + " instead.");
        }
    }
};

// runFuse2Tests();