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
        Pokemon Team
      </h1>

      <router-link
        to="/"
        class="px-4 py-2 bg-yellow-600 text-black font-bold rounded-full hover:bg-yellow-500 transition duration-300"
      >
        Ver pokemons
      </router-link>
    </div>

    <div class="flex-grow overflow-hidden mb-16">
      <div
        class="container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px] mt-10 px-2"
      >
        <div
          v-for="pokemon in team"
          :key="pokemon.name"
          class="bg-gray-800 shadow-md rounded-lg overflow-hidden border-4 border-yellow-500 hover:scale-105 hover:shadow-xl transform transition duration-300"
        >
          <div class="overflow-hidden p-2">
            <img
              :src="pokemon.image"
              alt="Imagen de Pokemon"
              class="w-40 h-40 mx-auto object-fit transform hover:scale-110 transition duration-300"
            />
          </div>
          <div class="p-3 text-center">
            <h3 class="text-sm font-bold text-yellow-300 capitalize">
              {{ pokemon.name }}
            </h3>
            <button
              @click="deletePokemonFromTeam(pokemon.id)"
              class="mt-2 px-2 py-1 bg-red-600 text-black font-bold rounded-full hover:bg-red-500 transition duration-300"
            >
              Quitar del equipo
            </button>
            <button class="mt-2">
              <router-link
                :to="{ name: 'TeamMember', params: { id: pokemon.id } }"
                class="px-2 py-1 bg-yellow-600 text-black font-bold rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Ver detalles
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemonStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const pokemonStore = usePokemonStore();
const { teamLimit } = storeToRefs(pokemonStore);

const deletePokemonFromTeam = (id: number) => {
  teamLimit.value--;
  pokemonStore.deleteFromTeam(id);
};

const team = computed(() => pokemonStore.getTeam);
console.log(team.value);
</script>
