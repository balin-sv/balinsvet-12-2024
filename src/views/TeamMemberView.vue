<template>
  <MainLayout>
    <AppNavbar>
      Detalles de Pokémon
      <template #button>
        <AppNavbarBtn link="/team">Ver Equipo</AppNavbarBtn>
      </template>
    </AppNavbar>

    <LoadingOverlay v-if="!pokemon" />

    <div
      class="container mx-auto mt-6 flex flex-col lg:flex-row gap-8 items-stretch"
    >
      <PokemonDetailCard v-if="pokemon" :pokemon="pokemon" />
      <div
        v-if="pokemon?.stats"
        class="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg border-4 border-yellow-500 flex items-end"
      >
        <div class="w-full">
          <StatsChart :stats="pokemon.stats" :height="450" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import StatsChart from '@/components/StatsChart.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import MainLayout from '@/components/MainLayout.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import AppNavbarBtn from '@/components/AppNavbarBtn.vue'
import PokemonDetailCard from '@/components/PokemonDetailCard.vue'
import { EvolutionStage, Pokemon } from '@/types'

const pokemon = ref<Pokemon | null>(null)
const route = useRoute()
const pokemonId = route.params.id

const fetchPokemonDetails = async (id: number) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const speciesResponse = await axios.get(response.data.species.url)
    const speciesData = speciesResponse.data

    const flavorText = speciesData.flavor_text_entries.find(
      (entry: { language: { name: string } }) => entry.language.name === 'es',
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

onMounted(() => {
  fetchPokemonDetails(Number(pokemonId))
})
</script>
