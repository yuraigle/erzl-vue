<script setup lang="ts">
import type { SnilsItem } from '@/types/PersonData'
import { useAuthStore } from '@/stores'
import PlusIcon from '../icons/PlusIcon.vue'

import { Modal } from 'bootstrap'
import SnilsFormModal from '../register/SnilsFormModal.vue'

defineProps({
  snils: {
    type: Object as () => {
      snilsItems: SnilsItem[]
    },
  },
})

defineEmits(['details'])

const auth = useAuthStore()

const addAttachmentModal = () => {
  const modalElement = document.getElementById('modalSnilsForm')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.show()
}
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="2">
          <div class="d-flex">
            СНИЛС
            <button
              class="btn btn-link p-0 ms-auto"
              title="Актуализировать данные"
              @click="addAttachmentModal"
              :disabled="!auth.user?.role || auth.user?.role < 4"
            >
              <PlusIcon :size="20" />
            </button>
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="snils">
      <tr
        v-for="(s, index) in snils.snilsItems"
        :key="index"
        role="button"
        @click="$emit('details', s)"
      >
        <td>{{ s.snils }}</td>
        <td class="text-end">
          <span class="text-success" v-if="s.statusSnils.match(/^Д/)" title="Действителен">
            Д
          </span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="2" class="text-center text-muted">Нет данных</td>
      </tr>
    </tbody>
  </table>

  <SnilsFormModal />
</template>
