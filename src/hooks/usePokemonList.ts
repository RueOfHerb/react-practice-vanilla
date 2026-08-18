import { useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon";
import { fetchPokemonDetails, fetchPokemonList } from "../lib/api/pokeApi";

/**
 * Fetches the first `limit` Pokemon along with each one's detail
 * (sprite, types, id). Detail requests run in parallel.
 */
export function usePokemonList(limit: number) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignored = false;

    const loadPokemon = async () => {
      setLoading(true);
      try {
        const list = await fetchPokemonList(limit);

        const detailPromises = (
          list.results as { name: string; url: string }[]
        ).map((entry) => fetchPokemonDetails(entry.url));

        const allPokemon = await Promise.all(detailPromises);
        if (!ignored) {
          setPokemon(allPokemon);
        }
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        if (!ignored) {
          setLoading(false);
        }
      }
    };

    loadPokemon();

    return () => {
      ignored = true;
    };
  }, [limit]);

  return { pokemon, loading };
}
