import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores';

import LoginView from '@/views/LoginView.vue'
import SearchView from '@/views/SearchView.vue'
import UsersView from '@/views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: SearchView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/users', name: 'users', component: UsersView },
  ],
})

router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.isAuthenticated) {
    return '/login';
  }
});

export default router
