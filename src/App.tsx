import { useDeferredValue, useMemo, useState } from "react";
import "./App.css";
import { usePokemonList } from "./hooks/usePokemonList";
import PokemonList from "./components/PokemonList/PokemonList";
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  const { pokemon, loading } = usePokemonList(151);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    const query = deferredSearch.toLowerCase();
    return pokemon.filter((poke) => poke.name.includes(query));
  }, [pokemon, deferredSearch]);

  return (
    <>
      <section id="pokedex-container">
        <div className="hero">
          <h1>Pokédex</h1>
        </div>

        <SearchInput value={search} onChange={setSearch} />
        <PokemonList pokemon={filtered} loading={loading} />
      </section>

      <section id="spacer"></section>
    </>
  );
}

export default App;
