<script setup lang="ts">
import { COMPANY_NAME } from '@/../environment';
const version = APP_VERSION;
</script>

<template>
  <footer class="mt-auto">
    <div class="d-flex p-2 mt-4 small">
      <div class="flex-grow-1">
        &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}
      </div>
      <div class="flex-shrink-1 text-end">
        v{{ version }}
      </div>
    </div>
  </footer>
</template>
