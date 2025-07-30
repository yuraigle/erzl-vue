<script setup lang="ts">
import type { PersonItem } from '@/types/PersonData'
import { formatDate } from '@/utils'

defineProps({
  person: {
    type: Object as () => {
      personItems: PersonItem[]
    },
  },
})

defineEmits(['details'])

const itemsOrder = (items?: PersonItem[]): PersonItem[] => {
  if (!items) return []
  return items.sort((a, b) => {
    return b.dateEdit - a.dateEdit
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
    <tbody v-if="person?.personItems">
      <tr
        v-for="(p, index) in itemsOrder(person.personItems)"
        :key="index"
        role="button"
        @click="$emit('details', p)"
      >
        <td>{{ p.surname }} {{ p.firstName }} {{ p.patronymic }}</td>
        <td>{{ p.gender === 1 ? 'М' : 'Ж' }}</td>
        <td title="Дата рождения">{{ formatDate(p.birthDay) }}</td>
        <td class="text-end">
          <span class="text-danger" v-if="p.deathDate" :title="'Смерть ' + formatDate(p.deathDate)">
            С
          </span>
          <span class="text-success" v-if="p.status.match(/^Д/)" title="Действителен"> Д </span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="4" class="text-center text-muted">Нет данных</td>
      </tr>
    </tbody>
  </table>
</template>
