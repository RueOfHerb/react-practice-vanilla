// Runtime array is the single source of truth. The union type below is derived
// from it, so adding a type here updates PokemonTypeNames automatically.
export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type PokemonTypeNames = (typeof POKEMON_TYPES)[number];
