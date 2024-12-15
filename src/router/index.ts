import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TeamView from '@/views/TeamView.vue';
import TeamMemberView from '@/views/TeamMemberView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import axios from 'axios';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/team', name: 'Team', component: TeamView },
  {path:'/not-found', name: 'NotFound', component: NotFoundView}, 
  {
    path: '/team/:id',
    name: 'TeamMember',
    component: TeamMemberView,
    props: true,
  },
  {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === 'TeamMember') {
    const id = Number(to.params.id);

    if (isNaN(id) || id < 1) {
      console.warn(`Invalid Pokemon ID: ${id}`);
      return next('/not-found');
    }

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (response.status === 200) {
        next(); 
      }
    } catch (error) {
      console.warn(`${error}`);
      return next('/not-found'); 
    }
  } else {
    next(); 
  }
});

export default router;
