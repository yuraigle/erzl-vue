<script setup lang="ts">
import { useGarStore } from '@/stores/gar.store'

import InfoIcon from '../icons/InfoIcon.vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
})

const gar = useGarStore()
</script>

<template>
  {{ props.code }}
  <button
    v-if="props.code"
    class="btn btn-sm btn-link py-0"
    title="Нажмите для расшифровки кода ГАР"
    @click="gar.search(props.code)"
    :disabled="gar.isLoading || gar.cached.has(props.code)"
  >
    <InfoIcon :size="20" />
  </button>
  <div class="text-muted small italic">
    {{ gar.cached.get(props.code) || '' }}
  </div>
</template>
