import { createRouter, createWebHistory } from 'vue-router'
import ReportVdiView from '@/views/ReportVdiView.vue'
import ReportVdaView from '@/views/ReportVdaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (Home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/vdi',
      name: 'vdi',
      component: ReportVdiView,
    },
    {
      path: '/vda',
      name: 'vda',
      component: ReportVdaView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
