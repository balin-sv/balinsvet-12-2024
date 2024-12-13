import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TeamView from '@/views/TeamView.vue';
import TeamMemberView from '@/views/TeamMemberView.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/team', name: 'Team', component: TeamView },
  { path: '/team/:id', name: 'TeamMember', component: TeamMemberView, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
