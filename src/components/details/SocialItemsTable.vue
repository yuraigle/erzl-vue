<script setup lang="ts">
import type { SocialStatusItem } from '@/types/PersonData'
import { formatDate } from '@/utils'

defineProps({
  social: {
    type: Object as () => {
      socialStatusItems: SocialStatusItem[]
    },
  },
})

defineEmits(['details'])

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
    <tbody v-if="social?.socialStatusItems">
      <tr
        v-for="(s, index) in itemsOrder(social.socialStatusItems)"
        :key="index"
        role="button"
        @click="$emit('details', s)"
      >
        <td>{{ s.socialStatus }} - {{ socialStatusName(s.socialStatus) }}</td>
        <td class="text-end">
          {{ formatDate(s.regDate) }}
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
