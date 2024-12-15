import { defineStore } from "pinia";
import axios from "axios";
import { PokemonTeam } from "@/types"; 

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [] as PokemonTeam,
    teamLimit: null as number | null, 
  }),
  actions: {
    async fetchPokemons() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=151`
        );
        const results = response.data.results;

        const pokemonsWithDetails = await this.fetchPokemonsWithDetails(results);
        this.pokemons.push(...pokemonsWithDetails);
      } catch (error) {
        console.error("Error get pokemons:", error);
      }
    },


    async fetchPokemonsWithDetails(results: { name: string; url: string }[]) {
  try {
    const pokemonsWithDetails = await Promise.all(
      results.map(async (pokemon: { name: string; url: string }, index: number) => {
        const details = await axios.get(pokemon.url);
        return {
          id: index + 1, 
          name: pokemon.name,
          url: pokemon.url,
          image: details.data.sprites.front_default, 
          types: details.data.types,
          stats: details.data.stats,
          cry: details.data.cries,
          isInTeam: false, 
        };
      })
    );
    return pokemonsWithDetails;
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    return [];
  }
},


    addToTeam(id: number) {
      const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);
      if (pokemon) {
        pokemon.isInTeam = true;
      }
    },
    
    deleteFromTeam(id: number) {
      const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);
      if (pokemon) {
        pokemon.isInTeam = false;
      }
    }
  },
  getters: {
    getTeam(): Array<{ id: number; name: string; url: string; image: string; isInTeam: boolean }> {
      return this.pokemons.filter((pokemon) => pokemon.isInTeam);
    },
   
  },
});

