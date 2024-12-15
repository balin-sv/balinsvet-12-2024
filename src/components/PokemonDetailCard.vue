<template>
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
        @click="playCry"
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
      <p class="text-lg text-gray-300 italic">"{{ pokemon.description }}"</p>
    </div>

    <div v-if="pokemon.evolutionChain?.length > 0" class="flex flex-col gap-4">
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

    <div v-else class="text-center text-gray-400">
      <p>No evolution chain available for this Pokémon.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  pokemon: {
    name: string
    sprites: { front_default: string }
    types: { type: { name: string } }[]
    cries: { latest: string }
    height: number
    weight: number
    description: string
    stats: { stat: { name: string }; base_stat: number }[]
    evolutionChain?: {
      name: string
      image: string
    }[]
  }
}>()

const playCry = () => {
  const audio = new Audio(props.pokemon.cries.latest)
  audio.play()
}
</script>
