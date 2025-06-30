<script setup lang="ts">
import { defineProps } from 'vue'
import type { PolicyItem } from '@/types/PersonData'
import { compareByStr, formatDate } from '@/utils'

defineProps({
  policyItems: {
    type: Object as () => PolicyItem[],
  },
})

const itemsOrder = (items?: PolicyItem[]): PolicyItem[] => {
  if (!items) return []

  return items.sort((a, b) => {
    const a1 = a.pcyStatus ? a.pcyStatus.substring(0, 1) : ''
    const b1 = b.pcyStatus ? b.pcyStatus.substring(0, 1) : ''
    if (a1 != b1) {
      return compareByStr(a1, b1)
    }

    return b.pcyDateB - a.pcyDateB
  })
}
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="5">Страхования</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(p, index) in itemsOrder(policyItems)" :key="index" role="button">
        <td>
          <span v-if="p.insurfCode && p.insurfCode != '0'" :title="p.insurfName">
            {{ p.insurfCode }}
          </span>
        </td>
        <td>{{ p.pcyType }}</td>
        <td>{{ p.enp }}</td>
        <td>
          {{ formatDate(p.pcyDateB) }}
          &mdash;
          {{ formatDate(p.pcyDateE) }}
        </td>
        <td class="text-end">
          <span class="text-success" v-if="p.pcyStatus.match(/^Д/)" title="Действителен"> Д </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
