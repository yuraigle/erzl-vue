<script setup lang="ts">
import type { SnilsItem } from '@/types/PersonData'

defineProps({
  snils: {
    type: Object as () => {
      snilsItems: SnilsItem[]
    },
  },
})
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="2">СНИЛС</th>
      </tr>
    </thead>
    <tbody v-if="snils">
      <tr v-for="(s, index) in snils.snilsItems" :key="index" role="button">
        <td>{{ s.snils }}</td>
        <td class="text-end">
          <span class="text-success" v-if="s.statusSnils.match(/^Д/)" title="Действителен">
            Д
          </span>
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
