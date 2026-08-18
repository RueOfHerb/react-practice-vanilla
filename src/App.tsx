import { useEffect, useState } from 'react'
import type { Pokemon } from './types/Pokemon/pokemon'
import './App.css'
// import Button from './components/Button/Button';
import PokemonCard from './components/PokemonCard/PokemonCard';

function App() {

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {

    let ignored = false;

    const fetchPokemon = async () => {
      setLoading(true);
      try {

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        //for each pokemon in data.results, fetch the pokemon data from the url and add it to the pokemon state
        const detailPromises = (data.results as { name: string; url: string }[]).map(
          async (pokeRoot) => {
            const detailRes = await fetch(pokeRoot.url);
            const detail = await detailRes.json();
            return {
              id: detail.id,
              name: detail.name,
              sprites: { front_default: detail.sprites.front_default },
              types: detail.types,
            };
          }
        );
        
        const allPokemon = await Promise.all(detailPromises);
        if (!ignored) {
          setPokemon(allPokemon);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();

    return () => {
      ignored = true;
    }
  }, []);


  return (
    <>
      <section id="pokedex-container">
        <div className="hero">
          <h1>Pokédex</h1>
          {/* <Button text="Fetch Pokemon" onClick={() => {}} /> */}
        </div>

        <div id="pokemon-list">
          {pokemon.map((poke) => (
            <PokemonCard key={poke.id} pokemon={poke} />
          ))}
          {loading && <p>Loading...</p>}
        </div>
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App
