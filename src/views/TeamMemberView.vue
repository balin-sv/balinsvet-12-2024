<template>
  <div
    class="min-h-screen bg-gradient-to-b from-black to-yellow-500 py-6 text-white flex flex-col"
  >
    <div
      class="sticky top-0 z-10 bg-black bg-opacity-80 py-4 px-6 flex justify-between items-center shadow-md"
    >
      <h1
        class="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-700 animate-gradient"
      >
        Detalles de Pokemon
      </h1>

      <router-link
        to="/team"
        class="px-4 py-2 bg-yellow-600 text-black font-bold rounded-full hover:bg-yellow-500 transition duration-300"
      >
        Ver Equipo
      </router-link>
    </div>

    <div class="flex-grow overflow-hidden mb-16">
      <div
        class="container mx-auto grid grid-cols-1 gap-6 min-h-[400px] mt-10 px-2"
      >
        <div v-if="pokemon" class="bg-gray-800 p-4 rounded-lg shadow-md">
          <img
            :src="pokemon.sprites.front_default"
            :alt="pokemon.name"
            class="w-40 h-40 mx-auto mb-4"
          />
          <h2
            class="text-2xl font-semibold capitalize text-yellow-300 text-center"
          >
            {{ pokemon.name }}
          </h2>
          <p class="text-sm capitalize text-gray-300 text-center">
            Tipos: {{ pokemon.types.map((type) => type.type.name).join(", ") }}
          </p>
          <ul class="mt-4 text-center">
            <li
              v-for="stat in pokemon.stats"
              :key="stat.stat.name"
              class="text-sm text-gray-400"
            >
              {{ stat.stat.name }}: {{ stat.base_stat }}
            </li>
          </ul>
          <button
            @click="playCry"
            class="mt-4 px-4 py-2 bg-yellow-600 text-black rounded-full hover:bg-yellow-500 transition"
          >
            Escuchar grito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const pokemonId = route.params.id;

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  cries: {
    latest: string;
  };
}

const pokemon = ref<Pokemon | null>(null);

const fetchPokemonDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}/`,
    );
    console.log(response.data);
    pokemon.value = response.data;
  } catch (error) {
    console.error("Error", error);
  }
};

const playCry = () => {
  if (pokemon.value) {
    const audio = new Audio(pokemon.value.cries.latest);
    audio.play();
  }
};

onMounted(() => {
  fetchPokemonDetails(pokemonId);
});
</script>
