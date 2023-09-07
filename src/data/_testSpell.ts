import { EFFECT, ISpell } from "../core/Spells";

export const testSpells: ISpell[] = [
    {
      name: "Villám reflexek",
      text: `A harcművész +1 próbát tehet, hogy kitérjen egy támadás elől.(Passzív)`,
      effect: [
        {
          level: 1,
          scaling: {
            type: EFFECT.TYPES.AURA,
            damage: 1,
            cost: 0,
            length: 0
          }
        },
        {
          level: 1,
          scaling: {
            type: EFFECT.TYPES.AURA,
            damage: 1,
            cost: 0,
            length: 0
          }
        }
      ]
    },
    {
      name: "Karok és lábak",
      text: `Karok és lábak: A harcművész képes erős ütéseket bevinni végtagjaival, ami darabonként K6-ot sebeznek. Ha mind a 4 támadás (2kar, 2láb) sikeres, a támadásokat újra próbálhatja ugyanabban a körben. (Passzív)`,
      effect: [
        {
          level: 1,
          scaling: {
            type: EFFECT.TYPES.AURA,
            damage: 1,
            cost: 0,
            length: 0
          }
        }
      ]
    },
    {
      name: "Karok és lábak",
      text: `A harcművész képes erős ütéseket bevinni végtagjaival, ami darabonként K6-ot sebeznek. Ha mind a 4 támadás (2kar, 2láb) sikeres, a támadásokat újra próbálhatja ugyanabban a körben. (Passzív)`,
      effect: [
        {
          level: 1,
          scaling: {
            type: EFFECT.TYPES.AURA,
            damage: 1,
            cost: 0,
            length: 0
          }
        }
      ]
    }
  ];