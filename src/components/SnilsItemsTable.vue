<script setup lang="ts">
import { defineProps } from 'vue'
import type { SnilsItem } from '@/types/PersonData'

defineProps({
  snilsItems: {
    type: Object as () => SnilsItem[],
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
    <tbody>
      <tr v-for="(s, index) in snilsItems" :key="index" role="button">
        <td>{{ s.snils }}</td>
        <td class="text-end">
          <span class="text-success" v-if="s.statusSnils.match(/^Д/)" title="Действителен"> Д </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
