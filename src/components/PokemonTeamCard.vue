<template>
  <div
    class="bg-gray-800 shadow-md rounded-lg overflow-hidden border-4 border-yellow-500 hover:scale-105 hover:shadow-xl transform transition duration-300 relative"
  >
    <div class="overflow-hidden p-2 relative">
      <img
        :src="pokemon.image"
        alt="Imagen de Pokemon"
        class="w-40 h-40 mx-auto object-fit transform hover:scale-110 transition duration-300"
      />
      <button
        @click="playCry"
        class="absolute top-2 right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition duration-300 shadow-md"
      >
        <i class="fas fa-volume-up text-black"></i>
      </button>
    </div>
    <div class="p-3 text-center">
      <h3 class="text-xl font-extrabold text-yellow-500 capitalize mb-2">
        {{ pokemon.name }}
      </h3>

      <p class="text-base capitalize font-semibold text-gray-300 mb-3">
        Tipos:
        {{ pokemon.types.map((type) => type.type.name).join(', ') }}
      </p>
      <div class="mb-3">
        <StatsChart :stats="pokemon.stats" :height="300" />
      </div>
      <div class="flex justify-center space-x-3">
        <button
          v-if="pokemon.isInTeam"
          @click="removeFromTeam"
          class="flex items-center space-x-2 px-4 py-2 bg-red-700 text-white font-bold rounded-full hover:bg-red-600 transition duration-300 shadow-md"
        >
          <i class="fas fa-trash-alt"></i>
          <span>Eliminar</span>
        </button>

        <router-link
          :to="{ name: 'TeamMember', params: { id: pokemon.id } }"
          class="px-4 py-2 bg-yellow-600 font-bold text-black rounded-full hover:bg-yellow-500 transition duration-300"
        >
          Detalles
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import StatsChart from '@/components/StatsChart.vue'

const props = defineProps<{
  pokemon: {
    id: number
    name: string
    image: string
    isInTeam: boolean
    types: { type: { name: string } }[]
    stats: { stat: { name: string }; base_stat: number }[]
    cry: { latest: string }
  }
}>()

const emit = defineEmits(['remove'])

const { pokemon } = props

const removeFromTeam = () => {
  emit('remove', pokemon.id)
}

const playCry = () => {
  const audio = new Audio(pokemon.cry.latest)
  audio.play()
}
</script>
