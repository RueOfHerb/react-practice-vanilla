export const fetchPokemonList = async (limit: number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
}

export const fetchPokemonDetails = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      sprites: { front_default: data.sprites.front_default },
      types: data.types,
    };
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    throw error;
  }
}

export const fetchPokemonByName = async (name: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon with name ${name}:`, error);
    throw error;
  }
}

export const fetchPokemonByType = async (type: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon by type ${type}:`, error);
    throw error;
  }
}

/**
 * The /type endpoint nests each entry as { pokemon: { name, url }, slot } and
 * returns every generation, so pull the url out and keep only ids <= maxId.
 */
export const getTypeMemberUrls = (
  typeData: { pokemon: { pokemon: { name: string; url: string } }[] },
  maxId: number
): string[] => {
  const allUrls = typeData.pokemon.map((entry) => entry.pokemon.url);

  const gen1Urls = allUrls.filter((url) => {
    const match = url.match(/\/pokemon\/(\d+)\//);

    if (match === null) {
      return false;
    }

    const id = Number(match[1]);
    return id <= maxId;
  });

  return gen1Urls;
}
