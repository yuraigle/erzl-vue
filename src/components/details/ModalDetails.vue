<script setup lang="ts">
import { formatDate, formatDateTime } from '@/utils'
import { getMpiFiltered } from '@/nsi/mpi'

const props = defineProps({
  obj: {
    type: Object as () => object | null,
  },
  type: {
    type: String,
  },
})

const mpiFormatName = (key: string) => {
  const mpi1 = getMpiFiltered(props.type || '')
  return mpi1.has(key) ? ucFirst(mpi1.get(key)?.split('|')[4]).trim() : key
}

const mpiFormatValue = (value: any, key: string) => {
  const mpi1 = getMpiFiltered(props.type || '')
  const format = mpi1.has(key) ? mpi1.get(key)?.split('|')[5] : 'string'
  if (format === 'date') {
    return formatDate(value)
  } else if (format === 'dateTime') {
    return formatDateTime(value)
  } else if (format === 'boolean') {
    return value === undefined ? '' : value ? 'Да' : 'Нет'
  } else {
    return value ? value.toString() : ''
  }
}

const ucFirst = (str?: string): string => {
  if (typeof str !== 'string' || str.length === 0) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<template>
  <div class="modal fade" id="modalDetails">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Подробная информация</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <table class="table table-hover table-sm small">
            <tbody v-if="obj">
              <tr v-for="(key, index) in Object.keys(obj)" :key="key">
                <td>{{ mpiFormatName(key) }}:</td>
                <td>{{ mpiFormatValue(Object.values(obj)[index], key) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>
