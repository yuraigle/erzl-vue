<script setup lang="ts">
import { useFerzlStore } from '@/stores/ferzl.store'
import { formatDate } from '@/utils'

defineEmits(['details'])

const ferzlStore = useFerzlStore()
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="4">Законные представители</th>
      </tr>
    </thead>
    <tbody v-if="ferzlStore.legalRepList && ferzlStore.legalRepList.length > 0">
      <tr
        v-for="rep in ferzlStore.legalRepList"
        :key="rep.oip"
        role="button"
        @click="$emit('details', rep)"
      >
        <td>{{ rep.oip }}</td>
        <td>{{ rep.legRepType }}</td>
        <td>
          {{ formatDate(rep.legRepDateB) }}
          &mdash;
          {{ formatDate(rep.legRepDateE) }}
        </td>
        <td class="text-end">
          <span class="text-success" v-if="rep.status.match(/^Д/)" title="Действителен"> Д </span>
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
