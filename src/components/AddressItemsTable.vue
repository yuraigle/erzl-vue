<script setup lang="ts">
import { defineProps } from 'vue'
import type { AddressItem } from '@/types/PersonData'
import { formatDate, compareByStr } from '@/utils';

defineProps({
  addressItems: {
    type: Object as () => AddressItem[],
  },
})

const itemsOrder = (items?: AddressItem[]): AddressItem[] => {
  if (!items) return []
  return items.sort((a, b) => {
    const a1 = a.addressStatus ? a.addressStatus.substring(0, 1) : ''
    const b1 = b.addressStatus ? b.addressStatus.substring(0, 1) : ''
    if (a1 != b1) {
      return compareByStr(a1, b1)
    }

    if (a.addressType != b.addressType) {
      return compareByStr(a.addressType, b.addressType)
    }

    return b.addressDateB - a.addressDateB // then by date
  })
}

const addressTypeName = (type: string): string => {
  switch (type) {
    case '1':
      return 'регистрации';
    case '2':
      return 'пребывания';
    case '3':
      return 'проживания';
    default:
      return '';
  }
}
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="4">Адреса</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(a, index) in itemsOrder(addressItems)" :key="index" role="button">
        <td>{{ a.addressType }} - {{  addressTypeName(a.addressType) }}</td>
        <td :title="a.addressText">{{ a.okato }}</td>
        <td>
          {{ formatDate(a.addressDateB) }}
          &mdash;
          {{ formatDate(a.addressDateE) }}
        </td>
        <td class="text-end">
          <span class="text-success" v-if="a.addressStatus.match(/^Д/)" title="Действителен">
            Д
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
