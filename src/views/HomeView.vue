<template>
  <MainLayout>
    <AppNavbar>
      Pokédex {{ !teamLimit ? '' : teamLimit }}
      <template #button>
        <AppNavbarBtn link="/team">Ver Equipo</AppNavbarBtn>
      </template>
    </AppNavbar>
    <div class="flex-grow overflow-hidden mb-16">
      <LoadingOverlay v-if="isLoading" />
      <div
        class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 min-h-[400px] mt-10 px-2"
      >
        <PokemonCard
          v-for="pokemon in paginatedPokemons"
          :key="pokemon.name"
          :pokemon="pokemon"
          @add="addPokemonToTeam"
          @remove="deletePokemonFromTeam"
        ></PokemonCard>
      </div>
    </div>
    <AppPaginator
      :currentPage="currentPage"
      :maxPages="maxPages"
      :totalItems="pokemons.length"
      :onPrev="prevPage"
      :onNext="nextPage"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { storeToRefs } from 'pinia'
import MainLayout from '@/layouts/MainLayout.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import AppNavbarBtn from '@/components/AppNavbarBtn.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import AppPaginator from '@/components/AppPaginator.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const pokemonStore = usePokemonStore()
const { pokemons, teamLimit } = storeToRefs(pokemonStore)
const isLoading = ref(true)

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
    isLoading.value = true
    await pokemonStore.fetchPokemons()
    isLoading.value = false
  } else {
    isLoading.value = false
  }
})
</script>
