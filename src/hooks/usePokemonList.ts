import { useCallback, useEffect, useRef, useState } from "react";
import type { Pokemon } from "../types/pokemon";
import type { PokemonTypeNames } from "../types/pokemonTypes";
import {
  fetchPokemonByType,
  fetchPokemonDetails,
  fetchPokemonList,
  getTypeMemberUrls,
} from "../lib/api/pokeApi";

/**
 * Owns the Pokemon collection.
 *
 * The initial load runs in an effect because it synchronizes with the network
 * on mount with no user action behind it. Type filtering is exposed as
 * `loadByType` instead, so the caller can await it inside a transition and get
 * a meaningful isPending. See the note in App.tsx.
 */
export function usePokemonList(limit: number) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  // Incremented on every load.
  const requestIdRef = useRef(0);

  const loadByType = useCallback(
    async (type: PokemonTypeNames | null) => {
      requestIdRef.current = requestIdRef.current + 1;
      const requestId = requestIdRef.current;

      setLoading(true);
      try {
        let urls: string[];

        if (type === null) {
          const list = await fetchPokemonList(limit);
          urls = (list.results as { url: string }[]).map((entry) => entry.url);
        } else {
          const typeData = await fetchPokemonByType(type);
          urls = getTypeMemberUrls(typeData, limit);
        }

        const detailPromises = urls.map((url) => fetchPokemonDetails(url));
        const results = await Promise.all(detailPromises);

        if (requestId === requestIdRef.current) {
          setPokemon(results);
        }
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [limit]
  );

  useEffect(() => {
    const loadInitial = async () => {
      await loadByType(null);
    };
    loadInitial();
  }, [loadByType]);

  return { pokemon, loading, loadByType };
}
