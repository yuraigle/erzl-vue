<script setup lang="ts">
import { defineProps } from 'vue'
import type { ErnItem } from '@/types/PersonData'

defineProps({
  ernItems: {
    type: Object as () => ErnItem[],
  },
})
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="2">ЕРН</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(e, index) in ernItems" :key="index" role="button">
        <td>{{ e.ern }}</td>
        <td class="text-end">
          <span class="text-success" v-if="e.ernStatus.match(/^Д/)" title="Действителен"> Д </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
