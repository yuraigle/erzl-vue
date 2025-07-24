<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNsiStore } from '@/stores/nsi.store'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
})

const nsi = useNsiStore()
const name = ref('')

watch(
  () => props.code,
  (v1: string | undefined, v0: string | undefined) => {
    if (v1 && v1 !== v0) {
      nsi.fetchF032(v1).then((str: string) => (name.value = str))
    }
  },
  { immediate: true },
)
</script>

<template>
  {{ props.code }}
  <div class="text-muted small">
    {{ name }}
  </div>
</template>
