<template>
  <router-link
    :to="link"
    class="px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base bg-yellow-600 text-black font-bold rounded-md sm:rounded-full hover:bg-yellow-500 transition duration-300"
  >
    <slot></slot>
  </router-link>
</template>
<script setup lang="ts">
defineProps({
  link: String,
})
</script>
