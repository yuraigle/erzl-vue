<script setup lang="ts">
import { defineProps } from 'vue'
import type { SocialStatusItem } from '@/types/PersonData'
import { formatDate } from '@/utils'

defineProps({
  socialItems: {
    type: Object as () => SocialStatusItem[],
  },
})

const itemsOrder = (items?: SocialStatusItem[]): SocialStatusItem[] => {
  if (!items) return []

  return items
    .sort((a, b) => {
      return b.regDate - a.regDate
    })
    .slice(0, 4)
}

const socialStatusName = (socialStatus: string): string => {
  switch (socialStatus) {
    case '0':
      return 'Работающий'
    case '1':
      return 'Неработающий'
  }
  return ''
}
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="2">Социальный статус</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(s, index) in itemsOrder(socialItems)" :key="index" role="button">
        <td>{{ s.socialStatus }} - {{ socialStatusName(s.socialStatus) }}</td>
        <td class="text-end">
          {{ formatDate(s.regDate) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
