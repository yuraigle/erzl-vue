<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import ToastsContainer from '@/components/ToastsContainer.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <AppNavbar />
  <ToastsContainer />
  <RouterView />
  <AppFooter />
</template>

<style>
/* layout with footer on the bottom of the page */
html,
body,
#app {
  height: 100% !important;
}

#app {
  display: flex !important;
  flex-direction: column !important;
}
</style>
