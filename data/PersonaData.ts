// derived partly from https://github.com/aqiu384/aqiu384.github.io/blob/master/p5-tool/js/full_compendium.js

interface PersonaMap {
    [index: string]: PersonaData;
}

interface PersonaData {
    name?: string; // only for when converted to list
    arcana: string;
    level: number;
    stats: number[];
    elems: string[];
    skills: {
        [index: string]: number;
    }
    personality?: string;
    special?: boolean;
    max?: boolean;
    dlc?: boolean;
    note?: string;
    rare?: boolean;

    // from new data for p5r
    inherits?: string;
    item?: string;
    itemr?: string;
    skillCard?: boolean; //determines if this persona's itemization results in a skill card
    trait?: string;

    // only for when converted to list
    strength?: number;
    magic?: number;
    endurance?: number;
    agility?: number;
    luck?: number;

    physical?: string;
    gun?: string;
    fire?: string;
    ice?: string;
    electric?: string;
    wind?: string;
    psychic?: string;
    nuclear?: string;
    bless?: string;
    curse?: string;

    // for sorting purpose
    physicalValue?: number;
    gunValue?: number;
    fireValue?: number;
    iceValue?: number;
    electricValue?: number;
    windValue?: number;
    psychicValue?: number;
    nuclearValue?: number;
    blessValue?: number;
    curseValue?: number;

    //mementos location data
    area?: string; //path name
    floor?: string; //path level
}

