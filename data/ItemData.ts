interface ItemMap {
    [index: string]: ItemData;
}

interface ItemData {
    name?: string;
    description?: string;
    type?: string;
    skillCard?: boolean
}

const itemMap: ItemMap = {
    "Agidyne": {
        "skillCard": true,
    },
    "Agilao": {
        "skillCard": true,
    },
    "Agneyastra": {
        "skillCard": true,
    },
    "Amrita Drop": {
        "skillCard": true,
    },
    "Angelic Grace": {
        "skillCard": true,
    },
    "Archangel Bra": {
        "type": "Protector - Women only",
        "description": "Def 200 / Ev 18 / +Reduce Elec dmg (high)"
    },
    "Arms Master": {
        "skillCard": true
    },
    "Arsène's Cane": {
        "type": "Weapon - Joker only",
        "description": "Atk 130 / Acc 92 / +Random ailment (low)",
    },
    "Auto-Mataru": {
        "skillCard": true
    },
    "Bad Beat": {
        "skillCard": true
    },
    "Baisudi": {
        "skillCard": true
    },
    "Bear Gloves": {
        "type": "Weapon - Makoto only",
        "description": "Atk 200 / Acc 90 / +Critical rate up (med)"
    },
    "Black Headband": {
        "type": "Accessory",
        "description": "+40 SP"
    },
    "Black Jacket": {
        "type": "Protector - Men only",
        "description": "Def 120 / Ev 12 / Prevents insta-kill from Curse"
    },
    "Black Moon": {
        "type": "Accessory",
        "description": "+Critical rate up (high)"
        
    },
    "Black Wing Robe": {
        "type": "Protector - Unisex",
        "description": "Def 220 / Ev 20 / +Reduce Nuke dmg (med)"
    },
    "Bloodbath": {
        "skillCard": true
    },
    "Brain Shake": {
        "skillCard": true
    },
    "Brain Shot": {
        "type": "Gun - Ann only",
        "description" : "Atk 140 / Acc 84 / Rounds 12 / +Brainwash (med)"
    },
    "Brave Blade": {
        "skillCard": true
    },
    "Bufu": {
        "skillCard": true
    },
    "Burn Boost": {
        "skillCard": true
    },
    "Catnap": {
        "type": "Gun - Morgana only",
        "description": "Atk 168 / Acc 90 / Rounds 5 / +Sleep (med)" 
    },
    "Charge": {
        "skillCard": true
    },
    "Claiomh Solais - Sable": {
        "type": "Weapon - Morgana only",
        "description": "Atk 280 / Acc 90 / +50 SP"
    },
    "Cleave": {
        "skillCard": true
    },
    "Concentrate": {
        "skillCard": true
    },
    "Confuse Boost": {
        "skillCard": true
    },
    "Counter": {
        "skillCard": true
    },
    "Crystal Skull": {
        "type": "Accessory",
        "description": "All stats +5 / Evade Magic (high)"
    },
    "Daffodils": {
        "type": "Accessory",
        "description": "+Null Despair"
    },
    "Darkness Ring": {
        "type": "Accessory",
        "description": "+Evade Curse (high)"
    },
    "Dazzler": {
        "skillCard": true
    },
    "Deadly Fury": {
        "skillCard": true
    },
    "Death Contract": {
        "type": "Weapon - Haru only",
        "description": "Atk 140 / Acc 86 / +Despair (low)"
    },
    "Deathbound": {
        "skillCard": true
    },
    "Debilitate": {
        "skillCard": true
    },
    "Dekaja": {
        "skillCard": true
    },
    "Dekunda": {
        "skillCard": true
    },
    "Despair Boost": {
        "skillCard": true
    },
    "Dia": {
        "skillCard": true
    },
    "Diarahan": {
        "skillCard": true
    },
    "Diarama": {
        "skillCard": true
    },
    "Divine Grace": {
        "skillCard": true
    },
    "Dormin Rush": {
        "skillCard": true
    },
    "Dream Needle": {
        "skillCard": true
    },
    "Eigaon": {
        "skillCard": true
    },
    "Elec Amp": {
        "skillCard": true
    },
    "Elec Boost": {
        "skillCard": true
    },
    "Emperor's Amulet": {
        "type": "Accessory",
        "description": "En +5 / +Auto-Tarukaja"
    },
    "Endure": {
        "skillCard": true
    },
    "Enduring Soul": {
        "skillCard": true
    },
    "Energy Drop": {
        "skillCard": true
    },
    "Fast Heal": {
        "skillCard": true
    },
    "Fear Boost": {
        "skillCard": true
    },
    "Fire Amp": {
        "skillCard": true
    },
    "Fire Boost": {
        "skillCard": true
    },
    "Flash Bomb": {
        "skillCard": true
    },
    "Fleur du Mal": {
        "type": "Weapon - Haru only",
        "description": "Atk 308 / Acc 86 / Ma +5 / +Dizzy (high)"
        
    },
    "Forget Boost": {
        "skillCard": true
    },
    "Foul Breath": {
        "skillCard": true
    },
    "Freeze Boost": {
        "skillCard": true
    },
    "Freila": {
        "skillCard": true
    },
    "Frost Hood": {
        "type": "Protector - Morgana only",
        "description": "Def 130 / Ev 20 / +20 SP"
    },
    "Garu": {
        "skillCard": true
    },
    "Garudyne": {
        "skillCard": true
    },
    "Garula": {
        "skillCard": true
    },
    "Giant Slice": {
        "skillCard": true
    },
    "Gigantomachia": {
        "skillCard": true
    },
    "God's Hand": {
        "skillCard": true
    },
    "Growth 1": {
        "skillCard": true
    },
    "Growth 2": {
        "skillCard": true
    },
    "Growth 3": {
        "skillCard": true
    },
    "Hades Harp": {
        "type": "Accessory",
        "description": "Ag +3 / +Null Brainwash"
    },
    "Headbutt": {
        "skillCard": true
    },
    "Headhunter Ladle": {
        "type": "Weapon - Morgana only",
        "description": "Atk 128 / Acc 90 / +Critical rate up (low)"
    },
    "Heat Riser": {
        "skillCard": true
    },
    "Heaven's Gate": {
        "type": "Gun - Yusuke only",
        "description": "Atk 378 / Acc 88 / Rounds 12 / Ag +10"
    },
    "Hope Diamond": {
        "type": "Accessory",
        "description": "All stats +3 / Regenerate 3"
    },
    "Hua Khon": {
        "type": "Accessory",
        "description": "Prevents insta-kill from Bless"
    },
    "Ice Boost": {
        "skillCard": true
    },
    "Ice Break": {
        "skillCard": true
    },
    "Insta-Heal": {
        "skillCard": true
    },
    "Invigorate 1": {
        "skillCard": true
    },
    "Invigorate 2": {
        "skillCard": true
    },
    "Invigorate 3": {
        "skillCard": true
    },
    "Judge of the Dead": {
        "type": "Gun - Makoto only",
        "description": "Atk 380 / Acc 92 / Rounds 6 / All stats +10"
    },
    "Khamrai Tao": {
        "type": "Accessory",
        "description": "+Reduce Fire dmg (high)"
    },
    "King Frost Cape": {
        "type": "Protector - Unisex",
        "description": "Def 140 / Ev 16 / +Reduce Ice dmg (high)"
    },
    "Koh-i-Noor": {
        "type": "Accessory",
        "description": "All stats +2 / +Bless"
    },
    "Kougaon": {
        "skillCard": true
    },
    "Kuzuryu Gouhou": {
        "type": "Gun - Yusuke only",
        "description": "Atk 300 / Acc 88 / Rounds 9 / +Random ailment (low)"
    },
    "Legion's Jail": {
        "type": "Accessory",
        "description": "+Null Fear"
    },
    "Life Aid": {
        "skillCard": true
    },
    "Lucifer Guard": {
        "type": "Protector - Unisex",
        "description": "Def 250 / Ev 10 / +Reduce Magic dmg (high)"
    },
    "Lucky Punch": {
        "skillCard": true
    },
    "Lullaby": {
        "skillCard": true
    },
    "Mabufu": {
        "skillCard": true
    },
    "Mabufudyne": {
        "skillCard": true
    },
    "Mabufula": {
        "skillCard": true
    },
    "Maeiga": {
        "skillCard": true
    },
    "Maeigaon": {
        "skillCard": true
    },
    "Maeiha": {
        "skillCard": true
    },
    "Mafrei": {
        "skillCard": true
    },
    "Mafreidyne": {
        "skillCard": true
    },
    "Magaru": {
        "skillCard": true
    },
    "Mahamaon": {
        "skillCard": true
    },
    "Makajama": {
        "skillCard": true
    },
    "Makarakarn": {
        "skillCard": true
    },
    "Makouga": {
        "skillCard": true
    },
    "Makougaon": {
        "skillCard": true
    },
    "Makouha": {
        "skillCard": true
    },
    "Mamudoon": {
        "skillCard": true
    },
    "Mapsio": {
        "skillCard": true
    },
    "Maragi": {
        "skillCard": true
    },
    "Maragidyne": {
        "skillCard": true
    },
    "Maragion": {
        "skillCard": true
    },
    "Marakunda": {
        "skillCard": true
    },
    "Masquerade Ribbon": {
        "type": "Weapon - Ann only",
        "description": "Atk 172 / Acc 88 / +Dizzy (low)"
    },
    "Masukukaja": {
        "skillCard": true
    },
    "Masukunda": {
        "skillCard": true
    },
    "Matarukaja": {
        "skillCard": true
    },
    "Mazio": {
        "skillCard": true
    },
    "Mazionga": {
        "skillCard": true
    },
    "Me Patra": {
        "skillCard": true
    },
    "Mediarahan": {
        "skillCard": true
    },
    "Mediarama": {
        "skillCard": true
    },
    "Megido Fire": {
        "type": "Gun - Ryuji only",
        "description": "Atk 380 / Acc 98 / Rounds 3 / +Critical rate up (low)"
    },
    "Megidola": {
        "skillCard": true
    },
    "Memory Blow": {
        "skillCard": true
    },
    "Mind Slice": {
        "skillCard": true
    },
    "Miracle Punch": {
        "skillCard": true
    },
    "Mirrirmina": {
        "type": "Gun - Makoto only",
        "description": "Atk 200 / Acc 92 / Rounds 6 / Ma +5"
    },
    "Mjolnir": {
        "type": "Weapon - Ryuji only",
        "description": "Atk 254 / Acc 88 / +Elec attacks"
    },
    "Moonlight Robe": {
        "type": "Protector - Women only",
        "description": "Def 30 / Ev 30 / +Repel Phys (high)"
    },
    "Myriad Slashes": {
        "skillCard": true
    },
    "Naraka Whip": {
        "type": "Weapon - Ann only",
        "description": "Atk 252 / Acc 90 / +Freeze (high)"
    },
    "Nataraja": {
        "type": "Gun - Joker only",
        "description": "Atk 360 / Acc 94 / Rounds 8 / All stats +5"
    },
    "Nuke Amp": {
        "skillCard": true
    },
    "Nuke Boost": {
        "skillCard": true
    },
    "Official's Robe": {
        "type": "Protector - Men only",
        "description": "Def 178 / Ev 18 / +Evade Curse (high)"
    },
    "One-shot Kill": {
        "skillCard": true
    },
    "Oni-Kagura": {
        "skillCard": true
    },
    "Orlov": {
        "type": "Accessory",
        "description": "Ma +3 / +Repel Phys (high)"
    },
    "Paradise Lost": {
        "type": "Weapon - Joker only",
        "description": "Atk 290 / Acc 92 / +Reduce Curse dmg (high)"
    },
    "Patra": {
        "skillCard": true
    },
    "Pawzooka": {
        "type": "Gun - Haru only",
        "description": "Atk 140 / Acc 89 / Rounds 1 / +Confuse (med)"
    },
    "Petra Genetrix": {
        "type": "Accessory",
        "description": "+Null Burn"
    },
    "Psiodyne": {
        "skillCard": true
    },
    "Psy Break": {
        "skillCard": true
    },
    "Pumpkin Bomb": {
        "type": "Gun - Ryuji only",
        "description": "Atk 160 / Acc 82 / Rounds 3 / +Burn (med)"
    },
    "Queen's Necklace": {
        "type": "Accessory",
        "description": "All stats +1 / +30 SP"
    },
    "Rage Boost": {
        "skillCard": true
    },
    "Rakukaja": {
        "skillCard": true
    },
    "Rampage": {
        "skillCard": true
    },
    "Recarm": {
        "skillCard": true
    },
    "Red Yarn Ball": {
        "type": "Accessory",
        "description": "Lu +10 / +Auto-Tarukaja"
    },
    "Regenerate 1": {
        "skillCard": true
    },
    "Regenerate 2": {
        "skillCard": true
    },
    "Regenerate 3": {
        "skillCard": true
    },
    "Regent": {
        "type": "Accessory",
        "description": "Str +3 / +Critical rate up (med)"
    },
    "Riot Gun": {
        "skillCard": true
    },
    "Ruyi Jingu Bang": {
        "type": "Weapon - Ryuji only",
        "description": "Atk 256 / Acc 88 / +Auto-Tarukaja"
    },
    "Sabazios": {
        "type": "Weapon - Makoto only",
        "description": "Atk 280 / Acc 90 / +Critical rate up (high)"
    },
    "Salvation": {
        "skillCard": true
    },
    "Samarecarm": {
        "skillCard": true
    },
    "Senryou Yakusha": {
        "type": "Weapon - Yusuke only",
        "description": "Atk 160 / Acc 90 / St +5"
    },
    "Shackles": {
        "type": "Accessory",
        "description": "+Null Rage"
    },
    "Sharp Student": {
        "skillCard": true
    },
    "Shock Boost": {
        "skillCard": true
    },
    "Silk Dress": {
        "type": "Protector - Women only",
        "description": "Def 60 / Ev 10 / +Evade Magic (low)"
    },
    "Skull Cracker": {
        "skillCard": true
    },
    "Sledgehammer": {
        "skillCard": true
    },
    "Sleep Boost": {
        "skillCard": true
    },
    "Snow Queen's Whip": {
        "type": "Weapon - Ann only",
        "description": "Atk 210 / Acc 90 / +Auto-Sukukaja"
    },
    "Spell Master": {
        "skillCard": true
    },
    "Spirit Drain": {
        "skillCard": true
    },
    "Stagnant Air": {
        "skillCard": true
    },
    "Stone of Scone": {
        "type": "Accessory",
        "description": "En +3 / +Reduce Phys dmg (low)"
    },
    "Sudarshana": {
        "type": "Gun - Morgana only",
        "description": "Atk 308 / Acc 98 / Rounds 5 / +Random ailment (low)"
    },
    "Swift Strike": {
        "skillCard": true
    },
    "Tantric Oath": {
        "type": "Protector - Men only",
        "description": "Def 272 / Ev 18 / +Reduce Magic dmg (high)"
    },
    "Tapsuan": {
        "type": "Protector - Women only",
        "description": "Def 160 / Ev 12 / +Evade Wind (high)"
    },
    "Tarukaja": {
        "skillCard": true
    },
    "Tempest Slash": {
        "skillCard": true
    },
    "Terror Claw": {
        "skillCard": true
    },
    "Tetraja": {
        "skillCard": true
    },
    "Thermopylae": {
        "skillCard": true
    },
    "Thunder Band": {
        "type": "Accessory",
        "description": "+Null Shock"
    },
    "Thunder Horns": {
        "type": "Accessory",
        "description": "En +10 / +Fire attacks"
    },
    "Triple Down": {
        "skillCard": true
    },
    "Tyrant Pistol": {
        "type": "Gun - Joker only",
        "description": "Atk 390 / Acc 98 / Rounds 8 / Ma +10"
    },
    "Unshaken Will": {
        "skillCard": true
    },
    "Usumidori": {
        "type": "Weapon - Yusuke only",
        "description": "Atk 292 / Acc 88 / +Fear (high)"
    },
    "Vajra": {
        "type": "Weapon - Makoto only",
        "description": "Atk 272 / Acc 90 / +Random ailment (high)"
    },
    "Vicious Strike": {
        "skillCard": true
    },
    "Vorpal Blade": {
        "skillCard": true
    },
    "White Headband": {
        "type": "Accessory",
        "description": "+50 HP"
    },
    "Wild Hunt": {
        "type": "Gun - Ann only",
        "description": "Atk 386 / Acc 84 / +Despair (med)"
    },
    "Wind Amp": {
        "skillCard": true
    },
    "Wind Boost": {
        "skillCard": true
    },
    "Wind Wall": {
        "skillCard": true
    },
    "Yagrush": {
        "type": "Gun - Haru only",
        "description": "Atk 330 / Acc 80 / Rounds 1 / +Shock (med)"
    },
    "Zio": {
        "skillCard": true
    },
    "Ziodyne": {
        "skillCard": true
    },
    "Zionga": {
        "skillCard": true
    }
};