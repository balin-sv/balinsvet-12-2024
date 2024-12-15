<template>
  <div
    class="fixed bottom-0 left-0 w-full bg-black py-4 flex justify-center items-center space-x-4"
  >
    <button
      @click="prevPage"
      :disabled="!totalItems || currentPage === 1"
      class="px-4 py-2 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 disabled:opacity-50 transition duration-300"
    >
      ◀
    </button>

    <span class="text-lg font-extrabold text-yellow-300 drop-shadow-lg">
      Página {{ currentPage }} de {{ maxPages }}
    </span>

    <button
      @click="nextPage"
      :disabled="!totalItems || currentPage === maxPages"
      class="px-4 py-2 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 disabled:opacity-50 transition duration-300"
    >
      ▶
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  currentPage: number
  maxPages: number
  totalItems: number
  onPrev: () => void
  onNext: () => void
}>()

const prevPage = () => {
  if (props.currentPage > 1) {
    props.onPrev()
  }
}

const nextPage = () => {
  if (props.currentPage < props.maxPages) {
    props.onNext()
  }
}
</script>