const personaMap : PersonaMap = {
    "Abaddon": {
        "inherits": "Curse",
        "item": "Makarakarn",
        "skillCard": true,
        "arcana": "Judgement",
        "level": 74,
        "stats": [51, 38, 58, 43, 39],
        "elems": ["ab", "ab", "-", "-", "-", "-", "wk", "wk", "-", "ab"],
        "skills": {
            "Absorb Phys": 79,
            "Deathbound": 0,
            "Gigantomachia": 80,
            "Makarakarn": 0,
            "Spirit Drain": 0,
            "Survival Trick": 77
        }
    },
    "Agathion": {
        "inherits": "Electric",
        "item": "Zio",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 3,
        "stats": [3, 4, 5, 7, 3],
        "elems": ["-", "rs", "-", "-", "rs", "wk", "-", "-", "-", "-"],
        "skills": {"Baisudi": 0, "Dia": 0, "Dodge Elec": 8, "Lunge": 4, "Rakukaja": 6, "Zio": 0},
        "personality": "Timid",
        "area": "Aiyatsbus",
        "floor": "L1"
    },
    "Alice": {
        "inherits": "Curse",
        "item": "Mamudoon",
        "skillCard": true,
        "arcana": "Death",
        "level": 79,
        "stats": [43, 59, 40, 57, 45],
        "elems": ["-", "-", "-", "-", "-", "-", "rs", "rs", "wk", "rp"],
        "skills": {
            "Dekunda": 0,
            "Die For Me!": 81,
            "Mamudoon": 0,
            "Megidolaon": 82,
            "Concentrate": 83,
            "Mudo Boost": 0,
            "Survival Trick": 84
        },
        "special": true,
        "max": true
    },
    "Ame-no-Uzume": {
        "inherits": "Almighty",
        "item": "Senryou Yakusha",
        "arcana": "Lovers",
        "level": 29,
        "stats": [15, 22, 19, 20, 18],
        "elems": ["-", "-", "ab", "-", "-", "-", "wk", "-", "-", "-"],
        "skills": {"Bufula": 0, "Diarama": 0, "Divine Grace": 32, "Mazio": 0, "Shock Boost": 34, "Tentarafoo": 31},
        "area": "Chemdah",
        "floor": "L6 & 7"
    },
    "Ananta": {
        "inherits": "Nuclear",
        "item": "Hua Khon",
        "arcana": "Star",
        "level": 43,
        "stats": [24, 30, 31, 26, 25],
        "elems": ["-", "-", "-", "ab", "wk", "-", "-", "-", "-", "-"],
        "skills": {
            "Abysmal Surge": 45,
            "Defense Master": 0,
            "Elec Wall": 0,
            "Freidyne": 48,
            "Growth 2": 46,
            "Mafreila": 0,
            "Marakukaja": 47,
            "Nuke Boost": 49
        }
    },
    "Andras": {
        "inherits": "Ice",
        "item": "Ice Break",
        "skillCard": true,
        "arcana": "Devil",
        "level": 10,
        "stats": [5, 9, 7, 10, 6],
        "elems": ["-", "wk", "wk", "rs", "-", "-", "-", "-", "-", "-"],
        "skills": {"Apt Pupil": 13, "Bufu": 0, "Ice Break": 15, "Mabufu": 14, "Rakunda": 0, "Tarukaja": 11},
        "personality": "Timid",
        "area": "Aiyatsbus",
        "floor": "L5 & 6"
    },
    "Angel": {
        "inherits": "Bless",
        "item": "Baisudi",
        "skillCard": true,
        "arcana": "Justice",
        "level": 12,
        "stats": [7, 9, 9, 9, 9],
        "elems": ["-", "-", "-", "-", "rs", "-", "-", "-", "nu", "wk"],
        "skills": {"Baisudi": 14, "Dazzler": 0, "Dekunda": 17, "Dia": 0, "Dodge Curse": 15, "Hama": 0, "Kouha": 13},
        "personality": "Irritable",
        "area": "Aiyatsbus / Kaitul",
        "floor": "L5 & 6 / L1-4"
    },
    "Anubis": {
        "inherits": "Almighty",
        "item": "Makouha",
        "skillCard": true,
        "arcana": "Judgement",
        "level": 37,
        "stats": [23, 26, 24, 22, 23],
        "elems": ["-", "-", "-", "-", "-", "-", "-", "-", "nu", "nu"],
        "skills": {
            "Dekunda": 40,
            "Eiga": 43,
            "Hamaon": 0,
            "Makouha": 0,
            "Mudoon": 0,
            "Null Fear": 39,
            "Resist Bless": 41
        },
        "personality": "Gloomy",
        "area": "Akzeriyyuth",
        "floor": "L10 & 11"
    },
    "Anzu": {
        "inherits": "Wind",
        "item": "Dekaja",
        "skillCard": true,
        "arcana": "Hierophant",
        "level": 25,
        "stats": [14, 18, 15, 21, 14],
        "elems": ["-", "wk", "-", "-", "rs", "rp", "-", "wk", "-", "-"],
        "skills": {"Assault Dive": 27, "Dekaja": 28, "Garula": 0, "Masukukaja": 0, "Null Forget": 29, "Wind Break": 0},
        "personality": "Irritable",
        "area": "Akzeriyyuth",
        "floor": "L1-3, 5-7, 9-11"
    },
    "Apsaras": {
        "inherits": "Ice",
        "item": "Freeze Boost",
        "skillCard": true,
        "arcana": "Priestess",
        "level": 11,
        "stats": [7, 11, 6, 10, 6],
        "elems": ["-", "-", "-", "rs", "wk", "-", "-", "-", "-", "-"],
        "skills": {"Bufu": 0, "Elec Wall": 14, "Ice Wall": 0, "Media": 13, "Rebellion": 0, "Wind Wall": 16},
        "personality": "Upbeat",
        "area": "Chemdah",
        "floor": "L1-4"
    },
    "Ara Mitama": {
        "inherits": "Nuclear",
        "item": "Freila",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 31,
        "stats": [20, 19, 20, 20, 21],
        "elems": ["rs", "-", "-", "wk", "-", "-", "-", "-", "-", "-"],
        "skills": {"Freila": 0, "Marakunda": 33, "Miracle Punch": 0, "Taunt": 0, "Rage Boost": 35, "Rebellion": 32}
    },
    "Arahabaki": {
        "inherits": "Ailment",
        "item": "Tapsuan",
        "arcana": "Hermit",
        "level": 35,
        "stats": [21, 23, 22, 24, 22],
        "elems": ["rp", "rp", "-", "-", "-", "-", "wk", "wk", "rs", "rs"],
        "skills": {
            "Abysmal Surge": 0,
            "Defense Master": 39,
            "Maeiga": 38,
            "Makarakarn": 0,
            "Null Brainwash": 0,
            "Spirit Drain": 37
        },
        "personality": "Gloomy",
        "area": "Adyeshach",
        "floor": "L1-4, 6-8, 10"
    },
    "Archangel": {
        "inherits": "Bless",
        "item": "Dazzler",
        "skillCard": true,
        "arcana": "Justice",
        "level": 16,
        "stats": [13, 10, 13, 12, 7],
        "elems": ["-", "-", "-", "-", "wk", "-", "-", "-", "nu", "wk"],
        "skills": {"Dazzler": 0, "Hama": 0, "Vajra Blast": 21, "Makouha": 19, "Psi": 0, "Rebellion": 18},
        "personality": "Irritable",
        "area": "Aiyatsbus",
        "floor": "L5 & 6"
    },
    "Ardha": {
        "inherits": "Almighty",
        "item": "Agneyastra",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 84,
        "stats": [54, 56, 55, 54, 40],
        "elems": ["rs", "-", "-", "nu", "nu", "-", "-", "-", "-", "-"],
        "skills": {
            "Agneyastra": 87,
            "Auto-Masuku": 88,
            "Cosmic Flare": 0,
            "God's Hand": 0,
            "Fortified Moxy": 89,
            "Invigorate 3": 0,
            "Salvation": 90
        },
        "special": true,
        "max": true
    },
    "Ariadne": {
        "inherits": "Almighty",
        "item": "Red Yarn Ball",
        "arcana": "Fortune",
        "level": 30,
        "stats": [23, 19, 20, 17, 18],
        "elems": ["-", "rs", "-", "-", "-", "-", "wk", "nu", "rs", "-"],
        "skills": {
            "Apt Pupil": 0,
            "Attack Master": 31,
            "Evade Physical": 34,
            "Fortified Moxy": 32,
            "Miracle Punch": 0,
            "Charge": 36,
            "Beast Weaver": 0
        },
        "dlc": true
    },
    "Ariadne Picaro": {
        "inherits": "Almighty",
        "item": "Auto-Mataru",
        "skillCard": true,
        "arcana": "Fortune",
        "level": 42,
        "stats": [36, 23, 29, 24, 21],
        "elems": ["-", "rs", "-", "-", "-", "-", "wk", "nu", "rs", "-"],
        "skills": {
            "Apt Pupil": 0,
            "Auto-Mataru": 43,
            "Evade Physical": 46,
            "Heat Up": 44,
            "Miracle Punch": 0,
            "Charge": 48,
            "Beast Weaver": 0
        },
        "dlc": true
    },
    "Arsène": {
        "inherits": "Curse",
        "item": "Arsène's Cane",
        "arcana": "Fool",
        "level": 1,
        "stats": [2, 2, 2, 3, 1],
        "elems": ["-", "-", "-", "wk", "-", "-", "-", "-", "wk", "rs"],
        "skills": {"Cleave": 2, "Adverse Resolve": 7, "Dream Needle": 5, "Eiha": 1, "Sukunda": 4}
    },
    "Asterius": {
        "inherits": "Almighty",
        "item": "Thunder Horns",
        "arcana": "Fortune",
        "level": 56,
        "stats": [43, 43, 32, 32, 25],
        "elems": ["-", "-", "rs", "wk", "-", "-", "rs", "-", "-", "nu"],
        "skills": {
            "Auto-Mataru": 57,
            "Burn Boost": 0,
            "Fire Amp": 59,
            "Gigantomachia": 62,
            "Maragidyne": 0,
            "Tetrakarn": 60,
            "Titanomachia": 0
        },
        "dlc": true
    },
    "Asterius Picaro": {
        "inherits": "Almighty",
        "item": "Gigantomachia",
        "skillCard": true,
        "arcana": "Fortune",
        "level": 62,
        "stats": [46, 46, 36, 36, 29],
        "elems": ["-", "-", "rs", "wk", "-", "-", "rs", "-", "-", "nu"],
        "skills": {
            "Auto-Masuku": 63,
            "Burn Boost": 0,
            "Fire Amp": 65,
            "Gigantomachia": 68,
            "Makarakarn": 66,
            "Maragidyne": 0,
            "Titanomachia": 0
        },
        "dlc": true
    },
    "Asura-Ou": {
        "inherits": "Nuclear",
        "item": "Vajra",
        "arcana": "Sun",
        "level": 76,
        "stats": [52, 48, 51, 49, 35],
        "elems": ["-", "-", "nu", "-", "-", "-", "wk", "rp", "-", "-"],
        "skills": {
            "Atomic Flare": 0,
            "Auto-Mataru": 78,
            "High Counter": 80,
            "Mafreidyne": 79,
            "Mahamaon": 0,
            "Marakukaja": 0,
            "Unshaken Will": 81
        },
        "special": true,
        "max": true
    },
    "Atropos": {
        "inherits": "Electric",
        "item": "Mazionga",
        "skillCard": true,
        "arcana": "Fortune",
        "level": 39,
        "stats": [23, 30, 22, 27, 22],
        "elems": ["-", "-", "wk", "-", "-", "nu", "-", "-", "-", "-"],
        "skills": {
            "Dodge Fire": 44,
            "Elec Boost": 43,
            "Elec Break": 0,
            "Fire Wall": 0,
            "Mazionga": 0,
            "Mediarama": 41,
            "Concentrate": 45
        }
    },
    "Attis": {
        "inherits": "Fire",
        "item": "Enduring Soul",
        "skillCard": true,
        "arcana": "Hanged Man",
        "level": 82,
        "stats": [56, 50, 48, 51, 48],
        "elems": ["-", "-", "nu", "-", "-", "rp", "-", "-", "-", "wk"],
        "skills": {
            "Absorb Curse": 86,
            "Enduring Soul": 84,
            "Blazing Hell": 88,
            "Maragidyne": 0,
            "Salvation": 0,
            "Samarecarm": 85,
            "Thermopylae": 0
        },
        "max": true
    },
    "Baal": {
        "inherits": "Wind",
        "item": "Yagrush",
        "arcana": "Emperor",
        "level": 75,
        "stats": [48, 50, 47, 47, 40],
        "elems": ["-", "-", "rs", "-", "-", "ab", "-", "-", "rs", "rs"],
        "skills": {
            "Magarudyne": 0,
            "Matarukaja": 0,
            "Panta Rhei": 77,
            "Charge": 79,
            "Revolution": 0,
            "Tetraja": 78,
            "Ayamur": 80
        }
    },
    "Baphomet": {
        "inherits": "Almighty",
        "item": "Shock Boost",
        "skillCard": true,
        "arcana": "Devil",
        "level": 58,
        "stats": [34, 42, 36, 38, 31],
        "elems": ["-", "-", "rs", "-", "-", "-", "-", "-", "wk", "nu"],
        "skills": {
            "Agidyne": 0,
            "Bufudyne": 59,
            "Burn Boost": 0,
            "Evade Fire": 0,
            "Freeze Boost": 63,
            "Shock Boost": 62,
            "Ziodyne": 61
        },
        "area": "Sheriruth",
        "floor": "L13 (after Palace 7)"
    },
    "Barong": {
        "inherits": "Electric",
        "item": "Invigorate 2",
        "skillCard": true,
        "arcana": "Emperor",
        "level": 52,
        "stats": [33, 35, 33, 37, 25],
        "elems": ["-", "rs", "-", "-", "rs", "wk", "-", "-", "nu", "wk"],
        "skills": {
            "Elec Break": 0,
            "Invigorate 2": 54,
            "Maziodyne": 57,
            "Null Elec": 55,
            "Wage War": 0,
            "Ziodyne": 0
        },
        "area": "Sheriruth",
        "floor": "L11 & 12 (after Palace 7)"
    },
    "Beelzebub": {
        "inherits": "Curse",
        "item": "Fleur du Mal",
        "arcana": "Devil",
        "level": 84,
        "stats": [55, 60, 54, 56, 34],
        "elems": ["-", "-", "ab", "-", "-", "-", "-", "-", "wk", "rp"],
        "skills": {
            "Curse Amp": 85,
            "Devil Smile": 0,
            "Demonic Decree": 87,
            "Maeigaon": 0,
            "Mamudoon": 0,
            "Megidolaon": 89,
            "Concentrate": 86,
            "Repel Ice": 88
        },
        "max": true
    },
    "Belial": {
        "inherits": "Curse",
        "item": "Maragion",
        "skillCard": true,
        "arcana": "Devil",
        "level": 68,
        "stats": [45, 41, 46, 43, 36],
        "elems": ["-", "-", "-", "-", "-", "-", "-", "-", "-", "nu"],
        "skills": {
            "Agidyne": 0,
            "Heat Up": 72,
            "Mamudoon": 0,
            "Maragidyne": 71,
            "Matarunda": 0,
            "Myriad Slashes": 74,
            "Survival Trick": 70
        }
    },
    "Belphegor": {
        "inherits": "Ice",
        "item": "Mabufula",
        "skillCard": true,
        "arcana": "Tower",
        "level": 37,
        "stats": [25, 27, 24, 23, 19],
        "elems": ["-", "-", "wk", "rs", "rs", "-", "-", "rs", "-", "rp"],
        "skills": {"Bufula": 0, "Dodge Fire": 0, "Ice Break": 39, "Mabufula": 41, "Concentrate": 44, "Null Rage": 38},
        "personality": "Irritable",
        "area": "Adyeshach",
        "floor": "L6-8, 10"
    },
    "Berith": {
        "inherits": "Physical",
        "item": "Cleave",
        "skillCard": true,
        "arcana": "Hierophant",
        "level": 9,
        "stats": [8, 6, 7, 8, 5],
        "elems": ["-", "nu", "rs", "wk", "-", "-", "-", "-", "-", "-"],
        "skills": {"Cleave": 0, "Dodge Fire": 11, "Double Fangs": 10, "Rakukaja": 0, "Sledgehammer": 13},
        "personality": "Irritable",
        "area": "Aiyatsbus",
        "floor": "L5 & 6"
    },
    "Bicorn": {
        "inherits": "Wind",
        "item": "Garu",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 4,
        "stats": [5, 3, 3, 5, 3],
        "elems": ["-", "-", "-", "-", "wk", "-", "-", "-", "-", "rs"],
        "skills": {"Apt Pupil": 8, "Garu": 6, "Ice Wall": 7, "Lunge": 0, "Tarunda": 0},
        "personality": "Irritable",
        "area": "Aiyatsbus",
        "floor": "L1 & 2"
    },
    "Bishamonten": {
        "inherits": "Nuclear",
        "item": "Mafreidyne",
        "skillCard": true,
        "arcana": "Hierophant",
        "level": 67,
        "stats": [49, 37, 42, 45, 35],
        "elems": ["-", "-", "ab", "wk", "-", "-", "-", "-", "rs", "rs"],
        "skills": {
            "Deadly Fury": 68,
            "Diarahan": 0,
            "Freidyne": 0,
            "God's Hand": 73,
            "Mafreidyne": 69,
            "Nuke Amp": 71,
            "Tetrakarn": 72
        }
    },
    "Black Frost": {
        "inherits": "Almighty",
        "item": "Naraka Whip",
        "arcana": "Fool",
        "level": 67,
        "stats": [44, 46, 41, 42, 35],
        "elems": ["-", "-", "rp", "ab", "-", "-", "-", "nu", "-", "rp"],
        "skills": {
            "Diamond Dust": 72,
            "Ice Amp": 70,
            "Mabufudyne": 0,
            "Miracle Punch": 0,
            "One-shot Kill": 0,
            "Repel Fire": 71
        },
        "special": true,
        "note": "Request \"One Who Bullies Bullies\" must be cleared"
    },
    "Black Ooze": {
        "inherits": "Curse",
        "item": "Stagnant Air",
        "skillCard": true,
        "arcana": "Moon",
        "level": 29,
        "stats": [19, 18, 20, 16, 21],
        "elems": ["rs", "rs", "-", "rs", "wk", "-", "wk", "-", "wk", "nu"],
        "skills": {
            "Brain Jack": 34,
            "Ambient Aid": 31,
            "Evil Touch": 0,
            "Flash Bomb": 35,
            "Headbutt": 32,
            "Matarunda": 0,
            "Stagnant Air": 0
        },
        "personality": "Irritable",
        "area": "Adyeshach",
        "floor": "L1-4, 6"
    },
    "Black Rider": {
        "inherits": "Curse",
        "item": "Bad Beat",
        "skillCard": true,
        "arcana": "Tower",
        "level": 59,
        "stats": [38, 43, 37, 45, 30],
        "elems": ["-", "-", "wk", "ab", "-", "-", "-", "-", "rs", "rs"],
        "skills": {
            "Bloodbath": 61,
            "Ambient Aid": 60,
            "Flash Bomb": 0,
            "Ghastly Wail": 63,
            "Maeigaon": 0,
            "Mamudoon": 0,
            "Megidola": 64
        }
    },
    "Bugs": {
        "inherits": "Almighty",
        "item": "Bear Gloves",
        "arcana": "Fool",
        "level": 49,
        "stats": [35, 33, 30, 32, 24],
        "elems": ["-", "-", "-", "-", "-", "-", "rs", "wk", "-", "nu"],
        "skills": {
            "Auto-Mataru": 51,
            "Evade Physical": 54,
            "Fast Heal": 55,
            "Masukunda": 0,
            "Miracle Punch": 0,
            "Psiodyne": 0,
            "Triple Down": 52
        },
        "special": true,
        "note": "Request \"The Lovesick Cyberstalking Girl\" must be cleared"
    },
    "Byakko": {
        "inherits": "Ice",
        "item": "Swift Strike",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 49,
        "stats": [32, 32, 31, 32, 27],
        "elems": ["-", "-", "wk", "ab", "-", "-", "-", "wk", "-", "rs"],
        "skills": {
            "Bufudyne": 55,
            "Counterstrike": 0,
            "Evade Fire": 52,
            "Ice Boost": 51,
            "Mabufula": 0,
            "Null Rage": 54,
            "Swift Strike": 0
        }
    },
    "Cerberus": {
        "inherits": "Fire",
        "item": "Agidyne",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 55,
        "stats": [39, 35, 32, 39, 27],
        "elems": ["-", "-", "ab", "wk", "-", "-", "-", "rs", "-", "-"],
        "skills": {
            "Agidyne": 0,
            "Enduring Soul": 60,
            "High Counter": 57,
            "Megaton Raid": 0,
            "Rebellion": 56,
            "Regenerate 2": 58
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L7-9 (after Palace 7)"
    },
    "Chernobog": {
        "inherits": "Ailment",
        "item": "Deadly Fury",
        "skillCard": true,
        "arcana": "Death",
        "level": 62,
        "stats": [40, 37, 39, 38, 39],
        "elems": ["-", "rs", "wk", "ab", "nu", "-", "-", "-", "wk", "rp"],
        "skills": {
            "Bloodbath": 0,
            "Deadly Fury": 0,
            "Deathbound": 64,
            "Fear Boost": 66,
            "Mudoon": 0,
            "Myriad Slashes": 67,
            "Stagnant Air": 63
        }
    },
    "Chi You": {
        "inherits": "Psy",
        "item": "Arms Master",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 86,
        "stats": [54, 56, 53, 52, 50],
        "elems": ["rs", "rs", "-", "-", "-", "-", "nu", "wk", "-", "-"],
        "skills": {
            "Absorb Psy": 90,
            "Gigantomachia": 0,
            "Concentrate": 92,
            "Psycho Blast": 89,
            "Psycho Force": 0,
            "Repel Phys": 0,
            "Fortify Spirit": 88
        },
        "special": true,
        "max": true
    },
    "Choronzon": {
        "inherits": "Curse",
        "item": "Maeiha",
        "skillCard": true,
        "arcana": "Magician",
        "level": 28,
        "stats": [16, 19, 19, 18, 19],
        "elems": ["-", "-", "ab", "-", "-", "-", "-", "-", "wk", "-"],
        "skills": {
            "Life Drain": 0,
            "Curse Boost": 32,
            "Dodge Elec": 30,
            "Eiga": 31,
            "Maeiha": 29,
            "Pulinpa": 0,
            "Rainy Play": 33,
            "Rampage": 0
        },
        "personality": "Timid",
        "area": "Kaitul",
        "floor": "L1-4"
    },
    "Clotho": {
        "inherits": "Healing",
        "item": "Invigorate 1",
        "skillCard": true,
        "arcana": "Fortune",
        "level": 26,
        "stats": [14, 19, 17, 20, 15],
        "elems": ["-", "-", "-", "wk", "-", "nu", "-", "wk", "-", "-"],
        "skills": {
            "Energy Shower": 30,
            "Invigorate 1": 32,
            "Mahama": 0,
            "Makajam": 0,
            "Makajamon": 29,
            "Me Patra": 0,
            "Tetraja": 27
        }
    },
    "Crystal Skull": {
        "item": "Crystal Skull",
        "arcana": "Fool",
        "level": 50,
        "stats": [50, 50, 50, 50, 50],
        "elems": ["rs", "nu", "rp", "rp", "rp", "rp", "rp", "rp", "-", "rp"],
        "skills": {
            "Mabufudyne": 0,
            "Maeigaon": 0,
            "Mafreidyne": 0,
            "Magarudyne": 0,
            "Makougaon": 0,
            "Mapsiodyne": 0,
            "Maragidyne": 0,
            "Maziodyne": 0
        },
        "rare": true,
        "area": "Sheriruth",
        "floor": "L7-9. 11-13 (after Palace 7)"
    },
    "Cu Chulainn": {
        "inherits": "Almighty",
        "item": "Charge",
        "skillCard": true,
        "arcana": "Star",
        "level": 67,
        "stats": [47, 36, 44, 47, 34],
        "elems": ["rs", "rs", "-", "-", "wk", "rp", "-", "-", "nu", "-"],
        "skills": {
            "Deadly Fury": 0,
            "Dekunda": 70,
            "Enduring Soul": 72,
            "Ice Wall": 0,
            "Matarukaja": 69,
            "Oni Kagura": 0,
            "Charge": 71
        }
    },
    "Cybele": {
        "inherits": "Healing",
        "item": "Sabazios",
        "arcana": "Priestess",
        "level": 73,
        "stats": [44, 48, 45, 51, 38],
        "elems": ["-", "-", "rs", "-", "wk", "-", "-", "-", "nu", "-"],
        "skills": {
            "Absorb Bless": 77,
            "Auto-Maraku": 76,
            "Bless Amp": 74,
            "Makougaon": 0,
            "Mediarahan": 0,
            "Salvation": 79,
            "Samarecarm": 0
        },
        "max": true
    },
    "Daisoujou": {
        "inherits": "Bless",
        "item": "Makouga",
        "skillCard": true,
        "arcana": "Hierophant",
        "level": 42,
        "stats": [22, 33, 24, 25, 29],
        "elems": ["-", "rs", "-", "-", "-", "-", "-", "-", "nu", "wk"],
        "skills": {
            "Diarahan": 45,
            "Bless Boost": 44,
            "Makouga": 0,
            "Me Patra": 46,
            "Null Rage": 47,
            "Samsara": 43,
            "Spirit Drain": 0
        }
    },
    "Dakini": {
        "inherits": "Physical",
        "item": "Deathbound",
        "skillCard": true,
        "arcana": "Empress",
        "level": 50,
        "stats": [34, 32, 34, 28, 29],
        "elems": ["-", "-", "rs", "-", "-", "-", "-", "-", "-", "-"],
        "skills": {
            "Bad Beat": 0,
            "Deathbound": 53,
            "Giant Slice": 0,
            "High Counter": 52,
            "Charge": 55,
            "Rising Slash": 0,
            "Rebellion": 54
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L7-9 (after Palace 7)"
    },
    "Decarabia": {
        "inherits": "Fire",
        "item": "Fire Boost",
        "skillCard": true,
        "arcana": "Fool",
        "level": 32,
        "stats": [21, 23, 19, 22, 18],
        "elems": ["wk", "-", "rp", "-", "-", "-", "-", "rs", "-", "rs"],
        "skills": {
            "Agilao": 0,
            "Devil Smile": 37,
            "Fire Boost": 35,
            "Maragion": 33,
            "Null Fire": 36,
            "Tetrakarn": 38,
            "Ominous Words": 0
        },
        "personality": "Gloomy",
        "area": "Adyeshach",
        "floor": "L3, 4, 6-8"
    },
    "Dionysus": {
        "inherits": "Psy",
        "item": "Thermopylae",
        "skillCard": true,
        "arcana": "Fool",
        "level": 61,
        "stats": [35, 41, 38, 40, 36],
        "elems": ["-", "-", "-", "-", "rp", "-", "-", "-", "rs", "rs"],
        "skills": {
            "Ailment Boost": 63,
            "Amrita Shower": 66,
            "Abysmal Surge": 0,
            "Heat Wave": 0,
            "Maragidyne": 65,
            "Psiodyne": 0,
            "Thermopylae": 62
        }
    },
    "Dominion": {
        "inherits": "Bless",
        "item": "Makougaon",
        "skillCard": true,
        "arcana": "Justice",
        "level": 68,
        "stats": [46, 47, 45, 48, 40],
        "elems": ["-", "wk", "-", "-", "-", "-", "-", "rp", "nu", "rs"],
        "skills": {
            "Nocturnal Flash": 0,
            "Evade Curse": 73,
            "Hama Boost": 71,
            "Hamaon": 0,
            "Kougaon": 0,
            "Mahamaon": 72,
            "Makougaon": 70
        },
        "personality": "Unknown"
    },
    "Eligor": {
        "inherits": "Fire",
        "item": "Tarukaja",
        "skillCard": true,
        "arcana": "Emperor",
        "level": 16,
        "stats": [12, 10, 13, 10, 10],
        "elems": ["-", "rs", "rs", "-", "wk", "-", "-", "-", "-", "-"],
        "skills": {
            "Memory Blow": 20,
            "Sharp Student": 0,
            "Double Fangs": 18,
            "Maragi": 0,
            "Sukunda": 19,
            "Tarukaja": 0
        },
        "personality": "Unknown",
        "area": "Chemdah",
        "floor": "L3 & 4"
    },
    "Emperor's Amulet": {
        "item": "Emperor's Amulet",
        "arcana": "Hanged Man",
        "level": 35,
        "stats": [35, 35, 35, 35, 35],
        "elems": ["rs", "nu", "-", "ab", "ab", "ab", "ab", "ab", "nu", "nu"],
        "skills": {
            "Agidyne": 0,
            "Bufudyne": 0,
            "Eigaon": 0,
            "Freidyne": 0,
            "Garudyne": 0,
            "Kougaon": 0,
            "Psiodyne": 0,
            "Ziodyne": 0
        },
        "rare": true,
        "area": "Sheriruth",
        "floor": "L7-9, 11-13 (after Palace 7)"
    },
    "Phoenix": {
        "inherits": "Nuclear",
        "item": "Nuke Boost",
        "skillCard": true,
        "arcana": "Hierophant",
        "level": 22,
        "stats": [14, 15, 15, 18, 11],
        "elems": ["-", "-", "-", "rs", "wk", "nu", "-", "-", "-", "-"],
        "skills": {"Diarama": 23, "Dream Needle": 0, "Freila": 0, "Nuke Boost": 27, "Recarm": 25}
    },
    "Flauros": {
        "inherits": "Ailment",
        "item": "Shackles",
        "arcana": "Devil",
        "level": 25,
        "stats": [19, 14, 18, 18, 13],
        "elems": ["-", "-", "nu", "wk", "-", "rs", "-", "rs", "-", "-"],
        "skills": {
            "Assault Dive": 29,
            "Dekaja": 0,
            "Dodge Physical": 26,
            "Apt Pupil": 28,
            "Dormin Rush": 0,
            "Giant Slice": 0,
            "Heat Up": 30
        },
        "special": true,
        "note": "Needs Strength cooperation rank 1 to be fused"
    },
    "Forneus": {
        "inherits": "Psy",
        "item": "Masukunda",
        "skillCard": true,
        "arcana": "Hierophant",
        "level": 63,
        "stats": [41, 39, 40, 42, 34],
        "elems": ["-", "-", "-", "ab", "wk", "-", "nu", "-", "-", "-"],
        "skills": {
            "Evade Psy": 68,
            "Mapsiodyne": 67,
            "Marin Karin": 0,
            "Masukunda": 0,
            "Psiodyne": 0,
            "Stagnant Air": 66,
            "Survival Trick": 65
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L12 & 13 (after Palace 7)"
    },
    "Fortuna": {
        "inherits": "Wind",
        "item": "Fast Heal",
        "skillCard": true,
        "arcana": "Fortune",
        "level": 46,
        "stats": [23, 32, 29, 34, 27],
        "elems": ["-", "-", "nu", "-", "wk", "nu", "-", "-", "-", "-"],
        "skills": {
            "Amrita Drop": 50,
            "Evade Elec": 51,
            "Garudyne": 47,
            "Magarula": 0,
            "Masukukaja": 0,
            "Tetraja": 0,
            "Touch n' Go": 49
        }
    },
    "Futsunushi": {
        "inherits": "Physical",
        "item": "Brave Blade",
        "skillCard": true,
        "arcana": "Magician",
        "level": 76,
        "stats": [54, 48, 47, 49, 37],
        "elems": ["rs", "-", "-", "-", "-", "-", "-", "wk", "-", "-"],
        "skills": {
            "Ali Dance": 0,
            "Apt Pupil": 80,
            "Brave Blade": 82,
            "Firm Stance": 81,
            "Matarukaja": 0,
            "Charge": 78,
            "Myriad Slashes": 0,
            "Regenerate 3": 79
        },
        "max": true
    },
    "Fuu-Ki": {
        "inherits": "Wind",
        "item": "Wind Boost",
        "skillCard": true,
        "arcana": "Star",
        "level": 23,
        "stats": [14, 17, 16, 15, 14],
        "elems": ["-", "-", "-", "-", "wk", "ab", "-", "-", "-", "-"],
        "skills": {"Dodge Wind": 26, "Garula": 0, "Resist Psy": 27, "Tarukaja": 0, "Tetra Break": 0, "Wind Boost": 25},
        "personality": "Unknown",
        "area": "Kaitul",
        "floor": "L8 & 9"
    },
    "Gabriel": {
        "inherits": "Almighty",
        "item": "Mabufudyne",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 77,
        "stats": [43, 51, 48, 54, 42],
        "elems": ["-", "-", "-", "-", "-", "-", "nu", "-", "ab", "-"],
        "skills": {
            "Ali Dance": 79,
            "Divine Judgement": 78,
            "Evade Curse": 80,
            "Ice Amp": 82,
            "Mabufudyne": 0,
            "Maziodyne": 0,
            "Salvation": 83,
            "Touch n' Go": 81
        }
    },
    "Ganesha": {
        "inherits": "Ailment",
        "item": "Miracle Punch",
        "skillCard": true,
        "arcana": "Sun",
        "level": 53,
        "stats": [39, 31, 37, 33, 26],
        "elems": ["rs", "-", "-", "-", "-", "ab", "wk", "-", "-", "-"],
        "skills": {
            "Endure": 56,
            "Giant Slice": 0,
            "Masukunda": 57,
            "Miracle Punch": 0,
            "Charge": 60,
            "Rebellion": 0,
            "Tetraja": 55
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L5, 7-9 (before Palace 7) / L3 & 4 (after Palace 7)"
    },
    "Garuda": {
        "inherits": "Wind",
        "item": "Wind Amp",
        "skillCard": true,
        "arcana": "Star",
        "level": 52,
        "stats": [30, 36, 29, 39, 29],
        "elems": ["-", "wk", "-", "-", "-", "rs", "-", "-", "rp", "-"],
        "skills": {
            "Amrita Shower": 0,
            "Evade Elec": 55,
            "Garudyne": 0,
            "Heat Wave": 0,
            "Magarudyne": 57,
            "Masukukaja": 54,
            "Wind Amp": 59
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L12 (after Palace 7)"
    },
    "Genbu": {
        "inherits": "Ice",
        "item": "Patra",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 7,
        "stats": [5, 6, 7, 6, 4],
        "elems": ["-", "-", "-", "nu", "wk", "-", "rs", "-", "-", "-"],
        "skills": {"Bufu": 0, "Defense Master": 12, "Mabufu": 10, "Patra": 8, "Rakunda": 0, "Resist Forget": 11}
    },
    "Girimehkala": {
        "inherits": "Ailment",
        "item": "Marakunda",
        "skillCard": true,
        "arcana": "Moon",
        "level": 44,
        "stats": [36, 24, 32, 32, 15],
        "elems": ["rp", "rp", "rs", "-", "-", "-", "-", "-", "wk", "nu"],
        "skills": {"Foul Breath": 46, "Marakunda": 0, "Mudoon": 0, "Repel Phys": 51, "Swift Strike": 0, "Wage War": 48},
        "personality": "Gloomy",
        "area": "Adyeshach",
        "floor": "L4, 6-8, 10"
    },
    "Hanuman": {
        "inherits": "Physical",
        "item": "Ruyi Jingu Bang",
        "arcana": "Star",
        "level": 64,
        "stats": [43, 38, 40, 40, 38],
        "elems": ["-", "-", "-", "wk", "-", "-", "rs", "-", "rs", "-"],
        "skills": {
            "Deathbound": 65,
            "Matarunda": 0,
            "Regenerate 3": 69,
            "Revolution": 0,
            "Tempest Slash": 0,
            "Tetra Break": 67
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L12 & 13 (after Palace 7)"
    },
    "Hariti": {
        "inherits": "Electric",
        "item": "Spirit Drain",
        "skillCard": true,
        "arcana": "Empress",
        "level": 40,
        "stats": [24, 29, 25, 26, 23],
        "elems": ["-", "-", "-", "-", "-", "wk", "rs", "-", "rs", "-"],
        "skills": {
            "Nocturnal Flash": 42,
            "Dizzy Boost": 45,
            "Energy Shower": 0,
            "Mabaisudi": 0,
            "Mediarama": 44,
            "Samarecarm": 41,
            "Spirit Drain": 46,
            "Zionga": 0
        },
        "personality": "Unknown"
    },
    "Hecatoncheires": {
        "inherits": "Psy",
        "item": "Endure",
        "skillCard": true,
        "arcana": "Hanged Man",
        "level": 42,
        "stats": [29, 25, 30, 25, 24],
        "elems": ["-", "rs", "-", "-", "-", "-", "-", "-", "wk", "nu"],
        "skills": {
            "Endure": 43,
            "Foul Breath": 45,
            "Fortified Moxy": 46,
            "Charge": 48,
            "Regenerate 2": 0,
            "Swift Strike": 0,
            "Tarukaja": 0
        }
    },
    "Hell Biker": {
        "inherits": "Fire",
        "item": "Black Jacket",
        "arcana": "Death",
        "level": 39,
        "stats": [26, 27, 24, 30, 17],
        "elems": ["-", "-", "rp", "-", "-", "rs", "-", "-", "wk", "-"],
        "skills": {
            "Agilao": 0,
            "Fire Boost": 40,
            "Mamudoon": 44,
            "Maragion": 42,
            "Mudoon": 0,
            "Speed Master": 0,
            "Tentarafoo": 41,
            "Trigger Happy": 43
        }
    },
    "High Pixie": {
        "inherits": "Healing",
        "item": "Diarama",
        "skillCard": true,
        "arcana": "Fool",
        "level": 16,
        "stats": [8, 14, 10, 13, 10],
        "elems": ["-", "wk", "-", "-", "rs", "rs", "-", "wk", "-", "-"],
        "skills": {"Diarama": 18, "Dormina": 0, "Garu": 0, "Magaru": 20, "Media": 0, "Taunt": 19},
        "personality": "Irritable",
        "area": "Kaitul",
        "floor": "L1-3"
    },
    "Hope Diamond": {
        "item": "Hope Diamond",
        "arcana": "Death",
        "level": 40,
        "stats": [40, 40, 40, 40, 40],
        "elems": ["rs", "nu", "rp", "rp", "rp", "-", "rp", "rp", "nu", "nu"],
        "skills": {
            "Auto-Maraku": 0,
            "Auto-Masuku": 0,
            "Auto-Mataru": 0,
            "Endure": 0,
            "Fast Heal": 0,
            "High Counter": 0,
            "Invigorate 2": 0,
            "Regenerate 2": 0
        },
        "rare": true,
        "area": "Sheriruth",
        "floor": "L7-9. 11-13 (after Palace 7)"
    },
    "Horus": {
        "inherits": "Almighty",
        "item": "Kougaon",
        "skillCard": true,
        "arcana": "Sun",
        "level": 49,
        "stats": [30, 32, 32, 35, 25],
        "elems": ["-", "-", "wk", "-", "nu", "-", "-", "-", "rp", "-"],
        "skills": {
            "Diarama": 0,
            "Hama Boost": 54,
            "Hamaon": 53,
            "Kougaon": 0,
            "Masukukaja": 52,
            "Megido": 0,
            "Touch n' Go": 51
        }
    },
    "Hua Po": {
        "inherits": "Fire",
        "item": "Agilao",
        "skillCard": true,
        "arcana": "Hanged Man",
        "level": 9,
        "stats": [4, 10, 4, 8, 8],
        "elems": ["-", "wk", "rp", "wk", "-", "-", "-", "-", "-", "-"],
        "skills": {"Agi": 0, "Burn Boost": 15, "Dormina": 0, "Maragi": 13, "Resist Forget": 12, "Tarunda": 11},
        "personality": "Upbeat",
        "area": "Chemdah",
        "floor": "L1-3"
    },
    "Incubus": {
        "inherits": "Ailment",
        "item": "Dream Needle",
        "skillCard": true,
        "arcana": "Devil",
        "level": 5,
        "stats": [4, 6, 4, 5, 3],
        "elems": ["-", "wk", "-", "-", "rs", "-", "-", "-", "wk", "-"],
        "skills": {"Life Drain": 0, "Evil Touch": 0, "Dodge Curse": 9, "Eiha": 7, "Tarunda": 8},
        "personality": "Timid",
        "area": "Aiyatsbus",
        "floor": "L2, 3 & 6"
    },
    "Inugami": {
        "inherits": "Fire",
        "item": "Brain Shake",
        "skillCard": true,
        "arcana": "Hanged Man",
        "level": 14,
        "stats": [11, 9, 9, 12, 8],
        "elems": ["-", "-", "nu", "-", "-", "wk", "-", "-", "-", "nu"],
        "skills": {
            "Brain Shake": 18,
            "Dream Needle": 15,
            "Giant Slice": 0,
            "Lucky Punch": 17,
            "Confuse Boost": 19,
            "Pulinpa": 0,
            "Tarukaja": 0
        },
        "personality": "Timid",
        "area": "Chemdah",
        "floor": "L4, 6 & 7"
    },
    "Ippon-Datara": {
        "inherits": "Physical",
        "item": "Sledgehammer",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 13,
        "stats": [11, 7, 14, 6, 8],
        "elems": ["-", "-", "rs", "wk", "-", "rp", "-", "-", "rs", "rs"],
        "skills": {
            "Sharp Student": 16,
            "Counter": 18,
            "Rampage": 15,
            "Resist Dizzy": 0,
            "Sledgehammer": 0,
            "Tarukaja": 0
        },
        "personality": "Unknown",
        "area": "Chemdah",
        "floor": "L1-4"
    },
    "Ishtar": {
        "inherits": "Healing",
        "item": "Salvation",
        "skillCard": true,
        "arcana": "Lovers",
        "level": 85,
        "stats": [48, 59, 49, 58, 48],
        "elems": ["-", "-", "-", "-", "nu", "wk", "-", "-", "-", "-"],
        "skills": {
            "Absorb Wind": 0,
            "Insta-Heal": 87,
            "Maziodyne": 88,
            "Mediarahan": 0,
            "Salvation": 90,
            "Samarecarm": 0,
            "Spell Master": 89
        },
        "max": true
    },
    "Isis": {
        "inherits": "Healing",
        "item": "Zionga",
        "skillCard": true,
        "arcana": "Priestess",
        "level": 26,
        "stats": [15, 21, 16, 18, 15],
        "elems": ["-", "-", "-", "-", "-", "-", "wk", "-", "nu", "nu"],
        "skills": {
            "Agilao": 0,
            "Diarama": 0,
            "Garula": 30,
            "Makarakarn": 32,
            "Resist Forget": 27,
            "Sukukaja": 0,
            "Zionga": 29
        },
        "personality": "Timid",
        "area": "Akzeriyyuth",
        "floor": "L5-7, 9-11"
    },
    "Izanagi": {
        "inherits": "Almighty",
        "item": "White Headband",
        "arcana": "Fool",
        "level": 20,
        "stats": [14, 13, 13, 14, 13],
        "elems": ["-", "-", "-", "-", "rs", "wk", "-", "-", "-", "nu"],
        "skills": {
            "Cross Slash": 0,
            "Dodge Physical": 22,
            "Growth 3": 25,
            "Mazionga": 24,
            "Rising Slash": 21,
            "Tarukaja": 0,
            "Zionga": 0
        },
        "dlc": true
    },
    "Izanagi Picaro": {
        "inherits": "Almighty",
        "item": "Growth 3",
        "skillCard": true,
        "arcana": "Fool",
        "level": 23,
        "stats": [16, 15, 15, 16, 14],
        "elems": ["-", "-", "-", "-", "nu", "wk", "-", "-", "-", "nu"],
        "skills": {
            "Cross Slash": 0,
            "Growth 3": 28,
            "Mazionga": 27,
            "Null Phys": 25,
            "Rising Slash": 24,
            "Rakukaja": 0,
            "Zionga": 0
        },
        "dlc": true
    },
    "Jack Frost": {
        "inherits": "Ice",
        "item": "Frost Hood",
        "arcana": "Magician",
        "level": 11,
        "stats": [8, 9, 7, 9, 7],
        "elems": ["-", "-", "wk", "nu", "-", "-", "-", "-", "-", "-"],
        "skills": {"Baisudi": 0, "Bufu": 0, "Freeze Boost": 15, "Ice Break": 0, "Mabufu": 12, "Rakunda": 13},
        "personality": "Timid",
        "area": "Chemdah",
        "floor": "L4 & 6"
    },
    "Jack-o'-Lantern": {
        "inherits": "Fire",
        "item": "Pumpkin Bomb",
        "arcana": "Magician",
        "level": 2,
        "stats": [2, 3, 3, 3, 2],
        "elems": ["-", "wk", "ab", "wk", "-", "wk", "-", "-", "-", "-"],
        "skills": {"Agi": 0, "Dazzler": 5, "Sharp Student": 4, "Rakunda": 0, "Resist Sleep": 7},
        "personality": "Gloomy",
        "area": "Qimranut / Aiyatsbus",
        "floor": "All / L1"
    },
    "Jatayu": {
        "inherits": "Wind",
        "item": "Flash Bomb",
        "skillCard": true,
        "arcana": "Tower",
        "level": 32,
        "stats": [18, 21, 20, 27, 17],
        "elems": ["-", "-", "-", "-", "-", "ab", "wk", "-", "-", "-"],
        "skills": {
            "Dodge Psy": 33,
            "Flash Bomb": 0,
            "Garula": 0,
            "Masukukaja": 0,
            "Rainy Play": 36,
            "Snipe": 35,
            "Speed Master": 38
        }
    },
    "Jikokuten": {
        "inherits": "Physical",
        "item": "Memory Blow",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 25,
        "stats": [19, 12, 19, 17, 15],
        "elems": ["rs", "-", "-", "-", "-", "-", "-", "-", "rs", "wk"],
        "skills": {
            "Memory Blow": 0,
            "Counter": 28,
            "Adverse Resolve": 31,
            "Defense Master": 0,
            "Dekunda": 27,
            "Matarukaja": 30,
            "Rakunda": 0
        }
    },
    "Kaguya": {
        "inherits": "Almighty",
        "item": "Moonlight Robe",
        "arcana": "Moon",
        "level": 16,
        "stats": [11, 15, 12, 11, 6],
        "elems": ["-", "-", "wk", "-", "-", "rs", "-", "-", "nu", "nu"],
        "skills": {
            "Amrita Shower": 18,
            "Counterstrike": 0,
            "Diarahan": 21,
            "Divine Grace": 17,
            "Mediarama": 0,
            "Shining Arrows": 0,
            "Repel Phys": 22
        },
        "dlc": true
    },
    "Kaguya Picaro": {
        "inherits": "Almighty",
        "item": "Diarahan",
        "skillCard": true,
        "arcana": "Moon",
        "level": 25,
        "stats": [17, 20, 19, 15, 11],
        "elems": ["-", "-", "wk", "-", "-", "-", "-", "-", "nu", "nu"],
        "skills": {
            "Amrita Shower": 27,
            "Diarahan": 30,
            "Divine Grace": 26,
            "High Counter": 0,
            "Mediarama": 0,
            "Shining Arrows": 0,
            "Repel Phys": 31
        },
        "dlc": true
    },
    "Kaiwan": {
        "inherits": "Almighty",
        "item": "Mapsio",
        "skillCard": true,
        "arcana": "Star",
        "level": 36,
        "stats": [23, 26, 24, 22, 20],
        "elems": ["-", "nu", "-", "-", "-", "-", "nu", "wk", "-", "-"],
        "skills": {
            "Forget Boost": 37,
            "Makajam": 0,
            "Makajamon": 39,
            "Mapsio": 40,
            "Marakunda": 41,
            "Psio": 0,
            "Speed Master": 38
        },
        "personality": "Timid",
        "area": "Adyeshach",
        "floor": "L10-12"
    },
    "Kali": {
        "inherits": "Fire",
        "item": "Khamrai Tao",
        "arcana": "Empress",
        "level": 77,
        "stats": [53, 45, 46, 53, 41],
        "elems": ["-", "-", "nu", "-", "-", "-", "rp", "-", "-", "rs"],
        "skills": {
            "Absorb Nuke": 82,
            "Evade Ice": 79,
            "High Counter": 80,
            "Mapsiodyne": 81,
            "Psiodyne": 0,
            "Tentarafoo": 0,
            "Vorpal Blade": 0
        }
    },
    "Kelpie": {
        "inherits": "Wind",
        "item": "Terror Claw",
        "skillCard": true,
        "arcana": "Strength",
        "level": 6,
        "stats": [5, 5, 5, 6, 4],
        "elems": ["-", "-", "-", "rs", "wk", "-", "-", "-", "-", "-"],
        "skills": {"Garu": 0, "Lunge": 0, "Resist Brainwash": 8, "Sukukaja": 9, "Terror Claw": 10},
        "personality": "Upbeat",
        "area": "Aiyatsbus",
        "floor": "L3"
    },
    "Kikuri-Hime": {
        "inherits": "Healing",
        "item": "Divine Grace",
        "skillCard": true,
        "arcana": "Priestess",
        "level": 40,
        "stats": [22, 31, 24, 28, 22],
        "elems": ["-", "-", "wk", "-", "-", "nu", "-", "-", "rs", "-"],
        "skills": {"Divine Grace": 45, "Energy Drop": 0, "Lullaby": 0, "Marakukaja": 0, "Mediarama": 41, "Tetraja": 43},
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L3-5 (before Palace 7) / L2 & 3 (after Palace 7)"
    },
    "Kin-Ki": {
        "inherits": "Physical",
        "item": "Regenerate 1",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 25,
        "stats": [21, 13, 21, 15, 12],
        "elems": ["rs", "rs", "-", "-", "-", "-", "wk", "-", "-", "-"],
        "skills": {
            "Bad Beat": 30,
            "Counterstrike": 31,
            "Dodge Psy": 27,
            "Vajra Blast": 0,
            "Rakukaja": 0,
            "Regenerate 1": 0,
            "Sledgehammer": 28
        },
        "personality": "Gloomy",
        "area": "Kaitul",
        "floor": "L4, 5, 7-9"
    },
    "King Frost": {
        "inherits": "Ice",
        "item": "King Frost Cape",
        "arcana": "Emperor",
        "level": 61,
        "stats": [38, 39, 45, 33, 35],
        "elems": ["-", "-", "-", "ab", "-", "-", "-", "-", "nu", "-"],
        "skills": {
            "Auto-Mataru": 64,
            "Bufudyne": 0,
            "Freeze Boost": 62,
            "Ice Amp": 67,
            "Ice Break": 0,
            "Megaton Raid": 0,
            "Null Despair": 65
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L8, 11, 12, 13 (after Palace 7)"
    },
    "Kodama": {
        "inherits": "Ailment",
        "item": "Fear Boost",
        "skillCard": true,
        "arcana": "Star",
        "level": 11,
        "stats": [7, 11, 8, 10, 4],
        "elems": ["-", "-", "wk", "rs", "-", "-", "-", "-", "-", "-"],
        "skills": {
            "Evil Touch": 13,
            "Fear Boost": 15,
            "Garu": 0,
            "Psi": 12,
            "Rakunda": 0,
            "Resist Fear": 17,
            "Tarukaja": 14
        },
        "personality": "Upbeat",
        "area": "Aiyatsbus",
        "floor": "L1-3"
    },
    "Koh-i-Noor": {
        "item": "Koh-i-Noor",
        "arcana": "Priestess",
        "level": 25,
        "stats": [25, 25, 25, 25, 25],
        "elems": ["rs", "rs", "rs", "rs", "rs", "rs", "rs", "-", "nu", "nu"],
        "skills": {
            "Dodge Curse": 0,
            "Dodge Elec": 0,
            "Dodge Fire": 0,
            "Dodge Ice": 0,
            "Dodge Bless": 0,
            "Dodge Nuke": 0,
            "Dodge Psy": 0,
            "Dodge Wind": 0
        },
        "rare": true,
        "area": "Adyeshach",
        "floor": "L1-4, 6-8, 10-12"
    },
    "Kohryu": {
        "inherits": "Psy",
        "item": "Sudarshana",
        "arcana": "Hierophant",
        "level": 76,
        "stats": [43, 51, 50, 53, 38],
        "elems": ["-", "-", "-", "-", "rp", "-", "wk", "nu", "nu", "-"],
        "skills": {
            "Life Aid": 78,
            "Mapsiodyne": 0,
            "Mediarahan": 0,
            "Concentrate": 79,
            "Psy Amp": 80,
            "Psycho Force": 0,
            "Spell Master": 82
        },
        "special": true,
        "max": true
    },
    "Koppa Tengu": {
        "inherits": "Wind",
        "item": "Growth 1",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 11,
        "stats": [7, 8, 8, 11, 6],
        "elems": ["-", "-", "-", "wk", "-", "rs", "-", "-", "wk", "-"],
        "skills": {"Snap": 0, "Garu": 0, "Growth 1": 12, "Taunt": 13, "Rage Boost": 14, "Wage War": 15},
        "personality": "Upbeat",
        "area": "Chemdah",
        "floor": "L6 & 7"
    },
    "Koropokguru": {
        "inherits": "Ice",
        "item": "Bufu",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 9,
        "stats": [5, 8, 6, 9, 6],
        "elems": ["-", "rs", "wk", "rs", "-", "rs", "-", "-", "-", "-"],
        "skills": {"Bufu": 0, "Dodge Ice": 11, "Fire Wall": 13, "Mabufu": 14, "Makajam": 0, "Rakunda": 12},
        "personality": "Timid",
        "area": "Chemdah",
        "floor": "L2 & 3"
    },
    "Koumokuten": {
        "inherits": "Physical",
        "item": "Regenerate 2",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 49,
        "stats": [37, 32, 34, 31, 25],
        "elems": ["rs", "-", "-", "wk", "-", "-", "-", "-", "rs", "-"],
        "skills": {
            "Assault Dive": 0,
            "Attack Master": 51,
            "Deadly Fury": 55,
            "Enduring Soul": 54,
            "Matarukaja": 52,
            "Nuke Wall": 53,
            "Regenerate 2": 0,
            "Revolution": 0
        }
    },
    "Kumbhanda": {
        "inherits": "Ailment",
        "item": "Rage Boost",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 42,
        "stats": [29, 25, 27, 26, 26],
        "elems": ["-", "-", "nu", "wk", "-", "-", "-", "-", "-", "rs"],
        "skills": {
            "Dekaja": 45,
            "Hysterical Slap": 0,
            "Rage Boost": 46,
            "Revolution": 47,
            "Stagnant Air": 0,
            "Tempest Slash": 43,
            "Wage War": 0
        },
        "area": "Sheriruth",
        "floor": "L8, 9, 11-13 (before Palace 7) / L4 & 5 (after Palace 7)"
    },
    "Kurama Tengu": {
        "inherits": "Wind",
        "item": "Garudyne",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 56,
        "stats": [34, 38, 34, 42, 27],
        "elems": ["-", "-", "-", "wk", "-", "rp", "-", "-", "rs", "rs"],
        "skills": {"Brain Buster": 0, "Garudyne": 57, "Growth 3": 58, "Heat Wave": 0, "Magarudyne": 60, "Masukunda": 0},
        "area": "Sheriruth",
        "floor": "L11 (after Palace 7)"
    },
    "Kushinada": {
        "inherits": "Healing",
        "item": "Wind Wall",
        "skillCard": true,
        "arcana": "Lovers",
        "level": 42,
        "stats": [24, 30, 26, 28, 25],
        "elems": ["-", "-", "-", "-", "-", "-", "-", "wk", "rp", "-"],
        "skills": {
            "Amrita Shower": 47,
            "Hysterical Slap": 0,
            "Mabufula": 0,
            "Matarukaja": 44,
            "Mediarama": 0,
            "Null Sleep": 45,
            "Wind Wall": 46
        },
        "area": "Sheriruth",
        "floor": "L5, 7-9 (before Palace 7) / L3 & 4 (after Palace 7)"
    },
    "Kushi Mitama": {
        "inherits": "Healing",
        "item": "Forget Boost",
        "skillCard": true,
        "arcana": "Strength",
        "level": 14,
        "stats": [8, 12, 11, 9, 9],
        "elems": ["-", "-", "wk", "-", "-", "rs", "-", "-", "-", "-"],
        "skills": {
            "Bufu": 0,
            "Forget Boost": 18,
            "Garu": 0,
            "Makajam": 0,
            "Media": 0,
            "Regenerate 1": 15,
            "Wind Wall": 16
        }
    },
    "Lachesis": {
        "inherits": "Ice",
        "item": "Ice Boost",
        "skillCard": true,
        "arcana": "Fortune",
        "level": 34,
        "stats": [18, 25, 22, 25, 19],
        "elems": ["-", "-", "-", "nu", "wk", "rs", "-", "-", "-", "-"],
        "skills": {
            "Bufula": 0,
            "Elec Wall": 36,
            "Growth 2": 0,
            "Ice Boost": 40,
            "Mabaisudi": 0,
            "Mabufula": 38,
            "Marakukaja": 35
        }
    },
    "Lakshmi": {
        "inherits": "Healing",
        "item": "Life Aid",
        "skillCard": true,
        "arcana": "Fortune",
        "level": 69,
        "stats": [40, 47, 43, 46, 38],
        "elems": ["-", "-", "wk", "rs", "-", "-", "-", "-", "rs", "-"],
        "skills": {
            "Amrita Shower": 72,
            "Bufudyne": 0,
            "Life Aid": 74,
            "Diarahan": 0,
            "Lullaby": 0,
            "Mediarahan": 70,
            "Rainy Play": 71
        },
        "max": true
    },
    "Lamia": {
        "inherits": "Fire",
        "item": "Despair Boost",
        "skillCard": true,
        "arcana": "Empress",
        "level": 26,
        "stats": [21, 15, 18, 19, 12],
        "elems": ["-", "rs", "-", "wk", "rs", "-", "-", "-", "-", "nu"],
        "skills": {
            "Agilao": 0,
            "Despair Boost": 31,
            "Foul Breath": 28,
            "Maragion": 30,
            "Rising Slash": 0,
            "Rakukaja": 0,
            "Ominous Words": 27
        },
        "personality": "Gloomy",
        "area": "Akzeriyyuth",
        "floor": "L3, 5-7, 9-11"
    },
    "Leanan Sidhe": {
        "inherits": "Almighty",
        "item": "Recarm",
        "skillCard": true,
        "arcana": "Lovers",
        "level": 19,
        "stats": [9, 17, 12, 16, 10],
        "elems": ["-", "-", "wk", "-", "-", "rs", "rs", "-", "-", "-"],
        "skills": {"Eiga": 23, "Mamudo": 21, "Mapsi": 22, "Marin Karin": 20, "Psio": 0, "Rakunda": 0},
        "personality": "Irritable",
        "area": "Kaitul",
        "floor": "L3-5"
    },
    "Legion": {
        "inherits": "Psy",
        "item": "Legion's Jail",
        "arcana": "Fool",
        "level": 38,
        "stats": [24, 24, 30, 23, 20],
        "elems": ["rs", "rs", "rs", "-", "-", "-", "rs", "-", "wk", "nu"],
        "skills": {"Life Drain": 0, "Negative Pile": 0, "Null Dizzy": 42, "Psio": 39, "Rampage": 0, "Tetra Break": 40},
        "personality": "Unknown",
        "area": "Adyeshach",
        "floor": "L1-4"
    },
    "Lilim": {
        "inherits": "Ice",
        "item": "Lullaby",
        "skillCard": true,
        "arcana": "Devil",
        "level": 32,
        "stats": [17, 23, 18, 25, 20],
        "elems": ["-", "wk", "-", "rs", "-", "wk", "-", "-", "wk", "nu"],
        "skills": {
            "Bufula": 0,
            "Devil Smile": 0,
            "Dodge Bless": 35,
            "Freeze Boost": 34,
            "Mabufula": 37,
            "Masukunda": 0,
            "Spirit Drain": 36
        },
        "personality": "Gloomy",
        "area": "Adyeshach",
        "floor": "L6-8, 10-12"
    },
    "Lilith": {
        "inherits": "Almighty",
        "item": "Mabufudyne",
        "skillCard": true,
        "arcana": "Moon",
        "level": 60,
        "stats": [33, 43, 37, 39, 35],
        "elems": ["-", "-", "wk", "rp", "-", "-", "-", "-", "-", "nu"],
        "skills": {
            "Mabufudyne": 0,
            "Magarudyne": 62,
            "Makara Break": 0,
            "Mamudoon": 64,
            "Maragidyne": 65,
            "Mudoon": 0,
            "Spirit Drain": 63
        }
    },
    "Lucifer": {
        "inherits": "Almighty",
        "item": "Tyrant Pistol",
        "arcana": "Star",
        "level": 93,
        "stats": [61, 59, 59, 56, 51],
        "elems": ["-", "-", "-", "-", "-", "-", "-", "-", "wk", "-"],
        "skills": {
            "Absorb Phys": 99,
            "Gigantomachia": 0,
            "Heat Riser": 96,
            "Fortified Moxy": 97,
            "Blazing Hell": 0,
            "Insta-Heal": 98,
            "Morning Star": 94,
            "Spell Master": 95
        },
        "special": true,
        "max": true
    },
    "Mada": {
        "inherits": "Fire",
        "item": "Unshaken Will",
        "skillCard": true,
        "arcana": "Tower",
        "level": 85,
        "stats": [52, 51, 58, 56, 45],
        "elems": ["-", "-", "ab", "wk", "-", "-", "rs", "nu", "-", "-"],
        "skills": {
            "Agidyne": 0,
            "Amrita Shower": 88,
            "Burn Boost": 0,
            "Enduring Soul": 90,
            "Fire Amp": 0,
            "Blazing Hell": 87,
            "Spell Master": 91,
            "Unshaken Will": 86
        },
        "max": true
    },
    "Magatsu-Izanagi": {
        "inherits": "Almighty",
        "item": "Black Headband",
        "arcana": "Tower",
        "level": 44,
        "stats": [37, 35, 32, 25, 10],
        "elems": ["-", "rs", "-", "-", "-", "-", "-", "wk", "nu", "nu"],
        "skills": {
            "Attack Master": 48,
            "Bloodbath": 46,
            "Ghastly Wail": 0,
            "Heat Riser": 50,
            "Magatsu Mandala": 0,
            "Maziodyne": 45,
            "Megidola": 0
        },
        "dlc": true
    },
    "Magatsu-Izanagi Picaro": {
        "inherits": "Almighty",
        "item": "Heat Riser",
        "skillCard": true,
        "arcana": "Tower",
        "level": 48,
        "stats": [40, 38, 35, 27, 11],
        "elems": ["-", "rs", "-", "-", "-", "-", "-", "wk", "nu", "nu"],
        "skills": {
            "Bloodbath": 50,
            "Ghastly Wail": 0,
            "Heat Riser": 54,
            "Magarudyne": 49,
            "Magatsu Mandala": 0,
            "Megidola": 0,
            "Speed Master": 52
        },
        "dlc": true
    },
    "Makami": {
        "inherits": "Nuclear",
        "item": "Makajam",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 15,
        "stats": [13, 12, 8, 11, 8],
        "elems": ["-", "-", "-", "-", "wk", "rs", "-", "rs", "nu", "-"],
        "skills": {
            "Dodge Elec": 20,
            "Double Fangs": 0,
            "Energy Drop": 0,
            "Frei": 0,
            "Mafrei": 17,
            "Makajam": 18,
            "Resist Despair": 19
        },
        "personality": "Upbeat",
        "area": "Chemdah",
        "floor": "L6 & 7"
    },
    "Mandrake": {
        "inherits": "Electric",
        "item": "Energy Drop",
        "skillCard": true,
        "arcana": "Death",
        "level": 3,
        "stats": [2, 3, 3, 4, 4],
        "elems": ["-", "-", "wk", "-", "rs", "-", "-", "-", "-", "-"],
        "skills": {"Energy Drop": 0, "Lunge": 4, "Pulinpa": 0, "Skull Cracker": 7, "Sukunda": 5},
        "personality": "Upbeat",
        "area": "Qimranut / Aiyatsbus",
        "floor": "All / L1"
    },
    "Mara": {
        "inherits": "Fire",
        "item": "Maragidyne",
        "skillCard": true,
        "arcana": "Tower",
        "level": 73,
        "stats": [47, 46, 49, 45, 39],
        "elems": ["-", "nu", "ab", "wk", "-", "-", "-", "-", "rs", "rp"],
        "skills": {
            "Firm Stance": 78,
            "Heat Up": 77,
            "Maeigaon": 76,
            "Maragidyne": 0,
            "One-shot Kill": 0,
            "Charge": 74,
            "Tetra Break": 0
        }
    },
    "Matador": {
        "inherits": "Psy",
        "item": "Garula",
        "skillCard": true,
        "arcana": "Death",
        "level": 19,
        "stats": [12, 13, 12, 16, 11],
        "elems": ["-", "-", "-", "-", "wk", "nu", "-", "-", "-", "-"],
        "skills": {"Garula": 23, "Null Dizzy": 0, "Psi": 0, "Sukukaja": 0, "Swift Strike": 20, "Trigger Happy": 22}
    },
    "Melchizedek": {
        "inherits": "Bless",
        "item": "Mahamaon",
        "skillCard": true,
        "arcana": "Justice",
        "level": 60,
        "stats": [37, 38, 41, 39, 32],
        "elems": ["-", "-", "-", "-", "-", "wk", "rs", "-", "ab", "nu"],
        "skills": {
            "Amrita Drop": 65,
            "God's Hand": 67,
            "Hama Boost": 61,
            "Hamaon": 0,
            "Mahamaon": 64,
            "Megaton Raid": 0,
            "Revolution": 62
        }
    },
    "Messiah": {
        "inherits": "Almighty",
        "item": "Lucifer Guard",
        "arcana": "Judgement",
        "level": 81,
        "stats": [50, 50, 50, 50, 50],
        "elems": ["-", "-", "rs", "rs", "rs", "rs", "rs", "rs", "rp", "wk"],
        "skills": {
            "Absorb Phys": 85,
            "Almighty Boost": 87,
            "Enduring Soul": 83,
            "God's Hand": 0,
            "Invigorate 3": 84,
            "Megidolaon": 0,
            "Oratorio": 0,
            "Regenerate 3": 82
        },
        "dlc": true
    },
    "Messiah Picaro": {
        "inherits": "Almighty",
        "item": "Insta-Heal",
        "skillCard": true,
        "arcana": "Judgement",
        "level": 90,
        "stats": [56, 56, 55, 55, 55],
        "elems": ["-", "-", "rs", "rs", "rs", "rs", "rs", "rs", "rp", "wk"],
        "skills": {
            "Agneyastra": 0,
            "Almighty Boost": 96,
            "Life Aid": 93,
            "Enduring Soul": 92,
            "Firm Stance": 94,
            "Insta-Heal": 91,
            "Megidolaon": 0,
            "Oratorio": 0
        },
        "dlc": true
    },
    "Metatron": {
        "inherits": "Bless",
        "item": "Nataraja",
        "arcana": "Justice",
        "level": 89,
        "stats": [54, 61, 60, 57, 42],
        "elems": ["-", "-", "-", "-", "wk", "rp", "ab", "ab", "-", "wk"],
        "skills": {
            "Sword Dance": 0,
            "Divine Judgement": 95,
            "Hama Boost": 92,
            "Bless Amp": 94,
            "Mahamaon": 0,
            "Makougaon": 0,
            "Megidolaon": 91,
            "Concentrate": 93
        },
        "special": true,
        "max": true
    },
    "Michael": {
        "inherits": "Almighty",
        "item": "Judge of the Dead",
        "arcana": "Judgement",
        "level": 87,
        "stats": [57, 54, 55, 56, 46],
        "elems": ["-", "rs", "-", "-", "-", "-", "-", "-", "rp", "nu"],
        "skills": {
            "Cosmic Flare": 92,
            "Sword Dance": 89,
            "Debilitate": 0,
            "Divine Judgement": 0,
            "Mabufudyne": 0,
            "Mahamaon": 90,
            "Megidolaon": 91
        },
        "special": true,
        "note": "Needs Strength cooperation rank 5 to be fused"
    },
    "Mitra": {
        "inherits": "Bless",
        "item": "Death Contract",
        "arcana": "Temperance",
        "level": 33,
        "stats": [19, 26, 19, 24, 18],
        "elems": ["-", "-", "-", "nu", "wk", "-", "-", "-", "nu", "-"],
        "skills": {
            "Dekunda": 35,
            "Diarama": 0,
            "Kouga": 0,
            "Bless Boost": 36,
            "Mahama": 0,
            "Makouga": 34,
            "Thermopylae": 38
        }
    },
    "Mithras": {
        "inherits": "Nuclear",
        "item": "Petra Genetrix",
        "arcana": "Sun",
        "level": 39,
        "stats": [27, 25, 27, 25, 20],
        "elems": ["rs", "-", "ab", "-", "-", "-", "wk", "nu", "-", "-"],
        "skills": {
            "Freidyne": 45,
            "Mafreila": 0,
            "Nuke Break": 42,
            "Vicious Strike": 0,
            "Tentarafoo": 0,
            "Tetra Break": 41
        },
        "personality": "Gloomy",
        "area": "Adyeshach",
        "floor": "L11 & 12"
    },
    "Mokoi": {
        "inherits": "Ailment",
        "item": "Dekunda",
        "skillCard": true,
        "arcana": "Death",
        "level": 9,
        "stats": [9, 5, 6, 10, 4],
        "elems": ["-", "-", "-", "-", "rs", "wk", "-", "-", "-", "-"],
        "skills": {
            "Dazzler": 0,
            "Dekunda": 14,
            "Dodge Elec": 13,
            "Marin Karin": 11,
            "Skull Cracker": 0,
            "Tarukaja": 0
        },
        "personality": "Gloomy",
        "area": "Chemdah",
        "floor": "L1-4"
    },
    "Moloch": {
        "inherits": "Psy",
        "item": "Nuke Amp",
        "skillCard": true,
        "arcana": "Hanged Man",
        "level": 60,
        "stats": [32, 45, 42, 31, 37],
        "elems": ["-", "-", "rp", "wk", "rs", "rs", "ab", "-", "-", "nu"],
        "skills": {
            "Absorb Fire": 64,
            "Agidyne": 62,
            "Devil Smile": 0,
            "Ghastly Wail": 63,
            "Nuke Amp": 65,
            "Psiodyne": 0,
            "Stagnant Air": 0
        }
    },
    "Mot": {
        "inherits": "Ailment",
        "item": "Concentrate",
        "skillCard": true,
        "arcana": "Death",
        "level": 72,
        "stats": [43, 51, 48, 42, 39],
        "elems": ["-", "rs", "-", "-", "ab", "wk", "-", "-", "-", "rp"],
        "skills": {
            "Matarukaja": 0,
            "Maziodyne": 0,
            "Megidola": 0,
            "Megidolaon": 76,
            "Concentrate": 74,
            "Repel Elec": 77
        }
    },
    "Mother Harlot": {
        "inherits": "Ice",
        "item": "Claiomh Solais - Sable",
        "arcana": "Empress",
        "level": 80,
        "stats": [55, 48, 46, 49, 49],
        "elems": ["-", "-", "-", "-", "rp", "-", "-", "-", "wk", "nu"],
        "skills": {
            "Debilitate": 85,
            "Ice Age": 81,
            "Ice Amp": 82,
            "Mabufudyne": 0,
            "Mamudoon": 0,
            "Mudo Boost": 0,
            "Null Bless": 83
        },
        "max": true
    },
    "Mothman": {
        "inherits": "Electric",
        "item": "Foul Breath",
        "skillCard": true,
        "arcana": "Moon",
        "level": 33,
        "stats": [21, 24, 16, 24, 21],
        "elems": ["-", "wk", "-", "-", "nu", "-", "rs", "-", "-", "-"],
        "skills": {
            "Ambient Aid": 36,
            "Makajamon": 37,
            "Mazionga": 0,
            "Shock Boost": 0,
            "Skull Cracker": 0,
            "Tentarafoo": 35
        },
        "personality": "Timid",
        "area": "Adyeshach",
        "floor": "L3, 4, 7, 8, 10"
    },
    "Naga": {
        "inherits": "Electric",
        "item": "Elec Boost",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 24,
        "stats": [15, 17, 15, 17, 15],
        "elems": ["-", "-", "-", "-", "nu", "wk", "-", "-", "-", "-"],
        "skills": {
            "Memory Blow": 0,
            "Dazzler": 27,
            "Double Fangs": 0,
            "Elec Boost": 26,
            "Marakukaja": 29,
            "Mazionga": 28,
            "Zionga": 0
        },
        "personality": "Gloomy",
        "area": "Akzeriyyuth",
        "floor": "L2, 3, 5-7, 9"
    },
    "Narcissus": {
        "inherits": "Ailment",
        "item": "Daffodils",
        "arcana": "Lovers",
        "level": 50,
        "stats": [27, 36, 29, 35, 30],
        "elems": ["-", "-", "wk", "-", "nu", "rs", "-", "-", "rs", "-"],
        "skills": {
            "Nocturnal Flash": 0,
            "Ambient Aid": 55,
            "Dizzy Boost": 53,
            "Energy Drop": 0,
            "Growth 3": 52,
            "Magarula": 0,
            "Mediarama": 54
        },
        "area": "Sheriruth",
        "floor": "L7 & 8 (after Palace 7)"
    },
    "Nebiros": {
        "inherits": "Curse",
        "item": "Eigaon",
        "skillCard": true,
        "arcana": "Devil",
        "level": 62,
        "stats": [39, 40, 42, 36, 36],
        "elems": ["-", "-", "-", "-", "-", "-", "rs", "-", "wk", "rp"],
        "skills": {
            "Curse Amp": 65,
            "Eigaon": 0,
            "Evade Bless": 66,
            "Maeigaon": 64,
            "Mamudoon": 0,
            "Marin Karin": 0,
            "Megidolaon": 68
        }
    },
    "Neko Shogun": {
        "inherits": "Almighty",
        "item": "Catnap",
        "arcana": "Star",
        "level": 30,
        "stats": [19, 20, 19, 21, 18],
        "elems": ["rs", "-", "-", "-", "rs", "wk", "-", "-", "nu", "rs"],
        "skills": {
            "Defense Master": 34,
            "Diarama": 0,
            "Fortified Moxy": 36,
            "Invigorate 1": 31,
            "Masukukaja": 0,
            "Psio": 0,
            "Rat Fang": 33
        },
        "special": true,
        "note": "Needs Strength cooperation rank 1 to be fused"
    },
    "Nekomata": {
        "inherits": "Ailment",
        "item": "Pawzooka",
        "arcana": "Magician",
        "level": 17,
        "stats": [13, 10, 12, 15, 8],
        "elems": ["-", "-", "-", "-", "wk", "-", "rs", "-", "-", "-"],
        "skills": {
            "Evil Touch": 0,
            "Dodge Elec": 22,
            "Elec Wall": 21,
            "Hysterical Slap": 18,
            "Magaru": 0,
            "Terror Claw": 0,
            "Wind Break": 20
        },
        "personality": "Upbeat",
        "area": "Kaitul",
        "floor": "L2-4"
    },
    "Nigi Mitama": {
        "inherits": "Healing",
        "item": "Me Patra",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 20,
        "stats": [12, 14, 14, 15, 12],
        "elems": ["-", "-", "-", "-", "wk", "-", "-", "-", "rs", "rs"],
        "skills": {"Baisudi": 0, "Divine Grace": 22, "Makouha": 0, "Me Patra": 23, "Media": 0, "Rainy Play": 24}
    },
    "Norn": {
        "inherits": "Almighty",
        "item": "Diarahan",
        "skillCard": true,
        "arcana": "Fortune",
        "level": 52,
        "stats": [30, 38, 33, 34, 28],
        "elems": ["-", "-", "-", "rs", "-", "ab", "-", "-", "-", "-"],
        "skills": {
            "Amrita Drop": 55,
            "Nocturnal Flash": 0,
            "Diarahan": 54,
            "Garudyne": 0,
            "Samarecarm": 57,
            "Tetraja": 56,
            "Ziodyne": 0
        },
        "area": "Sheriruth",
        "floor": "L11-13 (before Palace 7) / L5 (after Palace 7)"
    },
    "Nue": {
        "inherits": "Curse",
        "item": "Skull Cracker",
        "skillCard": true,
        "arcana": "Moon",
        "level": 20,
        "stats": [16, 10, 17, 14, 10],
        "elems": ["-", "-", "wk", "rs", "-", "-", "-", "-", "-", "nu"],
        "skills": {
            "Assault Dive": 25,
            "Curse Boost": 26,
            "Maeiha": 0,
            "Mamudo": 24,
            "Mudo": 21,
            "Pulinpa": 22,
            "Skull Cracker": 0
        },
        "personality": "Irritable",
        "area": "Chemdah",
        "floor": "L4"
    },
    "Obariyon": {
        "inherits": "Physical",
        "item": "Lucky Punch",
        "skillCard": true,
        "arcana": "Fool",
        "level": 8,
        "stats": [7, 3, 9, 8, 4],
        "elems": ["rs", "-", "-", "-", "wk", "-", "-", "-", "-", "-"],
        "skills": {"Dekaja": 12, "Snap": 0, "Lucky Punch": 9, "Resist Fear": 10, "Sukunda": 0},
        "personality": "Unknown",
        "area": "Aiyatsbus",
        "floor": "L3, 5 & 6"
    },
    "Oberon": {
        "inherits": "Electric",
        "item": "Elec Amp",
        "skillCard": true,
        "arcana": "Emperor",
        "level": 66,
        "stats": [40, 44, 43, 43, 35],
        "elems": ["-", "-", "-", "-", "rs", "-", "nu", "wk", "-", "-"],
        "skills": {
            "Brain Jack": 0,
            "Elec Amp": 72,
            "Heat Wave": 0,
            "Matarukaja": 68,
            "Maziodyne": 69,
            "Psy Wall": 70,
            "Samarecarm": 71,
            "Ziodyne": 0
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L13 (after Palace 7)"
    },
    "Odin": {
        "inherits": "Electric",
        "item": "Wild Hunt",
        "arcana": "Emperor",
        "level": 82,
        "stats": [53, 52, 54, 52, 42],
        "elems": ["-", "-", "-", "-", "nu", "ab", "-", "-", "rp", "rp"],
        "skills": {
            "Wild Thunder": 84,
            "Elec Amp": 87,
            "Fast Heal": 86,
            "Marakukaja": 0,
            "Concentrate": 85,
            "Myriad Slashes": 0,
            "Thunder Reign": 0
        },
        "max": true
    },
    "Okuninushi": {
        "inherits": "Psy",
        "item": "Official's Robe",
        "arcana": "Emperor",
        "level": 44,
        "stats": [30, 28, 29, 28, 24],
        "elems": ["-", "-", "-", "-", "rp", "wk", "nu", "wk", "-", "-"],
        "skills": {
            "Evade Nuke": 47,
            "Heat Wave": 49,
            "Mapsio": 0,
            "Matarukaja": 0,
            "Psy Boost": 45,
            "Psy Break": 46,
            "Tempest Slash": 0
        }
    },
    "Ongyo-Ki": {
        "inherits": "Physical",
        "item": "Myriad Slashes",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 75,
        "stats": [56, 42, 47, 48, 39],
        "elems": ["rs", "rs", "-", "-", "-", "-", "-", "-", "rp", "rp"],
        "skills": {
            "Agneyastra": 81,
            "Arms Master": 77,
            "Firm Stance": 79,
            "Makajamon": 0,
            "Pressing Stance": 0,
            "Myriad Slashes": 0,
            "Regenerate 3": 78
        },
        "special": true,
        "max": true
    },
    "Oni": {
        "inherits": "Physical",
        "item": "Rampage",
        "skillCard": true,
        "arcana": "Strength",
        "level": 19,
        "stats": [17, 8, 16, 13, 10],
        "elems": ["rs", "rs", "-", "-", "-", "-", "-", "-", "-", "-"],
        "skills": {"Memory Blow": 23, "Sharp Student": 22, "Counter": 0, "Snap": 0, "Giant Slice": 21, "Rampage": 0},
        "personality": "Upbeat",
        "area": "Kaitul",
        "floor": "L3-5, 8, 9"
    },
    "Onmoraki": {
        "inherits": "Curse",
        "item": "Confuse Boost",
        "skillCard": true,
        "arcana": "Moon",
        "level": 12,
        "stats": [9, 12, 7, 10, 5],
        "elems": ["-", "wk", "rs", "-", "-", "-", "-", "-", "wk", "nu"],
        "skills": {"Agi": 13, "Ice Wall": 0, "Mudo": 0, "Confuse Boost": 15, "Pulinpa": 14, "Resist Fear": 17},
        "personality": "Gloomy",
        "area": "Chemdah",
        "floor": "L3 & 4"
    },
    "Orlov": {
        "item": "Orlov",
        "arcana": "Strength",
        "level": 30,
        "stats": [30, 30, 30, 30, 30],
        "elems": ["rs", "nu", "nu", "nu", "-", "nu", "nu", "nu", "nu", "nu"],
        "skills": {
            "Mabufula": 0,
            "Maeiga": 0,
            "Mafreila": 0,
            "Magarula": 0,
            "Makouga": 0,
            "Mapsio": 0,
            "Maragion": 0,
            "Mazionga": 0
        },
        "rare": true,
        "area": "Sheriruth",
        "floor": "All (before Palace 7) / L1-5 (after Palace 7)"
    },
    "Orobas": {
        "inherits": "Fire",
        "item": "Maragi",
        "skillCard": true,
        "arcana": "Hierophant",
        "level": 17,
        "stats": [11, 14, 15, 12, 6],
        "elems": ["-", "-", "-", "-", "-", "rs", "-", "-", "wk", "rs"],
        "skills": {"Dekaja": 0, "Fire Break": 20, "Makajamon": 21, "Maragi": 0, "Marakunda": 19, "Sukukaja": 0},
        "personality": "Timid",
        "area": "Kaitul",
        "floor": "L1-3"
    },
    "Orpheus": {
        "inherits": "Almighty",
        "item": "Hades Harp",
        "arcana": "Fool",
        "level": 26,
        "stats": [17, 17, 17, 17, 17],
        "elems": ["-", "-", "-", "-", "wk", "-", "-", "-", "rs", "wk"],
        "skills": {
            "Agilao": 0,
            "Cadenza": 0,
            "Endure": 27,
            "Fire Boost": 32,
            "Maragion": 29,
            "Marakukaja": 30,
            "Tarunda": 0
        },
        "dlc": true
    },
    "Orpheus Picaro": {
        "inherits": "Almighty",
        "item": "Agidyne",
        "skillCard": true,
        "arcana": "Fool",
        "level": 29,
        "stats": [19, 19, 19, 19, 18],
        "elems": ["-", "-", "-", "-", "wk", "-", "-", "-", "rs", "wk"],
        "skills": {
            "Agidyne": 32,
            "Cadenza": 0,
            "Endure": 30,
            "Fire Boost": 35,
            "Maragion": 0,
            "Matarukaja": 33,
            "Matarunda": 0
        },
        "dlc": true
    },
    "Orthrus": {
        "inherits": "Fire",
        "item": "Burn Boost",
        "skillCard": true,
        "arcana": "Hanged Man",
        "level": 21,
        "stats": [16, 14, 14, 19, 7],
        "elems": ["-", "-", "ab", "wk", "-", "-", "-", "rs", "-", "-"],
        "skills": {"Agilao": 0, "Burn Boost": 22, "Dodge Ice": 0, "Double Fangs": 0, "Matarukaja": 26, "Rat Fang": 24},
        "personality": "Irritable",
        "area": "Kaitul",
        "floor": "L4, 5, 7-9"
    },
    "Ose": {
        "inherits": "Ailment",
        "item": "Matarukaja",
        "skillCard": true,
        "arcana": "Fool",
        "level": 42,
        "stats": [32, 24, 25, 31, 21],
        "elems": ["-", "-", "rs", "-", "-", "-", "-", "-", "wk", "nu"],
        "skills": {"Counterstrike": 0, "Heat Wave": 47, "Matarukaja": 45, "Oni Kagura": 0, "Tempest Slash": 43},
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L1-5, 9 (before Palace 7) / L1-4 (after Palace 7)"
    },
    "Pale Rider": {
        "inherits": "Curse",
        "item": "Megidola",
        "skillCard": true,
        "arcana": "Death",
        "level": 53,
        "stats": [34, 34, 33, 39, 26],
        "elems": ["-", "-", "-", "-", "-", "rs", "-", "-", "wk", "rp"],
        "skills": {
            "Abysmal Surge": 0,
            "Brain Shake": 0,
            "Curse Boost": 55,
            "Deathbound": 58,
            "Eigaon": 0,
            "Evade Bless": 57,
            "Megidola": 54
        }
    },
    "Parvati": {
        "inherits": "Psy",
        "item": "Psiodyne",
        "skillCard": true,
        "arcana": "Lovers",
        "level": 56,
        "stats": [33, 39, 33, 39, 31],
        "elems": ["-", "-", "-", "rp", "-", "-", "rs", "-", "rs", "wk"],
        "skills": {
            "Diarahan": 58,
            "Diarama": 0,
            "Energy Shower": 57,
            "Hama Boost": 61,
            "Hamaon": 0,
            "Mapsiodyne": 59,
            "Psiodyne": 0
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L9, 11, 12 (after Palace 7)"
    },
    "Pazuzu": {
        "inherits": "Curse",
        "item": "Maeiga",
        "skillCard": true,
        "arcana": "Devil",
        "level": 43,
        "stats": [29, 30, 27, 26, 24],
        "elems": ["-", "-", "-", "-", "-", "rs", "-", "-", "wk", "nu"],
        "skills": {
            "Bad Beat": 47,
            "Ambient Aid": 45,
            "Devil Smile": 46,
            "Eigaon": 48,
            "Maeiga": 0,
            "Mudoon": 0,
            "Tentarafoo": 0
        }
    },
    "Pisaca": {
        "inherits": "Curse",
        "item": "Headhunter Ladle",
        "arcana": "Death",
        "level": 29,
        "stats": [19, 21, 21, 17, 16],
        "elems": ["-", "-", "wk", "-", "rs", "-", "-", "-", "wk", "nu"],
        "skills": {
            "Abysmal Surge": 32,
            "Despair Boost": 33,
            "Dream Needle": 0,
            "Mamudo": 30,
            "Mudoon": 34,
            "Rampage": 0,
            "Stagnant Air": 0
        },
        "personality": "Unknown",
        "area": "Akzeriyyuth",
        "floor": "L5-7, 9-11"
    },
    "Pixie": {
        "inherits": "Electric",
        "item": "Dia",
        "skillCard": true,
        "arcana": "Lovers",
        "level": 2,
        "stats": [1, 3, 3, 4, 2],
        "elems": ["-", "wk", "-", "wk", "rs", "-", "-", "-", "rs", "wk"],
        "skills": {"Dia": 0, "Patra": 3, "Resist Confuse": 6, "Tarukaja": 5, "Zio": 0},
        "personality": "Timid",
        "area": "Qimranut / Aiyatsbus",
        "floor": "All / L1 & 3"
    },
    "Power": {
        "inherits": "Bless",
        "item": "Masukukaja",
        "skillCard": true,
        "arcana": "Justice",
        "level": 41,
        "stats": [30, 26, 28, 25, 21],
        "elems": ["-", "wk", "-", "-", "-", "rs", "-", "-", "nu", "wk"],
        "skills": {
            "Diarama": 44,
            "Hamaon": 0,
            "Makouga": 43,
            "Masukukaja": 45,
            "Null Curse": 46,
            "Sukukaja": 0,
            "Swift Strike": 42
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L1-5, 7 (before Palace 7) / L1-3 (after Palace 7)"
    },
    "Principality": {
        "inherits": "Bless",
        "item": "Tetraja",
        "skillCard": true,
        "arcana": "Justice",
        "level": 29,
        "stats": [17, 19, 18, 21, 19],
        "elems": ["-", "-", "rs", "-", "-", "-", "-", "-", "nu", "wk"],
        "skills": {"Bless Boost": 34, "Mabaisudi": 32, "Makajamon": 0, "Makouga": 0, "Mediarama": 31, "Tetraja": 0}
    },
    "Queen Mab": {
        "inherits": "Almighty",
        "item": "Masquerade Ribbon",
        "arcana": "Magician",
        "level": 43,
        "stats": [23, 35, 26, 30, 22],
        "elems": ["-", "-", "nu", "-", "rs", "wk", "-", "-", "-", "-"],
        "skills": {"Agidyne": 48, "Makajamon": 0, "Makara Break": 46, "Matarunda": 44, "Mazionga": 0, "Wind Wall": 0},
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L5, 7-9 (before Palace 7) / L3 & 4 (after Palace 7)"
    },
    "Quetzalcoatl": {
        "inherits": "Wind",
        "item": "Regenerate 3",
        "skillCard": true,
        "arcana": "Sun",
        "level": 63,
        "stats": [38, 42, 41, 41, 34],
        "elems": ["-", "-", "nu", "-", "-", "rs", "wk", "-", "-", "-"],
        "skills": {
            "Memory Blow": 0,
            "Garudyne": 0,
            "Growth 3": 65,
            "Magarudyne": 67,
            "Magarula": 0,
            "Regenerate 3": 66,
            "Wind Amp": 68
        }
    },
    "Raja Naga": {
        "inherits": "Electric",
        "item": "Ziodyne",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 55,
        "stats": [33, 37, 36, 35, 31],
        "elems": ["-", "-", "-", "-", "nu", "-", "-", "-", "-", "-"],
        "skills": {
            "Elec Break": 0,
            "Evade Wind": 60,
            "Makarakarn": 58,
            "Maziodyne": 59,
            "Shock Boost": 57,
            "Tentarafoo": 0,
            "Ziodyne": 0
        }
    },
    "Rakshasa": {
        "inherits": "Physical",
        "item": "Mind Slice",
        "skillCard": true,
        "arcana": "Strength",
        "level": 24,
        "stats": [20, 15, 18, 17, 9],
        "elems": ["rs", "-", "rs", "-", "-", "wk", "-", "-", "wk", "rs"],
        "skills": {
            "Counterstrike": 28,
            "Adverse Resolve": 30,
            "Giant Slice": 0,
            "Mind Slice": 27,
            "Regenerate 1": 26,
            "Tarukaja": 0,
            "Wind Wall": 0
        },
        "personality": "Irritable",
        "area": "Kaitul",
        "floor": "L5, 7-9"
    },
    "Rangda": {
        "inherits": "Curse",
        "item": "Bloodbath",
        "skillCard": true,
        "arcana": "Magician",
        "level": 48,
        "stats": [28, 34, 30, 33, 26],
        "elems": ["rp", "rp", "nu", "-", "wk", "-", "-", "-", "wk", "nu"],
        "skills": {"Bloodbath": 0, "Counterstrike": 0, "Eigaon": 49, "Matarunda": 51, "Mudoon": 53, "Swift Strike": 0},
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L11-13 (before Palace 7) / L5 (after Palace 7)"
    },
    "Raphael": {
        "inherits": "Almighty",
        "item": "Heat Riser",
        "skillCard": true,
        "arcana": "Lovers",
        "level": 78,
        "stats": [57, 45, 49, 55, 35],
        "elems": ["-", "-", "-", "ab", "-", "-", "nu", "-", "nu", "-"],
        "skills": {
            "Arms Master": 83,
            "Adverse Resolve": 82,
            "Sword Dance": 0,
            "Dekaja": 0,
            "Growth 3": 81,
            "Heat Riser": 80,
            "Charge": 0
        }
    },
    "Red Rider": {
        "inherits": "Psy",
        "item": "Psy Break",
        "skillCard": true,
        "arcana": "Tower",
        "level": 41,
        "stats": [26, 27, 25, 29, 23],
        "elems": ["-", "-", "-", "-", "-", "-", "-", "-", "wk", "nu"],
        "skills": {
            "Mapsio": 0,
            "Negative Pile": 42,
            "Pressing Stance": 45,
            "Psy Break": 0,
            "Rage Boost": 46,
            "Rising Slash": 0,
            "Resist Confuse": 44
        }
    },
    "Regent": {
        "item": "Regent",
        "arcana": "Emperor",
        "level": 10,
        "stats": [10, 10, 10, 10, 10],
        "elems": ["rs", "rs", "rs", "rs", "rs", "rs", "wk", "wk", "nu", "nu"],
        "skills": {
            "Mabufu": 0,
            "Maeiha": 0,
            "Mafrei": 0,
            "Magaru": 0,
            "Makouha": 0,
            "Mapsi": 0,
            "Maragi": 0,
            "Mazio": 0
        },
        "rare": true,
        "area": "Qimranut / Aiyatsbus / Chemdah",
        "floor": "All / L1-3, 5 & 6 / L1-4, 6 & 7"
    },
    "Saki Mitama": {
        "inherits": "Healing",
        "item": "Rakukaja",
        "skillCard": true,
        "arcana": "Lovers",
        "level": 6,
        "stats": [4, 6, 5, 6, 4],
        "elems": ["-", "-", "-", "rs", "wk", "-", "-", "-", "-", "-"],
        "skills": {"Bufu": 0, "Energy Drop": 0, "Growth 1": 7, "Rakukaja": 8, "Resist Dizzy": 10, "Wind Wall": 0}
    },
    "Sandalphon": {
        "inherits": "Bless",
        "item": "Angelic Grace",
        "skillCard": true,
        "arcana": "Moon",
        "level": 75,
        "stats": [46, 51, 49, 48, 38],
        "elems": ["rs", "rs", "-", "-", "rs", "-", "-", "-", "rp", "nu"],
        "skills": {
            "Amrita Shower": 0,
            "Angelic Grace": 77,
            "Sword Dance": 79,
            "Mahamaon": 0,
            "Repel Curse": 78,
            "Samarecarm": 0
        },
        "max": true
    },
    "Sandman": {
        "inherits": "Wind",
        "item": "Sleep Boost",
        "skillCard": true,
        "arcana": "Magician",
        "level": 24,
        "stats": [11, 13, 14, 20, 21],
        "elems": ["-", "-", "-", "-", "wk", "rs", "-", "-", "-", "-"],
        "skills": {
            "Dormin Rush": 0,
            "Dormina": 0,
            "Garula": 0,
            "Magarula": 28,
            "Null Sleep": 27,
            "Sleep Boost": 29,
            "Sukunda": 25
        },
        "personality": "Irritable",
        "area": "Akzeriyyuth",
        "floor": "L1-3"
    },
    "Sarasvati": {
        "inherits": "Healing",
        "item": "Mediarama",
        "skillCard": true,
        "arcana": "Priestess",
        "level": 50,
        "stats": [30, 35, 32, 33, 27],
        "elems": ["-", "-", "-", "nu", "rs", "-", "-", "wk", "-", "-"],
        "skills": {
            "Dekaja": 52,
            "Diarahan": 54,
            "Matarunda": 53,
            "Me Patra": 0,
            "Mediarama": 0,
            "Null Sleep": 51,
            "Tentarafoo": 0
        },
        "area": "Sheriruth",
        "floor": "L7-9. 12 (after Palace 7)"
    },
    "Satan": {
        "inherits": "Ice",
        "item": "Tantric Oath",
        "arcana": "Judgement",
        "level": 92,
        "stats": [62, 59, 55, 52, 55],
        "elems": ["-", "rs", "-", "rp", "-", "-", "-", "-", "-", "rp"],
        "skills": {
            "Absorb Ice": 98,
            "Black Viper": 94,
            "Diamond Dust": 0,
            "Ice Age": 0,
            "Invigorate 3": 95,
            "Concentrate": 97,
            "Regenerate 3": 0,
            "Fortify Spirit": 96
        },
        "max": true
    },
    "Satanael": {
        "inherits": "Almighty",
        "item": "Paradise Lost",
        "arcana": "Fool",
        "level": 95,
        "stats": [63, 60, 57, 56, 56],
        "elems": ["rs", "rs", "rs", "rs", "rs", "rs", "rs", "rs", "nu", "ab"],
        "skills": {
            "Cosmic Flare": 96,
            "Heat Riser": 97,
            "Maeigaon": 0,
            "Megidolaon": 0,
            "Riot Gun": 0,
            "Survival Trick": 0,
            "Unshaken Will": 98,
            "Victory Cry": 99
        },
        "special": true,
        "note": "Only available on NG+"
    },
    "Scathach": {
        "inherits": "Wind",
        "item": "Tempest Slash",
        "skillCard": true,
        "arcana": "Priestess",
        "level": 45,
        "stats": [29, 30, 28, 30, 25],
        "elems": ["-", "-", "-", "rp", "-", "-", "-", "-", "-", "nu"],
        "skills": {
            "Attack Master": 49,
            "Sharp Student": 0,
            "Endure": 50,
            "Magarula": 0,
            "Maragion": 46,
            "Matarukaja": 48,
            "Tempest Slash": 0
        },
        "personality": "Upbeat",
        "area": "Adyeshach",
        "floor": "L10-12"
    },
    "Seiryu": {
        "inherits": "Ice",
        "item": "Amrita Drop",
        "skillCard": true,
        "arcana": "Temperance",
        "level": 62,
        "stats": [38, 41, 43, 37, 34],
        "elems": ["-", "-", "-", "rs", "-", "-", "-", "wk", "-", "-"],
        "skills": {
            "Amrita Drop": 66,
            "Bufudyne": 0,
            "Diarahan": 0,
            "Mabufudyne": 65,
            "Makarakarn": 67,
            "Marakukaja": 0,
            "Repel Nuke": 63
        }
    },
    "Setanta": {
        "inherits": "Physical",
        "item": "Counter",
        "skillCard": true,
        "arcana": "Emperor",
        "level": 28,
        "stats": [20, 17, 19, 18, 17],
        "elems": ["-", "-", "-", "-", "-", "-", "wk", "rs", "-", "-"],
        "skills": {
            "Counter": 0,
            "Dormin Rush": 0,
            "Giant Slice": 0,
            "Charge": 34,
            "Rising Slash": 31,
            "Rebellion": 32
        }
    },
    "Seth": {
        "inherits": "Fire",
        "item": "One-shot Kill",
        "skillCard": true,
        "arcana": "Tower",
        "level": 51,
        "stats": [32, 35, 30, 35, 28],
        "elems": ["-", "-", "rp", "-", "-", "nu", "-", "-", "wk", "rs"],
        "skills": {
            "Agidyne": 0,
            "Fire Break": 54,
            "Masukukaja": 0,
            "One-shot Kill": 0,
            "Fortify Spirit": 56,
            "Cripple": 53
        },
        "special": true,
        "note": "Needs Strength cooperation rank 1 to be fused"
    },
    "Shiisaa": {
        "inherits": "Electric",
        "item": "Mazio",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 16,
        "stats": [13, 9, 12, 13, 8],
        "elems": ["rs", "rs", "-", "-", "-", "-", "-", "-", "nu", "wk"],
        "skills": {
            "Dodge Curse": 20,
            "Dodge Elec": 21,
            "Double Fangs": 0,
            "Rampage": 18,
            "Skull Cracker": 0,
            "Zio": 0
        }
    },
    "Shiki-Ouji": {
        "inherits": "Psy",
        "item": "Dormin Rush",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 21,
        "stats": [16, 14, 15, 14, 11],
        "elems": ["nu", "nu", "-", "-", "-", "-", "-", "wk", "-", "nu"],
        "skills": {"Dekaja": 24, "Snap": 0, "Mapsi": 22, "Oni Kagura": 27, "Taunt": 0, "Psio": 26, "Tarukaja": 0},
        "personality": "Irritable",
        "area": "Chemdah",
        "floor": "L6 & 7"
    },
    "Shiva": {
        "inherits": "Psy",
        "item": "Megido Fire",
        "arcana": "Judgement",
        "level": 82,
        "stats": [55, 54, 53, 53, 38],
        "elems": ["-", "-", "-", "nu", "rp", "-", "ab", "wk", "nu", "nu"],
        "skills": {
            "Auto-Mataru": 87,
            "Enduring Soul": 0,
            "Maziodyne": 0,
            "Megidolaon": 86,
            "Psycho Blast": 88,
            "Psycho Force": 0,
            "Riot Gun": 85
        },
        "special": true
    },
    "Siegfried": {
        "inherits": "Physical",
        "item": "Vorpal Blade",
        "skillCard": true,
        "arcana": "Strength",
        "level": 69,
        "stats": [51, 37, 47, 48, 31],
        "elems": ["nu", "-", "-", "rs", "-", "-", "-", "wk", "-", "-"],
        "skills": {
            "Auto-Mataru": 72,
            "High Counter": 0,
            "Masukukaja": 0,
            "Megaton Raid": 0,
            "Charge": 70,
            "Vorpal Blade": 74
        }
    },
    "Silky": {
        "inherits": "Healing",
        "item": "Silk Dress",
        "arcana": "Priestess",
        "level": 6,
        "stats": [4, 7, 4, 5, 5],
        "elems": ["-", "-", "wk", "rs", "wk", "-", "-", "-", "-", "-"],
        "skills": {"Bufu": 0, "Sharp Student": 10, "Dia": 7, "Dormina": 0, "Patra": 9},
        "personality": "Gloomy",
        "area": "Aiyatsbus",
        "floor": "L2, 3, 5 & 6"
    },
    "Skadi": {
        "inherits": "Ice",
        "item": "Snow Queen's Whip",
        "arcana": "Priestess",
        "level": 55,
        "stats": [35, 39, 34, 34, 30],
        "elems": ["-", "-", "-", "rp", "-", "-", "-", "-", "-", "nu"],
        "skills": {
            "Bufudyne": 58,
            "Evil Touch": 0,
            "Ghastly Wail": 56,
            "Mabufula": 0,
            "Null Despair": 0,
            "Repel Ice": 60,
            "Spirit Drain": 59
        },
        "area": "Sheriruth",
        "floor": "L12 & 13 (before Palace 7) / L5 (after Palace 7)"
    },
    "Slime": {
        "inherits": "Curse",
        "item": "Headbutt",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 10,
        "stats": [9, 6, 11, 6, 5],
        "elems": ["rs", "-", "wk", "-", "-", "wk", "-", "-", "-", "-"],
        "skills": {"Evil Touch": 0, "Eiha": 11, "Fire Wall": 13, "Headbutt": 14, "Lunge": 0},
        "personality": "Timid",
        "area": "Qimranut / Aiyatsbus",
        "floor": "All / L1, 2, 3, 6"
    },
    "Sraosha": {
        "inherits": "Bless",
        "item": "Archangel Bra",
        "arcana": "Star",
        "level": 80,
        "stats": [47, 56, 45, 56, 43],
        "elems": ["-", "-", "-", "-", "ab", "-", "-", "-", "rp", "wk"],
        "skills": {
            "Amrita Shower": 84,
            "Angelic Grace": 83,
            "Debilitate": 85,
            "Hama Boost": 0,
            "Kougaon": 0,
            "Mahamaon": 0,
            "Makougaon": 81
        },
        "special": true,
        "note": "Needs Strength cooperation rank 5 to be fused"
    },
    "Stone of Scone": {
        "item": "Stone of Scone",
        "arcana": "Fortune",
        "level": 20,
        "stats": [20, 20, 20, 20, 20],
        "elems": ["nu", "nu", "nu", "nu", "nu", "nu", "nu", "nu", "nu", "wk"],
        "skills": {"Agilao": 0, "Bufula": 0, "Eiga": 0, "Freila": 0, "Garula": 0, "Kouga": 0, "Psio": 0, "Zionga": 0},
        "rare": true,
        "area": "Akzeriyyuth",
        "floor": "L1-3, 5-7, 9-11"
    },
    "Succubus": {
        "inherits": "Curse",
        "item": "Brain Shot",
        "arcana": "Moon",
        "level": 7,
        "stats": [4, 7, 5, 8, 4],
        "elems": ["-", "wk", "rs", "-", "-", "-", "-", "-", "wk", "nu"],
        "skills": {"Agi": 8, "Brainwash Boost": 11, "Dekaja": 10, "Marin Karin": 0, "Mudo": 12, "Rebellion": 0},
        "personality": "Irritable",
        "area": "Aiyatsbus",
        "floor": "L5 & 6"
    },
    "Sudama": {
        "inherits": "Wind",
        "item": "Magaru",
        "skillCard": true,
        "arcana": "Hermit",
        "level": 17,
        "stats": [9, 14, 12, 13, 10],
        "elems": ["-", "-", "-", "wk", "-", "rp", "-", "wk", "-", "-"],
        "skills": {
            "Apt Pupil": 22,
            "Ambient Aid": 20,
            "Sharp Student": 0,
            "Garula": 23,
            "Lucky Punch": 0,
            "Magaru": 0,
            "Wind Wall": 21
        },
        "area": "Chemdah",
        "floor": "L6 & 7"
    },
    "Sui-Ki": {
        "inherits": "Ice",
        "item": "Mabufu",
        "skillCard": true,
        "arcana": "Moon",
        "level": 24,
        "stats": [16, 15, 15, 18, 15],
        "elems": ["-", "-", "-", "ab", "rs", "-", "-", "wk", "-", "-"],
        "skills": {
            "Bufula": 0,
            "Dodge Fire": 29,
            "Headbutt": 0,
            "Mabufu": 0,
            "Mabufula": 28,
            "Null Nuke": 26,
            "Wage War": 27
        },
        "personality": "Unknown",
        "area": "Kaitul",
        "floor": "L7-9"
    },
    "Surt": {
        "inherits": "Fire",
        "item": "Fire Amp",
        "skillCard": true,
        "arcana": "Magician",
        "level": 59,
        "stats": [37, 40, 39, 35, 33],
        "elems": ["-", "-", "ab", "wk", "-", "-", "-", "-", "-", "-"],
        "skills": {
            "Agidyne": 0,
            "Fire Break": 0,
            "High Counter": 61,
            "Inferno": 64,
            "Maragidyne": 60,
            "Megaton Raid": 0
        }
    },
    "Suzaku": {
        "inherits": "Nuclear",
        "item": "Mafrei",
        "skillCard": true,
        "arcana": "Sun",
        "level": 19,
        "stats": [11, 14, 10, 18, 11],
        "elems": ["-", "-", "ab", "wk", "-", "-", "-", "rs", "-", "-"],
        "skills": {
            "Frei": 0,
            "Mafrei": 22,
            "Marin Karin": 0,
            "Matarunda": 24,
            "Speed Master": 23,
            "Tarunda": 0,
            "Ominous Words": 21
        }
    },
    "Take-Minakata": {
        "inherits": "Electric",
        "item": "Thunder Band",
        "arcana": "Hanged Man",
        "level": 29,
        "stats": [20, 22, 21, 18, 13],
        "elems": ["-", "-", "-", "-", "rp", "-", "wk", "-", "-", "rs"],
        "skills": {
            "Assault Dive": 0,
            "Defense Master": 32,
            "Elec Boost": 34,
            "Elec Break": 0,
            "Mazionga": 30,
            "Zionga": 0
        },
        "personality": "Gloomy",
        "area": "Kaitul",
        "floor": "L7-9"
    },
    "Thanatos": {
        "inherits": "Almighty",
        "item": "Darkness Ring",
        "arcana": "Death",
        "level": 65,
        "stats": [43, 49, 41, 38, 31],
        "elems": ["rs", "-", "-", "-", "-", "-", "-", "-", "wk", "rp"],
        "skills": {
            "Curse Amp": 66,
            "Door of Hades": 0,
            "Enduring Soul": 70,
            "Fortified Moxy": 69,
            "Maeigaon": 0,
            "Mamudoon": 0,
            "One-shot Kill": 68
        },
        "dlc": true
    },
    "Thanatos Picaro": {
        "inherits": "Almighty",
        "item": "Maeigaon",
        "skillCard": true,
        "arcana": "Death",
        "level": 69,
        "stats": [45, 51, 43, 40, 35],
        "elems": ["rs", "-", "-", "-", "-", "-", "-", "-", "wk", "rp"],
        "skills": {
            "Adverse Resolve": 73,
            "Door of Hades": 0,
            "Enduring Soul": 74,
            "Maeigaon": 0,
            "Mamudoon": 0,
            "Mudo Boost": 70,
            "One-shot Kill": 72
        },
        "dlc": true
    },
    "Queen's Necklace": {
        "item": "Queen's Necklace",
        "arcana": "Empress",
        "level": 15,
        "stats": [15, 15, 15, 15, 15],
        "elems": ["rs", "wk", "rs", "rs", "rs", "rs", "rs", "rs", "rs", "rs"],
        "skills": {
            "Media": 0,
            "Rakukaja": 0,
            "Rakunda": 0,
            "Recarm": 0,
            "Sukukaja": 0,
            "Sukunda": 0,
            "Tarukaja": 0,
            "Tarunda": 0
        },
        "rare": true,
        "area": "Kaitul",
        "floor": "L1-5, 7-9"
    },
    "Thor": {
        "inherits": "Electric",
        "item": "Mjolnir",
        "arcana": "Chariot",
        "level": 64,
        "stats": [44, 39, 43, 38, 35],
        "elems": ["rs", "-", "-", "-", "ab", "-", "wk", "-", "rs", "rs"],
        "skills": {
            "Attack Master": 70,
            "Elec Amp": 66,
            "Heat Up": 68,
            "High Counter": 0,
            "Maziodyne": 67,
            "Megaton Raid": 0,
            "Ziodyne": 0
        }
    },
    "Thoth": {
        "inherits": "Nuclear",
        "item": "Growth 2",
        "skillCard": true,
        "arcana": "Emperor",
        "level": 36,
        "stats": [21, 28, 21, 24, 21],
        "elems": ["-", "-", "-", "-", "-", "-", "wk", "nu", "nu", "-"],
        "skills": {
            "Freila": 0,
            "Growth 2": 42,
            "Mafreila": 40,
            "Masukunda": 0,
            "Megido": 37,
            "Taunt": 0,
            "Psy Wall": 39
        },
        "personality": "Gloomy",
        "area": "Akzeriyyuth",
        "floor": "L6, 7, 9-11"
    },
    "Throne": {
        "inherits": "Bless",
        "item": "Invigorate 3",
        "skillCard": true,
        "arcana": "Justice",
        "level": 71,
        "stats": [42, 49, 47, 46, 36],
        "elems": ["-", "-", "ab", "-", "-", "-", "-", "rs", "nu", "wk"],
        "skills": {
            "Auto-Maraku": 76,
            "Evade Curse": 75,
            "Hama Boost": 0,
            "Invigorate 3": 0,
            "Bless Amp": 74,
            "Mahamaon": 0,
            "Makougaon": 73
        },
        "special": true,
        "note": "Needs Strength cooperation rank 5 to be fused"
    },
    "Titania": {
        "inherits": "Nuclear",
        "item": "Mediarahan",
        "skillCard": true,
        "arcana": "Empress",
        "level": 56,
        "stats": [32, 40, 35, 38, 30],
        "elems": ["-", "-", "-", "-", "-", "-", "wk", "rs", "rs", "rs"],
        "skills": {
            "Freidyne": 0,
            "Lullaby": 0,
            "Mafreidyne": 58,
            "Makara Break": 0,
            "Mediarahan": 61,
            "Nuke Amp": 60
        },
        "area": "Sheriruth",
        "floor": "L8, 9, 11-13 (after Palace 7)"
    },
    "Trumpeter": {
        "inherits": "Almighty",
        "item": "Debilitate",
        "skillCard": true,
        "arcana": "Judgement",
        "level": 59,
        "stats": [33, 42, 40, 38, 31],
        "elems": ["-", "-", "-", "ab", "rp", "-", "-", "-", "rp", "nu"],
        "skills": {
            "Abysmal Surge": 0,
            "Brain Buster": 0,
            "Life Aid": 64,
            "Debilitate": 65,
            "Mafreidyne": 0,
            "Fortify Spirit": 61,
            "Cripple": 62
        },
        "special": true,
        "note": "Needs Strength cooperation rank 5 to be fused"
    },
    "Tsukiyomi": {
        "inherits": "Almighty",
        "item": "Black Moon",
        "arcana": "Moon",
        "level": 50,
        "stats": [38, 32, 33, 37, 17],
        "elems": ["rs", "-", "-", "-", "-", "-", "-", "wk", "rs", "rp"],
        "skills": {
            "Absorb Curse": 0,
            "Arms Master": 56,
            "Life Drain": 0,
            "Curse Amp": 53,
            "Abyssal Wings": 0,
            "Myriad Slashes": 0,
            "Vorpal Blade": 55
        },
        "dlc": true
    },
    "Tsukiyomi Picaro": {
        "inherits": "Almighty",
        "item": "Spell Master",
        "skillCard": true,
        "arcana": "Moon",
        "level": 55,
        "stats": [41, 35, 36, 40, 20],
        "elems": ["rs", "-", "-", "-", "-", "-", "-", "wk", "rs", "rp"],
        "skills": {
            "Absorb Curse": 0,
            "Curse Amp": 58,
            "Abyssal Wings": 0,
            "Myriad Slashes": 0,
            "Spell Master": 61,
            "Spirit Drain": 0,
            "Vorpal Blade": 60
        },
        "dlc": true
    },
    "Unicorn": {
        "inherits": "Bless",
        "item": "Samarecarm",
        "skillCard": true,
        "arcana": "Hierophant",
        "level": 39,
        "stats": [20, 27, 25, 28, 24],
        "elems": ["-", "-", "-", "nu", "-", "-", "rs", "-", "nu", "wk"],
        "skills": {
            "Assault Dive": 0,
            "Dekunda": 0,
            "Hamaon": 44,
            "Kouga": 43,
            "Mahama": 0,
            "Samarecarm": 41,
            "Swift Strike": 42
        },
        "personality": "Unknown",
        "area": "Sheriruth",
        "floor": "L1-4 (before Palace 7) / L1 & 2 (after Palace 7)"
    },
    "Uriel": {
        "inherits": "Almighty",
        "item": "Heaven's Gate",
        "arcana": "Justice",
        "level": 81,
        "stats": [50, 54, 49, 55, 42],
        "elems": ["-", "-", "nu", "-", "-", "-", "-", "ab", "rp", "-"],
        "skills": {
            "Angelic Grace": 85,
            "Bloodbath": 0,
            "Deathbound": 0,
            "Megidolaon": 84,
            "Myriad Slashes": 0,
            "Repel Nuke": 83,
            "Spell Master": 86
        }
    },
    "Valkyrie": {
        "inherits": "Physical",
        "item": "Giant Slice",
        "skillCard": true,
        "arcana": "Strength",
        "level": 44,
        "stats": [33, 24, 28, 29, 25],
        "elems": ["-", "rs", "-", "-", "-", "-", "-", "-", "nu", "-"],
        "skills": {
            "Attack Master": 45,
            "Counterstrike": 0,
            "Deathbound": 46,
            "Dodge Physical": 49,
            "Matarukaja": 47,
            "Rising Slash": 0
        },
        "area": "Sheriruth",
        "floor": "L3-5, 7-9 (before Palace 7) / L2-4 (after Palace 7)"
    },
    "Vasuki": {
        "inherits": "Ailment",
        "item": "Kuzuryu Gouhou",
        "arcana": "Hanged Man",
        "level": 68,
        "stats": [41, 46, 45, 42, 37],
        "elems": ["-", "-", "-", "nu", "nu", "-", "-", "-", "-", "wk"],
        "skills": {
            "Brain Jack": 0,
            "Brainwash Boost": 72,
            "Evade Wind": 70,
            "Mahamaon": 0,
            "Makarakarn": 73,
            "Trigger Happy": 71,
            "Triple Down": 0
        },
        "special": true,
        "note": "Needs Strength cooperation rank 1 to be fused"
    },
    "Vishnu": {
        "inherits": "Almighty",
        "item": "Riot Gun",
        "skillCard": true,
        "arcana": "Fool",
        "level": 83,
        "stats": [56, 51, 49, 57, 43],
        "elems": ["-", "-", "wk", "ab", "-", "-", "-", "-", "nu", "nu"],
        "skills": {
            "Ali Dance": 0,
            "Magarudyne": 0,
            "Megidolaon": 0,
            "Charge": 86,
            "Repel Fire": 87,
            "Riot Gun": 90,
            "Vacuum Wave": 85,
            "Wind Amp": 88
        },
        "max": true
    },
    "White Rider": {
        "inherits": "Curse",
        "item": "Triple Down",
        "skillCard": true,
        "arcana": "Chariot",
        "level": 39,
        "stats": [24, 24, 25, 26, 25],
        "elems": ["-", "-", "nu", "wk", "-", "-", "-", "-", "nu", "rp"],
        "skills": {
            "Ailment Boost": 45,
            "Evil Touch": 0,
            "Foul Breath": 44,
            "Maeiga": 42,
            "Masukukaja": 43,
            "Oni Kagura": 0,
            "Snipe": 41,
            "Triple Down": 0
        }
    },
    "Yaksini": {
        "inherits": "Ice",
        "item": "Vicious Strike",
        "skillCard": true,
        "arcana": "Empress",
        "level": 20,
        "stats": [14, 11, 13, 16, 13],
        "elems": ["-", "-", "-", "rs", "-", "-", "-", "wk", "-", "-"],
        "skills": {
            "Attack Master": 23,
            "Counter": 0,
            "Hysterical Slap": 0,
            "Oni Kagura": 22,
            "Vicious Strike": 24,
            "Wage War": 0
        },
        "personality": "Irritable",
        "area": "Kaitul",
        "floor": "L3-5, 7"
    },
    "Yamata-no-Orochi": {
        "inherits": "Ice",
        "item": "Oni Kagura",
        "skillCard": true,
        "arcana": "Judgement",
        "level": 64,
        "stats": [44, 38, 48, 36, 33],
        "elems": ["-", "-", "-", "nu", "-", "-", "-", "wk", "-", "rs"],
        "skills": {
            "Adverse Resolve": 67,
            "Deathbound": 0,
            "Mabufudyne": 0,
            "Oni Kagura": 0,
            "Repel Fire": 66,
            "Unshaken Will": 69
        }
    },
    "Yatagarasu": {
        "inherits": "Fire",
        "item": "Black Wing Robe",
        "arcana": "Sun",
        "level": 57,
        "stats": [35, 41, 30, 40, 32],
        "elems": ["-", "-", "-", "-", "-", "rs", "-", "-", "nu", "wk"],
        "skills": {
            "Agidyne": 0,
            "Dekunda": 0,
            "Makara Break": 0,
            "Mediarahan": 59,
            "Null Wind": 62,
            "Pressing Stance": 60,
            "Wind Break": 61
        }
    },
    "Yoshitsune": {
        "inherits": "Physical",
        "item": "Usumidori",
        "arcana": "Tower",
        "level": 79,
        "stats": [58, 47, 45, 53, 41],
        "elems": ["nu", "-", "rs", "-", "rp", "-", "-", "-", "rp", "-"],
        "skills": {
            "Brave Blade": 0,
            "Elec Amp": 84,
            "Fast Heal": 82,
            "Hassou Tobi": 86,
            "Charge": 0,
            "Pressing Stance": 81,
            "Ziodyne": 0
        },
        "special": true,
        "note": "Needs Strength cooperation rank 5 to be fused"
    },
    "Yurlungur": {
        "inherits": "Electric",
        "item": "Mirrirmina",
        "arcana": "Sun",
        "level": 42,
        "stats": [26, 29, 28, 27, 23],
        "elems": ["-", "-", "-", "-", "nu", "-", "wk", "-", "rs", "-"],
        "skills": {
            "Brain Jack": 0,
            "Elec Boost": 48,
            "Elec Break": 45,
            "Mazionga": 0,
            "Megido": 0,
            "Revolution": 44,
            "Tetra Break": 47
        }
    },
    "Zaou-Gongen": {
        "inherits": "Fire",
        "item": "God's Hand",
        "skillCard": true,
        "arcana": "Strength",
        "level": 80,
        "stats": [57, 45, 50, 56, 39],
        "elems": ["-", "-", "rp", "-", "wk", "-", "-", "-", "nu", "nu"],
        "skills": {
            "Abysmal Surge": 0,
            "Enduring Soul": 83,
            "Evade Physical": 82,
            "God's Hand": 0,
            "Blazing Hell": 86,
            "Maragidyne": 0,
            "Cripple": 84
        },
        "max": true
    },
    "Zouchouten": {
        "inherits": "Electric",
        "item": "Sharp Student",
        "skillCard": true,
        "arcana": "Strength",
        "level": 31,
        "stats": [22, 19, 24, 18, 17],
        "elems": ["rs", "-", "-", "-", "-", "wk", "-", "-", "-", "-"],
        "skills": {
            "Attack Master": 36,
            "Sharp Student": 33,
            "Giant Slice": 0,
            "Resist Fear": 34,
            "Swift Strike": 35,
            "Terror Claw": 32,
            "Zionga": 0
        }
    }
};