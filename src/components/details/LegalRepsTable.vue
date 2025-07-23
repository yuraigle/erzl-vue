<script setup lang="ts">
import { useFerzlStore } from '@/stores/ferzl.store'
import { formatDate } from '@/utils'
import RefreshIcon from '@/components/icons/RefreshIcon.vue'

defineEmits(['details'])

defineProps({
  oip: String,
})

const ferzlStore = useFerzlStore()
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="4">
          <div class="d-flex">
            Законные представители
            <button
              class="btn btn-link p-0 ms-auto"
              title="Запросить данные"
              @click="() => ferzlStore.searchLegalRep(oip)"
              :disabled="ferzlStore.isLoadingLegalRep"
            >
              <RefreshIcon :size="20" />
            </button>
          </div>
        </th>
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
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="4">
          <div class="d-flex">Законно представляемые</div>
        </th>
      </tr>
    </thead>
    <tbody v-if="ferzlStore.legalRepByList && ferzlStore.legalRepByList.length > 0">
      <tr
        v-for="rep in ferzlStore.legalRepByList"
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
