<script setup lang="ts">
import { formatDate, formatDateTime, ucFirst } from '@/utils'
import { getMpiFiltered } from '@/nsi/mpi'
import { f011DocName } from '@/nsi/f011'

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

const mpiFormatValue = (v: any, key: string) => {
  const mpi1 = getMpiFiltered(props.type || '')
  if (!mpi1.has(key)) {
    return v ? v.toString() : ''
  }

  const parts = mpi1.get(key)?.split('|') || []
  const id = parts[0] || ''
  const format = parts[5] || 'string'

  if (key === 'gender') return formatGender(v.toString())
  if (id === '3.4.1.5.' && v) return formatDudlType(v.toString())
  if (id === '3.5.1.10.' && v) return formatAddressType(v.toString())
  if (id === '3.6.1.1.') return formatAreaType(v.toString())
  if (id === '3.6.1.3.') return formatAttachMethod(v.toString())
  if (id === '3.9.1.1.') return formatSocialStatus(v.toString())

  if (format === 'date') {
    return formatDate(v)
  } else if (format === 'dateTime') {
    return formatDateTime(v)
  } else if (format === 'boolean') {
    return v === undefined ? '' : v ? 'Да' : 'Нет'
  } else {
    return v ? v.toString() : ''
  }
}

const formatGender = (n: string): string => {
  const dict = ['Неизвестен', 'Мужской', 'Женский']
  return n + '. ' + dict[parseInt(n)]
}

const formatDudlType = (n: string): string => {
  const name = f011DocName(n)
  return name ? n + '. ' + f011DocName(n) : n;
}

const formatAddressType =  (n: string): string => {
  const dict = [
    'Адрес регистрации по месту жительства',
    'Адрес по месту пребывания (временной регистрации)',
    'Адрес фактического проживания (пребывания)'
  ]
  return n + '. ' + dict[parseInt(n) - 1]
}

const formatAreaType = (n: string): string => {
  const dict = ['Терапевт', 'ЖК', 'Стом.', 'СМП', 'ФАП']
  return n + '. ' + dict[parseInt(n) - 1]
}

const formatAttachMethod = (n: string): string => {
  const dict = ['по месту регистрации', 'по личному заявлению', 'по заявлению в электронном виде']
  return n + '. ' + dict[parseInt(n) - 1]
}

const formatSocialStatus = (n: string): string => {
  const dict = ['Работающий', 'Неработающий']
  return n + '. ' + dict[parseInt(n)]
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
