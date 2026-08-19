import type { Pokemon } from "../../types/pokemon";
import TypeTag from "../TypeTag/TypeTag";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="pokemon-types">
        {pokemon.types.map((typeTag) => (
          <TypeTag key={pokemon.id + typeTag.type.name} type={typeTag.type.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
