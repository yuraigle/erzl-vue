<script setup lang="ts">
import { defineProps } from 'vue'
import type { PersonItem } from '@/types/PersonData'
import { formatDate, compareByStr } from '@/utils'

defineProps({
  personItems: {
    type: Object as () => PersonItem[],
  },
})

const itemsOrder = (items?: PersonItem[]): PersonItem[] => {
  if (!items) return []
  return items.sort((a, b) => {
    const a1 = a.status ? a.status.substring(0, 1) : ''
    const b1 = b.status ? b.status.substring(0, 1) : ''
    if (a1 != b1) {
      return compareByStr(a1, b1)
    }

    return b.dateEdit - a.dateEdit // then by date
  })
}

</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="4">Персональные данные</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(p, index) in itemsOrder(personItems)" :key="index" role="button">
        <td>{{ p.surname }} {{ p.firstName }} {{ p.patronymic }}</td>
        <td>{{ p.gender === 1 ? 'М' : 'Ж' }}</td>
        <td title="Дата рождения">{{ formatDate(p.birthDay) }}</td>
        <td class="text-end">
          <span class="text-danger" v-if="p.deathDate" :title="'Смерть ' + formatDate(p.deathDate)"> С </span>
          <span class="text-success" v-if="p.status.match(/^Д/)" title="Действителен"> Д </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
