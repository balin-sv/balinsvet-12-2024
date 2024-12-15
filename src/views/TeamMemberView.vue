<template>
  <div
    class="min-h-screen bg-gradient-to-b from-black to-yellow-500 py-6 text-white flex flex-col items-center"
  >
    <div
      class="sticky top-0 z-10 bg-black bg-opacity-80 py-4 px-6 w-full flex justify-between items-center shadow-md"
    >
      <h1
        class="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-700 animate-gradient"
      >
        Detalles de Pokémon
      </h1>
      <router-link
        to="/team"
        class="px-4 py-2 bg-yellow-600 text-black font-bold rounded-full hover:bg-yellow-500 transition duration-300"
      >
        Ver Equipo
      </router-link>
    </div>

    <LoadingOverlay v-if="!pokemon" />

    <div
      class="container mx-auto mt-6 flex flex-col lg:flex-row gap-8 items-stretch"
    >
      <div
        v-if="pokemon"
        class="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg border-4 border-yellow-500 flex flex-col gap-6"
      >
        <div class="relative flex justify-center">
          <img
            :src="pokemon.sprites.front_default"
            :alt="pokemon.name"
            class="w-60 h-60 object-contain rounded-lg shadow-md"
          />
          <button
            @click="playCry(pokemon)"
            class="absolute top-2 right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition duration-300 shadow-md"
          >
            <i class="fas fa-volume-up text-black"></i>
          </button>
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-4xl font-bold capitalize text-yellow-300">
            {{ pokemon.name }}
          </h2>
          <p class="text-lg text-gray-300">
            <strong>Tipos:</strong>
            {{ pokemon.types.map((type) => type.type.name).join(', ') }}
          </p>
          <p class="text-lg text-gray-400">
            <strong>Altura:</strong> {{ pokemon.height / 10 }} m
          </p>
          <p class="text-lg text-gray-400">
            <strong>Peso:</strong> {{ pokemon.weight / 10 }} kg
          </p>
          <p class="text-lg text-gray-300 italic">
            "{{ pokemon.description }}"
          </p>
        </div>

        <div
          v-if="pokemon.evolutionChain?.length > 0"
          class="flex flex-col gap-4"
        >
          <h3 class="text-3xl text-yellow-300 font-bold">Cadena Evolutiva:</h3>
          <div class="flex gap-4 flex-wrap justify-center">
            <div
              v-for="stage in pokemon.evolutionChain"
              :key="stage.name"
              class="text-center"
            >
              <img
                :src="stage.image"
                :alt="stage.name"
                class="w-24 h-24 object-contain rounded-lg shadow-md"
              />
              <p class="capitalize mt-2 text-lg font-semibold text-gray-200">
                {{ stage.name }}
              </p>
            </div>
          </div>
        </div>

        <div v-else-if="pokemon" class="text-center text-gray-400">
          <p>No evolution chain available for this Pokémon.</p>
        </div>
      </div>
      <div
        v-if="pokemon?.stats"
        class="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg border-4 border-yellow-500 flex items-end"
      >
        <div class="w-full">
          <StatsChart :stats="pokemon.stats" :height="450" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import StatsChart from '@/components/StatsChart.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

interface EvolutionStage {
  name: string
  image: string
}

interface Pokemon {
  name: string
  sprites: { front_default: string }
  types: { type: { name: string } }[]
  cries: { latest: string }
  height: number
  weight: number
  description: string
  stats: { stat: { name: string }; base_stat: number }[]
  evolutionChain?: EvolutionStage[]
}

const pokemon = ref<Pokemon | null>(null)
const route = useRoute()
const pokemonId = route.params.id

const fetchPokemonDetails = async (id: number) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const speciesResponse = await axios.get(response.data.species.url)
    const speciesData = speciesResponse.data

    const flavorText = speciesData.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'es',
    )
    const description = flavorText
      ? flavorText.flavor_text.replace(/\n|\f/g, ' ')
      : ''

    pokemon.value = {
      ...response.data,
      description,
    }

    if (speciesData.evolution_chain) {
      await fetchEvolutionChain(speciesData.evolution_chain.url)
    }
  } catch (error) {
    console.error('Error fetching Pokémon details:', error)
  }
}

const fetchEvolutionChain = async (url: string) => {
  try {
    const response = await axios.get(url)
    const chainData = response.data.chain
    const evolutionStages: EvolutionStage[] = []
    let current = chainData

    while (current) {
      const speciesUrl = current.species.url
      const speciesResponse = await axios.get(
        speciesUrl.replace('pokemon-species', 'pokemon'),
      )
      evolutionStages.push({
        name: current.species.name,
        image: speciesResponse.data.sprites.front_default ?? '',
      })
      current = current.evolves_to[0]
    }

    if (pokemon.value) {
      pokemon.value.evolutionChain = evolutionStages
    }
  } catch (error) {
    console.error('Error fetching evolution chain:', error)
  }
}

const playCry = (pokemon: Pokemon | null) => {
  if (pokemon?.cries.latest) {
    const audio = new Audio(pokemon.cries.latest)
    audio.play()
  }
}

onMounted(() => {
  fetchPokemonDetails(Number(pokemonId))
})
</script>
