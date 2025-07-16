<script setup lang="ts">
import type { AttachItem } from '@/types/PersonData'
import { formatDate, compareByStr } from '@/utils'
import { useAuthStore } from '@/stores'
import PlusIcon from '../icons/PlusIcon.vue'

import { Modal } from 'bootstrap'
import AttachFormModal from '../register/AttachFormModal.vue'

defineProps({
  attach: {
    type: Object as () => {
      attachItems: AttachItem[]
    },
  },
})

defineEmits(['details'])

const auth = useAuthStore()

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

const addAttachment = () => {
  const modalElement = document.getElementById('modalAttachForm')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.show()
}
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="4">
          <div class="d-flex">
            Прикрепления
            <button class="btn btn-link p-0 ms-auto" title="Актуализировать данные"
              @click="addAttachment"
              :disabled="!auth.user?.role || auth.user?.role < 4"
            >
              <PlusIcon :size="20" />
            </button>
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="attach?.attachItems">
      <tr
        v-for="(a, index) in itemsOrder(attach.attachItems)"
        :key="index"
        role="button"
        @click="$emit('details', a)"
      >
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
    <tbody v-else>
      <tr>
        <td colspan="4" class="text-center text-muted">Нет данных</td>
      </tr>
    </tbody>
  </table>

  <AttachFormModal />
</template>
