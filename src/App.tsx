import { useDeferredValue, useMemo, useState, useTransition } from "react";
import "./App.css";
import { usePokemonList } from "./hooks/usePokemonList";
import type { PokemonTypeNames } from "./types/pokemonTypes";
import PokemonList from "./components/PokemonList/PokemonList";
import SearchInput from "./components/SearchInput/SearchInput";
import SearchType from "./components/SearchType/SearchType";

function App() {
  const { pokemon, loading, loadByType } = usePokemonList(151);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonTypeNames | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  // deferredSearch lags behind search while React is busy, so the input stays
  // responsive even when re-filtering the list is slow.
  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    const query = deferredSearch.toLowerCase();
    return pokemon.filter((poke) => poke.name.includes(query));
  }, [pokemon, deferredSearch]);

  const handleTypeChange = (type: PokemonTypeNames | null) => {
    // The radio updates urgently so the click registers instantly.
    setSelectedType(type);
    startTransition(async () => {
      await loadByType(type);
    });
  };

  return (
    <>
      <section id="pokedex-container">
        <div className="hero">
          <h1>Pokédex</h1>
        </div>

        <SearchInput value={search} onChange={setSearch} />
        <SearchType
          value={selectedType}
          onChange={handleTypeChange}
          disabled={isPending}
        />
        <PokemonList
          pokemon={filtered}
          loading={loading}
          isPending={isPending}
        />
      </section>

      <section id="spacer"></section>
    </>
  );
}

export default App;
