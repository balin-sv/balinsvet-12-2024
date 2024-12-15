<template>
  <div
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
        @click="addToTeam"
        class="space-x-2 px-4 py-2 bg-yellow-600 text-black font-semibold text-sm rounded-full hover:bg-yellow-500 transition duration-300 shadow-md w-32"
      >
        <i class="fas fa-user-plus"></i>
        <span>Añadir</span>
      </button>
      <button
        v-else
        @click="removeFromTeam"
        class="space-x-2 px-4 py-2 bg-red-700 text-white font-semibold text-sm rounded-full hover:bg-red-600 transition duration-300 shadow-md w-32"
      >
        <i class="fas fa-trash-alt"></i>
        <span>Eliminar</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pokemon: {
    id: number
    name: string
    image: string
    isInTeam: boolean
  }
}>()

const emit = defineEmits(['add', 'remove'])

const addToTeam = () => {
  emit('add', props.pokemon.id)
}

const removeFromTeam = () => {
  emit('remove', props.pokemon.id)
}
</script>
