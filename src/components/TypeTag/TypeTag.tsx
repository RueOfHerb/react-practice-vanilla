import type { PokemonTypeNames } from '../../types/Pokemon/pokemonTypes';
import './TypeTag.css';

type TypeTagProps = {
  type: PokemonTypeNames;
};

const TypeTag = ({ type }: TypeTagProps) => {
  return (
    <span className={`type-tag ${type}`}>{type}</span>
  );
}

export default TypeTag;