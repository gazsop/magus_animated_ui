export const EFFECT = {
    TYPES: {
      DAMAGE: "dmg",
      HEAL: "heal",
      DOT: "dot",
      HOT: "hot",
      AURA: "aura"
    }
  }
  type TSpellEffectTypes = typeof EFFECT.TYPES[keyof typeof EFFECT.TYPES];
  
  interface ISpellEffect {
    type: TSpellEffectTypes,
    damage: number,
    cost: number,
    length: number
  }

export interface ISpell {
    name: string,
    text: string,
    effect: {
      level: number,
      scaling: ISpellEffect
    }[]
  }
