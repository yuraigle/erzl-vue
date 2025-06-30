<script setup lang="ts">
import { useFerzlStore } from '@/stores/ferzl.store'
import FerzlSearchForm from '@/components/FerzlSearchForm.vue'

const ferzlStore = useFerzlStore()
</script>

<template>
  <div class="d-flex">
    <div class="search-container border-end px-3 flex-shrink-0">
      <h5 class="my-4">Параметры поиска</h5>
      <FerzlSearchForm />
    </div>
    <div class="container-fluid">
      <div v-if="!ferzlStore.searchResults || ferzlStore.searchResults.length == 0">
        <p class="text-center my-2 text-muted small">Задайте параметры поиска</p>
      </div>
      <table class="table table-hover" v-else>
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
            <td>{{ new Date(person.birthDay).toLocaleDateString('ru-RU') }}</td>
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
    </div>
  </div>
</template>

<style scoped>
.search-container {
  width: 420px;
  padding: 10px;
}

td {
  line-height: 28px;
}
</style>
