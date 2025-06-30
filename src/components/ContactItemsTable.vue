<script setup lang="ts">
import { defineProps } from 'vue'
import type { ContactItem } from '@/types/PersonData'

defineProps({
  contactItems: {
    type: Object as () => ContactItem[],
  },
})
</script>

<template>
  <table class="table table-hover table-sm small">
    <thead>
      <tr>
        <th colspan="3">Контакты</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(c, index) in contactItems" :key="index" role="button">
        <td>{{ c.contactType }}</td>
        <td>{{ c.contactText }}</td>
        <td class="text-end">
          <span class="text-success" v-if="c.contactStatus.match(/^Д/)" title="Действителен">
            Д
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
