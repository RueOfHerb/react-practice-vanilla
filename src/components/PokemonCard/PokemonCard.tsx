import type { Pokemon } from "../../types/Pokemon/pokemon";
import TypeTag from "../TypeTag/TypeTag";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="pokemon-card">
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {pokemon.types.map((typeTag, index) => (
        <TypeTag key={index} type={typeTag.type.name} />
      ))}
    </div>
  );
};

export default PokemonCard;
