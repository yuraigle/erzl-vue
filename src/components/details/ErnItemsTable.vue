<script setup lang="ts">
import type { ErnItem } from '@/types/PersonData'

defineProps({
  ern: {
    type: Object as () => {
      ernItems: ErnItem[]
    },
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
    <tbody v-if="ern?.ernItems">
      <tr v-for="(e, index) in ern.ernItems" :key="index" role="button">
        <td>{{ e.ern }}</td>
        <td class="text-end">
          <span class="text-success" v-if="e.ernStatus.match(/^Д/)" title="Действителен"> Д </span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="2" class="text-center text-muted">Нет данных</td>
      </tr>
    </tbody>
  </table>
</template>
