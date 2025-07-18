<script setup lang="ts">
import { useToastsStore } from '@/stores'

const toasts = useToastsStore()

const bgClassName = (name: string) => {
  return 'text-bg-' + name
}
</script>

<template>
  <div v-for="(m, index) in toasts.messages" :key="index" :class="bgClassName(m.type)"
    :style="{ bottom: index * 50 + 10 + 'px' }" class="toast align-items-center border-0 show" role="alert">
    <div class="d-flex">
      <div class="toast-body">{{ m.message }}</div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
</template>

<style>
.toast {
  position: fixed;
  right: 10px;
  z-index: 1100;
}
</style>
