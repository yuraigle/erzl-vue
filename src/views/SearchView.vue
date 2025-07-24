<script setup lang="ts">
import { useFerzlStore } from '@/stores/ferzl.store'
import FerzlSearchForm from '@/components/PersonSearchForm.vue'
import PersonDetails from '@/components/PersonDetails.vue'
import PersonSearchResults from '@/components/PersonSearchResults.vue'

const ferzlStore = useFerzlStore()
</script>

<template>
  <div class="d-flex">
    <div class="search-container border-end px-3 py-0 flex-shrink-0">
      <h5 class="my-4">Параметры поиска</h5>
      <FerzlSearchForm />
    </div>
    <div class="container-fluid">
      <PersonSearchResults v-if="ferzlStore.personList && ferzlStore.personList.length > 0" />
      <PersonDetails v-if="ferzlStore.personData !== null" :pd="ferzlStore.personData" />
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
