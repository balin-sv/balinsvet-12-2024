import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [] as Array<{ name: string; url: string; image: string }>,
  }),
  actions: {
    async fetchPokemons() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=150`
        );
        const results = response.data.results;

        const pokemonsWithImages = await Promise.all(
          results.map(async (pokemon: { name: string; url: string }) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              url: pokemon.url,
              image: details.data.sprites.front_default, 
            };
          })
        );

        this.pokemons.push(...pokemonsWithImages);
      } catch (error) {
        console.error("Ошибка загрузки покемонов:", error);
      }
    },
  },
});

