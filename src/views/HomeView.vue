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
        Pokemon
      </h1>

      <router-link
        to="/team"
        class="px-4 py-2 bg-yellow-600 text-black font-bold rounded-full hover:bg-yellow-500 transition duration-300"
      >
        Ver equipo
      </router-link>
    </div>

    <div class="flex-grow overflow-hidden mb-16">
      <div
        class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 min-h-[400px] mt-10 px-2"
      >
        <div
          v-for="pokemon in paginatedPokemons"
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
          <div class="pb-5 text-center">
            <h2
              class="text-lg font-semibold capitalize text-yellow-300 text-center mb-5"
            >
              {{ pokemon.name }}
            </h2>
            <button
              v-if="!pokemon.isInTeam"
              @click="addPokemonToTeam(pokemon.id)"
              class="f space-x-2 px-4 py-2 bg-yellow-600 text-black font-semibold text-sm rounded-full hover:bg-yellow-500 transition duration-300 shadow-md w-32"
            >
              <i class="fas fa-user-plus"></i>
              <span>Añadir</span>
            </button>

            <button
              v-else
              @click="deletePokemonFromTeam(pokemon.id)"
              class="space-x-2 px-4 py-2 bg-red-700 text-white font-semibold text-sm rounded-full hover:bg-red-600 transition duration-300 shadow-md w-32"
            >
              <i class="fas fa-trash-alt"></i>
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="fixed bottom-0 left-0 w-full bg-black py-4 flex justify-center items-center space-x-4"
    >
      <button
        @click="prevPage"
        :disabled="!pokemons || pokemons.length === 0 || currentPage === 1"
        class="px-4 py-2 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 disabled:opacity-50 transition duration-300"
      >
        ◀
      </button>
      <span class="text-lg font-extrabold text-yellow-300 drop-shadow-lg">
        Página {{ currentPage }} de {{ maxPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="
          !pokemons || pokemons.length === 0 || currentPage === maxPages
        "
        class="px-4 py-2 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 disabled:opacity-50 transition duration-300"
      >
        ▶
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { storeToRefs } from 'pinia'

const pokemonStore = usePokemonStore()
const { pokemons, teamLimit } = storeToRefs(pokemonStore)

const limit = 25
const currentPage = ref(1)
const maxPages = computed(() => Math.ceil(pokemons.value.length / limit))
const paginatedPokemons = computed(() => {
  const start = (currentPage.value - 1) * limit
  const end = start + limit
  return pokemons.value.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < maxPages.value) {
    currentPage.value++
  }
}

const addPokemonToTeam = (id: number) => {
  if (teamLimit.value === 6) {
    alert('No puedes tener más de 6 pokemons en tu equipo')
    return
  } else {
    teamLimit.value++
    pokemonStore.addToTeam(id)
  }
}

const deletePokemonFromTeam = (id: number) => {
  teamLimit.value--
  pokemonStore.deleteFromTeam(id)
}

onMounted(async () => {
  if (pokemons.value.length === 0) {
    await pokemonStore.fetchPokemons()
  }
  console.log(pokemons.value)
})
</script>
