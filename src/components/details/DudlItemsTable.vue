<script setup lang="ts">
import type { DudlItem } from '@/types/PersonData'
import { formatDate } from '@/utils'
import { useAuthStore } from '@/stores'
import { f011DocName } from '@/nsi/f011'
import PlusIcon from '../icons/PlusIcon.vue'

defineProps({
  dudl: {
    type: Object as () => {
      dudlItems: DudlItem[]
    },
  },
})

defineEmits(['details'])

const auth = useAuthStore()
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="4">
          <div class="d-flex">
            Документы
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
    <tbody v-if="dudl?.dudlItems">
      <tr v-for="(d, index) in dudl.dudlItems" :key="index" role="button" @click="$emit('details', d)">
        <td :title="f011DocName(d.dudlType)">{{ d.dudlType }}</td>
        <td :title="f011DocName(d.dudlType)">{{ d.dudlSer }} № {{ d.dudlNum }}</td>
        <td title="Дата выдачи">{{ formatDate(d.dudlDateB) }}</td>
        <td class="text-end">
          <span class="text-success" v-if="d.dudlStatus.match(/^Д/)" title="Действителен"> Д </span>
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
