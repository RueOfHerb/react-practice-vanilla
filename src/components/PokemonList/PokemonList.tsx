import type { Pokemon } from "../../types/pokemon";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./pokemonList.css";

interface PokemonListProps {
  pokemon: Pokemon[];
  loading: boolean;
  isPending?: boolean;
  onClick: (pokemon: Pokemon) => void;
}

const PokemonList = ({ pokemon, loading, isPending = false, onClick }: PokemonListProps) => {
  return (
    <div id="pokemon-list" className={isPending ? "is-pending" : undefined}>
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} onClick={onClick} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PokemonList;
