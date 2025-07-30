<script setup lang="ts">
import type { Ref } from 'vue'

interface VuelidateError {
  $message: string | Ref<string, string>
}

defineProps({
  errors: {
    type: Array<VuelidateError>,
    default: () => [],
  },
})
</script>

<template>
  <span v-if="errors && errors.length > 0" class="invalid-feedback">
    {{ errors[0].$message }}
  </span>
</template>
