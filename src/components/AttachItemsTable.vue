<script setup lang="ts">
import { defineProps } from 'vue'
import type { AttachItem } from '@/types/PersonData'
import { compareByStr, formatDate } from '@/utils'

defineProps({
  attachItems: {
    type: Object as () => AttachItem[],
  },
})

const areaTypeName = (type: string): string => {
  const n = parseInt(type)
  return ['Терапевт', 'ЖК', 'Стом.', 'СМП', 'ФАП'][n - 1]
}

const itemsOrder = (items?: AttachItem[]): AttachItem[] => {
  if (!items) return []
  return items.sort((a, b) => {
    const a1 = a.attachStatus ? a.attachStatus.substring(0, 1) : ''
    const b1 = b.attachStatus ? b.attachStatus.substring(0, 1) : ''
    if (a1 != b1) {
      return compareByStr(a1, b1)
    }

    if (a.areaType != b.areaType) {
      return compareByStr(a.areaType, b.areaType)
    }

    return b.dateAttachB - a.dateAttachB // then by date
  })
}
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="4">Прикрепления</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(a, index) in itemsOrder(attachItems)" :key="index" role="button">
        <td>{{ a.moCode }}</td>
        <td>{{ a.areaType }}. {{ areaTypeName(a.areaType) }}</td>
        <td>
          {{ formatDate(a.dateAttachB) }}
          &mdash;
          {{ formatDate(a.dateAttachE) }}
        </td>
        <td class="text-end">
          <span class="text-success" v-if="a.attachStatus.match(/^Д/)" title="Действителен">
            Д
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
