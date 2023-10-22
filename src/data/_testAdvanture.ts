
import { Adventure, Character } from '@appTypes/magus_app_types';
import { CustomDate } from "../utils/formatDate";

export const testAdventure: Adventure.IAdventure[] = [
    {
      id: 1,
      name: "teszt1. kaland",
      creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
      lastUpdate: CustomDate.formatDate("2020-02-02 01:02:03"),
      notes: [
        {
          id: 1,
          date: CustomDate.formatDate("2020-02-02 01:02:03"),
          sendBy: "Csicska",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 2,
          date: CustomDate.formatDate("2021-03-03 03:04:05"),
          sendBy: "Csicska2",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      character: {
        ownerId: "1",
        level: {
          current: 17,
          currentXp: 0,
          nextXp: 100,
        },
        race: Character.RACES.DWARF,
        class: Character.CLASSES.MAGE,
        primaryStats: [
          {
            name: Character.PRIMARY_STATS.AST,
            val: 16,
          },
          {
            name: Character.PRIMARY_STATS.BEA,
            val: 15,
          },
          {
            name: Character.PRIMARY_STATS.CON,
            val: 15,
          },
          {
            name: Character.PRIMARY_STATS.DEX,
            val: 17,
          },
          {
            name: Character.PRIMARY_STATS.HEA,
            val: 13,
          },
          {
            name: Character.PRIMARY_STATS.INT,
            val: 19,
          },
          {
            name: Character.PRIMARY_STATS.SPE,
            val: 9,
          },
          {
            name: Character.PRIMARY_STATS.STR,
            val: 13,
          },
          {
            name: Character.PRIMARY_STATS.WIP,
            val: 18,
          },
          {
            name: Character.PRIMARY_STATS.LUC,
            val: 10
          }
        ],
        secondaryStats: [
          {
            name: "Álcázás/Álruhaviselés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: 50,
          },
          {
            name: "Alkímia",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Állatismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Belharc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Birkózás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Célzás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Csapda és titkosajtó keresés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Csapdaállítás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Csomózás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Demonológia",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Drágakőmágia",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Élettan",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Emberismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Éneklés/Zenélés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Építészet",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Erdőjárás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Értékbecslés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Esés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Etikett",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Fegyverdobás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Fegyverhasználat",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Fegyverismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Fegyvertörés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Festészet,Rajzolás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Földharc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Futás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hadrend",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hadvezetés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hajózás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hamisítás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hamiskártyázás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hangutánzás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Harc helyhez kötve",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Harci láz",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hárítás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hasbeszélés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Hátbatámadás(Orvtámadás)",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Helyismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Heraldika",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Herbalizmus",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Idomítás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Időjóslás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Ikerharc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Írás/Olvasás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Jogismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Kétkezes harc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Kétkezes harc - Shien-Su",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Kiegészítő támadás, különleges fegyver",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Kínokozás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Kocsihajtás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Kocsmai Verekedés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Kötelekből szabadulás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Kötéltánc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Lábharc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Lefegyvezés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Legendaismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Lopózás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Lovaglás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Lovas íjászat",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Mágiahasználat",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Mágiaismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Mászás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Mechanika",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Mellébeszélés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Méregkeverés/Semlegesítés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Nehézvért viselet",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Nyelvismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Nyomolvasás/Eltüntetés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Ökölharc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Ősi nyelv ismerete",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Pajzs használat",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Pszi",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Pusztítás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Rejtőzés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Rúnamágia",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Sebgyógyítás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Semlegesítés/Működtetés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Szájról olvasás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Szakma",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Szexuális kultúra",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Tánc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Térképészet",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Történelemismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Ugrás/Akrobatika",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Úszás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Vadászat/Halászat",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Vakharc",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Vallásismeret",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Zárnyitás",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Zsebmetszés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
          {
            name: "Zsonglőrködés",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: Math.floor(Math.random() * 100),
          },
        ],
        rp: {
          name: "Gandalf",
          age: 100,
          skinColor: "fehér",
          hair: "hosszú",
          hairColor: "fehér",
          eye: {
            color: "kék",
            description: "nagy",
          },
          height: 180,
          weight: 80,
          description: "Gandalf desription",
          religion: "Gandalf religion",
          bornPlace: "Gandalf town",
          schools: ["Gandalf school"],
        },
        hm: {
          ATK: {
            base: 1,
            fromGear: 1,
            total: 2,
          },
          DEF: {
            base: 2,
            fromGear: 2,
            total: 4,
          },
          INI: {
            base: 3,
            fromGear: 3,
            total: 6,
          },
          AIM: {
            base: 4,
            fromGear: 4,
            total: 8,
          },
          hmPerLvl: 8
        },
        spells: [
          {
            id: "1",
            name: "Villám reflexek",
            description: `A harcművész +1 próbát tehet, hogy kitérjen egy támadás elől.(Passzív)`,
            levels: [
              {
              resourceData: {
                effect: Character.SPELL_COST_TYPE.ONCE,
                type: Character.RESOURCE_TYPE.MANA,
                costAmount: 1,
              },
              effect: {
                type: Character.SPELL_TYPE.AURA,
                damage: {
                  dice: Adventure.DICE.SIX,
                  nrOfDices: 1,
                  constant: 6
                },
                length: 0,
                range: 10
              }
            }],
            spec: "Anyád"
          }
        ],
      },
    },
    {
      id: 2,
      name: "teszt2. kaland",
      creationDate: CustomDate.formatDate("2021-04-15 12:30:45"),
      lastUpdate: CustomDate.formatDate("2021-04-15 12:30:45"),
      notes: [
        {
          id: 1,
          date: CustomDate.formatDate("2021-04-15 12:30:45"),
          sendBy: "User123",
          text: "This is a sample note for testing purposes."
        },
        {
          id: 2,
          date: CustomDate.formatDate("2021-05-20 14:45:30"),
          sendBy: "User456",
          text: "Another test note with some random content."
        }
      ],
      character: {
        ownerId: "2",
        level: {
          current: 5,
          currentXp: 20,
          nextXp: 50
        },
        race: Character.RACES.ELF,
        class: Character.CLASSES.WARRIOR,
        primaryStats: [
          {
            name: Character.PRIMARY_STATS.DEX,
            val: 15
          }
        ],
        secondaryStats: [
          {
            name: "Health",
            level: Character.SECONDARY_STAT_LEVEL.BASIC,
            skill: 25
          }
        ],
        rp: {
          name: "Legolas",
          age: 200,
          skinColor: "pale",
          hair: "blonde",
          hairColor: "golden",
          eye: {
            color: "blue",
            description: "sharp"
          },
          height: 185,
          weight: 70,
          description: "Legolas description",
          religion: "Elf religion",
          bornPlace: "Elven Kingdom",
          schools: ["Archery School"]
        },
        hm: {
          ATK: {
            base: 1,
            fromGear: 1,
            total: 2,
          },
          DEF: {
            base: 2,
            fromGear: 2,
            total: 4,
          },
          INI: {
            base: 3,
            fromGear: 3,
            total: 6,
          },
          AIM: {
            base: 4,
            fromGear: 4,
            total: 8,
          },
          hmPerLvl: 10
        },
        spells: [
          {
            id: "2",
            name: "Precision Shot",
            description: "Allows the archer to make precise shots with increased accuracy.",
            levels: [
              {
                resourceData: {
                  effect: Character.SPELL_COST_TYPE.ONCE,
                  type: Character.RESOURCE_TYPE.MANA,
                  costAmount: 2
                },
                effect: {
                  type: Character.SPELL_TYPE.DOT,
                  damage: {
                    dice: Adventure.DICE.TEN,
                    nrOfDices: 2,
                    constant: 0
                  },
                  length: 0,
                  range: 50
                }
              }
            ],
            spec: "Archery"
          }
        ]
      }
    }
  ];