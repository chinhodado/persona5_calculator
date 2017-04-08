///<reference path="DataUtil.ts"/>

/**
 * Created by Chin on 08-Apr-17.
 */
class FusionCalculator {
    static fuse2(arcana, persona1, persona2) {
        if (persona1.rare && !persona2.rare) return null;
        if (persona2.rare && !persona1.rare) return null;

        let level = 1 + Math.floor((persona1.level + persona2.level) / 2);
        let personae = personaeByArcana[arcana];

        if (persona1.arcana == persona2.arcana) {
            // same-arcana down-rank fusion
            for (var i = personae.length - 1, persona = null; persona = personae[i]; i--) {
                if (persona.level <= level) {
                    if (persona.special || persona.rare || persona == persona1 || persona == persona2) continue;
                    break;
                }
            }
        }
        else {
            for (var i = 0, persona = null; persona = personae[i]; i++) {
                if (persona.level >= level) {
                    if (persona.special || persona.rare) continue;
                    break;
                }
            }
        }

        // these are 2-persona-special fusions, so remove them from normal fusion
        if (personae[i] && personae[i].name == "Moloch" &&
            ((persona1.name == "Barong" && persona2.name == "Rangda") ||
            (persona2.name == "Barong" && persona1.name == "Rangda"))) {
            return null;
        }

        if (personae[i] && personae[i].name == "Attis" &&
            ((persona1.name == "Shiva" && persona2.name == "Parvati") ||
            (persona2.name == "Shiva" && persona1.name == "Parvati"))) {
            return null;
        }

        if (personae[i] && personae[i].name == "Baphomet" &&
            ((persona1.name == "Nebiros" && persona2.name == "Belial") ||
            (persona2.name == "Nebiros" && persona1.name == "Belial"))) {
            return null;
        }

        return personae[i];
    };

    static fuseRare(rarePersona, mainPersona) {
        let modifier = rareCombos[mainPersona.arcana][rarePersonae.indexOf(rarePersona.name)];
        let personae = personaeByArcana[mainPersona.arcana];
        let mainPersonaIndex = personae.indexOf(mainPersona);
        let newPersona = personae[mainPersonaIndex + modifier];

        if (!newPersona) {
            return null;
        }

        if (newPersona.special) {
            if (modifier > 0) modifier++;
            else if (modifier < 0) modifier--;

            newPersona = personae[mainPersonaIndex + modifier];
        }
        return newPersona;
    };
}
