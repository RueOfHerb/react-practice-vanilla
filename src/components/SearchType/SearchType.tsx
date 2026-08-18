import { POKEMON_TYPES, type PokemonTypeNames } from "../../types/pokemonTypes";
import "./SearchType.css";

interface SearchTypeProps {
  value: PokemonTypeNames | null;
  onChange: (type: PokemonTypeNames | null) => void;
  disabled?: boolean;
}

const SearchType = ({ value, onChange, disabled = false }: SearchTypeProps) => {
  return (
    <fieldset className="search-type-container" disabled={disabled}>
      <legend className="search-type-legend">Filter by type</legend>

      <div className="type-options">
        <label className="type-option all" htmlFor="type-all">
          <input
            id="type-all"
            type="radio"
            name="pokemon-type"
            value=""
            checked={value === null}
            onChange={() => onChange(null)}
          />
          <span className="type-option-label">All</span>
        </label>

        {POKEMON_TYPES.map((type) => (
          <label className={`type-option ${type}`} htmlFor={`type-${type}`} key={type}>
            <input
              id={`type-${type}`}
              type="radio"
              name="pokemon-type"
              value={type}
              checked={value === type}
              onChange={() => onChange(type)}
            />
            <span className="type-option-label">{type}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default SearchType;
