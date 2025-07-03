<script setup lang="ts">
import { useFerzlStore } from '@/stores/ferzl.store'
import { formatDate } from '@/utils'

const ferzlStore = useFerzlStore()
</script>

<template>
  <div v-if="!ferzlStore.personList || ferzlStore.personList.length == 0">
    <p class="text-center my-2 text-muted small">Задайте параметры поиска</p>
  </div>
  <table v-else class="table table-hover">
    <thead>
      <tr>
        <th>№</th>
        <th>ОИП</th>
        <th>ФИО</th>
        <th>ДР</th>
        <th>ЕНП</th>
        <th>Пол</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(person, index) in ferzlStore.personList" :key="person.oip">
        <td>{{ index + 1 }}</td>
        <td>{{ person.oip }}</td>
        <td>{{ person.fio }}</td>
        <td>{{ formatDate(person.birthDay) }}</td>
        <td>{{ person.enp }}</td>
        <td>{{ person.gender === 1 ? 'М' : 'Ж' }}</td>
        <td>
          <button
            class="btn btn-link p-0"
            :disabled="ferzlStore.isLoading2"
            @click.prevent="ferzlStore.searchOip(person.oip)"
          >
            Подробнее
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
