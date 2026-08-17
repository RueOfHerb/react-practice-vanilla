import type { PokemonTypeNames } from "./pokemonTypes";

export interface Pokemon {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: PokemonTypeNames } }[];
}