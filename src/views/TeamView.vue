<template>
  <MainLayout>
    <AppNavbar>
      Pokédex
      <template #button>
        <AppNavbarBtn link="/">Ver Equipo</AppNavbarBtn>
      </template>
    </AppNavbar>

    <div class="flex-grow overflow-hidden mb-16">
      <div
        class="container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px] mt-10 px-2 pb-5"
      >
        <PokemonTeamCard
          v-for="pokemon in team"
          :key="pokemon.name"
          :pokemon="pokemon"
          @remove="deletePokemonFromTeam"
        >
        </PokemonTeamCard>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import MainLayout from '@/components/MainLayout.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import AppNavbarBtn from '@/components/AppNavbarBtn.vue'
import PokemonTeamCard from '@/components/PokemonTeamCard.vue'

const pokemonStore = usePokemonStore()
const { teamLimit } = storeToRefs(pokemonStore)

const deletePokemonFromTeam = (id: number) => {
  teamLimit.value--
  pokemonStore.deleteFromTeam(id)
}

const team = computed(() => pokemonStore.getTeam)
</script>
