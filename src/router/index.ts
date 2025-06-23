import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores';

import ReportVdiView from '@/views/ReportVdiView.vue'
import ReportVdaView from '@/views/ReportVdaView.vue'
import SearchView from '@/views/SearchView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: SearchView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/vdi', name: 'vdi', component: ReportVdiView },
    { path: '/vda', name: 'vda', component: ReportVdaView },
  ],
})

router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.isAuthenticated) {
    // auth.returnUrl = to.fullPath;
    return '/login';
  }
});

export default router
