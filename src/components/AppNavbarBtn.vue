<template>
  <router-link
    :to="link"
    class="px-4 py-2 bg-yellow-600 text-black font-bold rounded-full hover:bg-yellow-500 transition duration-300"
  >
    <slot></slot>
  </router-link>
</template>
<script setup lang="ts">
defineProps({
  link: String,
})
</script>
