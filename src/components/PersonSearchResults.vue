<script setup lang="ts">
import { useFerzlStore } from '@/stores/ferzl.store'
import { formatDate } from '@/utils'

const ferzlStore = useFerzlStore()

const pagesCount = () => {
  const items = ferzlStore.pagination?.count
  const itemsPerPage = ferzlStore.pagination?.itemPerPage

  if (!items || !itemsPerPage) {
    return 0
  }

  return Math.ceil(items / itemsPerPage)
}

const hasPagination = (): boolean => {
  return ferzlStore.pagination != null && pagesCount() > 1
}

const setPage = (n: number) => {
  ferzlStore.searchCriteriaPage(n)
}

const itemsStartIndex = () => {
  if (ferzlStore.pagination) {
    return ferzlStore.pagination.itemPerPage * (ferzlStore.pagination.pageNumber - 1);
  }
  return 0;
}
</script>

<template>
  <h5 class="mt-4">
    Найденные персоны
    <span v-if="ferzlStore.pagination && ferzlStore.pagination.count > 1">
      ({{ ferzlStore.pagination?.count }})
    </span>
  </h5>

  <table class="table table-hover">
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
        <td>{{ itemsStartIndex() + index + 1 }}</td>
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

  <nav v-if="ferzlStore.pagination && hasPagination()">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: ferzlStore.pagination?.pageNumber == 1 }">
        <button
          class="page-link"
          type="button"
          @click="setPage(ferzlStore.pagination.pageNumber - 1)"
        >
          &larr;
        </button>
      </li>
      <li class="page-item disabled">
        <button class="page-link" type="button">
          {{ ferzlStore.pagination?.pageNumber }} / {{ pagesCount() }}
        </button>
      </li>
      <li
        class="page-item"
        :class="{ disabled: ferzlStore.pagination?.pageNumber == pagesCount() }"
      >
        <button
          class="page-link"
          type="button"
          @click="setPage(ferzlStore.pagination.pageNumber + 1)"
        >
          &rarr;
        </button>
      </li>
    </ul>
  </nav>
</template>
