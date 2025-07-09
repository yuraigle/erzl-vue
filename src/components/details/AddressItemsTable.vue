<script setup lang="ts">
import type { AddressItem } from '@/types/PersonData'
import { formatDate, compareByStr } from '@/utils'
import { useAuthStore } from '@/stores'

import PlusIcon from '../icons/PlusIcon.vue'

defineProps({
  address: {
    type: Object as () => {
      addressItems: AddressItem[]
    },
  },
})

defineEmits(['details'])

const auth = useAuthStore()

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
      return 'регистрации'
    case '2':
      return 'пребывания'
    case '3':
      return 'проживания'
    default:
      return ''
  }
}
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="5">
          <div class="d-flex">
            Адреса
            <button
              class="btn btn-link p-0 ms-auto"
              title="Актуализировать данные"
              @click="() => {}"
              :disabled="!auth.user?.role || auth.user?.role < 2 || true"
            >
              <PlusIcon :size="20" />
            </button>
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="address?.addressItems">
      <tr
        v-for="(a, index) in itemsOrder(address.addressItems)"
        :key="index"
        role="button"
        @click="$emit('details', a)"
      >
        <td>{{ a.addressType }} - {{ addressTypeName(a.addressType) }}</td>
        <td>{{ a.okato }}</td>
        <td>
          <small class="badge text-info" v-if="a.addressText" :title="a.addressText">*</small>
        </td>
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
    <tbody v-else>
      <tr>
        <td colspan="5" class="text-center text-muted">Нет данных</td>
      </tr>
    </tbody>
  </table>
</template>
