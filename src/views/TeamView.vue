<template>
  <MainLayout>
    <AppNavbar>
      Pokédex {{ !teamLimit ? '' : teamLimit }}
      <template #button>
        <AppNavbarBtn link="/">Al Pokédex</AppNavbarBtn>
      </template>
    </AppNavbar>

    <div class="flex-grow overflow-hidden mb-16">
      <div
        class="container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px] mt-10 px-2 pb-5"
      >
        <template v-if="team.length > 0"
          ><PokemonTeamCard
            v-for="pokemon in team"
            :key="pokemon.name"
            :pokemon="pokemon"
            @remove="deletePokemonFromTeam"
          >
          </PokemonTeamCard
        ></template>
        <p
          v-else
          class="flex flex-col items-center justify-center col-span-full text-дп sm:text-xl font-bold text-gray-800 p-6 mt-20"
        >
          No hay Pokémon en tu equipo. ¡Añade algunos desde el Pokédex!
          <router-link
            to="/"
            class="mt-6 px-6 py-2 bg-yellow-500 text-gray-800 font-bold rounded-full hover:bg-yellow-400 transition duration-300 flex items-center space-x-2"
          >
            <i class="fas fa-arrow-left"></i>
            <span>Volver al Pokédex</span>
          </router-link>
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
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
