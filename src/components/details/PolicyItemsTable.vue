<script setup lang="ts">
import type { PolicyItem } from '@/types/PersonData'
import { compareByStr, formatDate } from '@/utils'
import { useAuthStore } from '@/stores'
import MinusIcon from '../icons/MinusIcon.vue'

defineProps({
  policy: {
    type: Object as () => {
      policyItems: PolicyItem[]
    },
  },
})

defineEmits(['details'])

const auth = useAuthStore()

const itemsOrder = (items?: PolicyItem[]): PolicyItem[] => {
  if (!items) return []

  return items.sort((a, b) => {
    const a1 = a.pcyStatus ? a.pcyStatus.substring(0, 1) : ''
    const b1 = b.pcyStatus ? b.pcyStatus.substring(0, 1) : ''
    if (a1 != b1) {
      return compareByStr(a1, b1)
    }

    return b.pcyDateB - a.pcyDateB
  })
}
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="5">
          <div class="d-flex">
            Страхования
            <button class="btn btn-link p-0 ms-auto" title="Закрыть страховку"
              @click="() => {}"
              :disabled="!auth.user?.role || auth.user?.role < 2 || true"
            >
              <MinusIcon :size="20" />
            </button>
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="policy?.policyItems">
      <tr
        v-for="(p, index) in itemsOrder(policy.policyItems)"
        :key="index"
        role="button"
        @click="$emit('details', p)"
      >
        <td>
          <span v-if="p.insurfCode && p.insurfCode != '0'" :title="p.insurfName">
            {{ p.insurfCode }}
          </span>
        </td>
        <td>{{ p.pcyType }}</td>
        <td>{{ p.enp }}</td>
        <td>
          {{ formatDate(p.pcyDateB) }}
          &mdash;
          {{ formatDate(p.pcyDateE) }}
        </td>
        <td class="text-end">
          <span class="text-success" v-if="p.pcyStatus.match(/^Д/)" title="Действителен"> Д </span>
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
