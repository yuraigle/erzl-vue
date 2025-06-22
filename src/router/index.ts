import { createRouter, createWebHistory } from 'vue-router'
import ReportVdiView from '@/views/ReportVdiView.vue'
import ReportVdaView from '@/views/ReportVdaView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    }
  ],
})

export default router
