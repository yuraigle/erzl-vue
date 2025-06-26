<script setup lang="ts">
import { computed } from 'vue'
import { useToastsStore } from '@/stores'

const toasts = useToastsStore()

const bgClassName = computed(() => {
  return 'text-bg-' + toasts.type
})
</script>

<template>
  <div
    v-if="toasts.message"
    class="toast align-items-center border-0 show"
    :class="bgClassName"
    role="alert"
  >
    <div class="d-flex">
      <div class="toast-body">{{ toasts.message }}</div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
</template>

<style>
.toast {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
