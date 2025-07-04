<script setup lang="ts">
import type { ContactItem } from '@/types/PersonData'

defineProps({
  contact: {
    type: Object as () => {
      contactItems: ContactItem[]
    },
  },
})

defineEmits(['details'])
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="3">Контакты</th>
      </tr>
    </thead>
    <tbody v-if="contact">
      <tr
        v-for="(c, index) in contact.contactItems"
        :key="index"
        role="button"
        @click="$emit('details', c)"
      >
        <td>{{ c.contactType }}</td>
        <td>{{ c.contactText }}</td>
        <td class="text-end">
          <span class="text-success" v-if="c.contactStatus.match(/^Д/)" title="Действителен">
            Д
          </span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="3" class="text-center text-muted">Нет данных</td>
      </tr>
    </tbody>
  </table>
</template>
