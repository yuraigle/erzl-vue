<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import ToastsContainer from '@/components/ToastsContainer.vue';
</script>

<template>
  <AppNavbar />
  <ToastsContainer />
  <RouterView />
</template>
