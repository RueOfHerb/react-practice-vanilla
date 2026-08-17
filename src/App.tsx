import { useState } from 'react'
import type { Pokemon } from './types/Pokemon/pokemon'
import './App.css'
import Button from './components/Button/Button';
import PokemonCard from './components/PokemonCard/PokemonCard';

const bulbasaur: Pokemon = {
      name: "bulbasaur",
      sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }]
    };

function App() {

  // Deliberately using the same Pokemon for testing purposes. In a real application, you would fetch different Pokemon data from an API or a database.
  const [pokemon, ] = useState<Pokemon[]>([bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur, bulbasaur]);

  return (
    <>
      <section id="pokedex-container">
        <div className="hero">
          <h1>Pokédex</h1>
          <Button text="Fetch Pokemon" onClick={() => {}} />
        </div>

        <div id="pokemon-list">
          {pokemon.map((poke, index) => (
            <PokemonCard key={index+1} pokemon={poke} />
          ))}
        </div>
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App
