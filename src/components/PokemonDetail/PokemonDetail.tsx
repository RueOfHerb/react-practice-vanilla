import type { Pokemon } from "../../types/pokemon";

interface PokemonDetailProps {
  pokemon: Pokemon
}

const PokemonDetail = ({pokemon}: PokemonDetailProps) => {
  return (
    <>{pokemon.name}</>
  )
}

export default PokemonDetail;