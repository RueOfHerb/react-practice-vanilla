import type { Pokemon } from "../../types/pokemon";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./pokemonList.css";

interface PokemonListProps {
  pokemon: Pokemon[];
  loading: boolean;
}

const PokemonList = ({ pokemon, loading }: PokemonListProps) => {
  return (
    <div id="pokemon-list">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PokemonList;
