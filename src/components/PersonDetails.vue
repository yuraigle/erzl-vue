<script setup lang="ts">
import { ref } from 'vue'
import type PersonData from '@/types/PersonData'
import PersonItemsTable from './details/PersonItemsTable.vue'
import DudlItemsTable from './details/DudlItemsTable.vue'
import PolicyItemsTable from './details/PolicyItemsTable.vue'
import SnilsItemsTable from './details/SnilsItemsTable.vue'
import AttachItemsTable from './details/AttachItemsTable.vue'
import ErnItemsTable from './details/ErnItemsTable.vue'
import SocialItemsTable from './details/SocialItemsTable.vue'
import ContactItemsTable from './details/ContactItemsTable.vue'
import AddressItemsTable from './details/AddressItemsTable.vue'
import ModalDetails from './details/ModalDetails.vue'

import { Modal } from 'bootstrap'

defineProps({
  pd: {
    type: Object as () => PersonData,
    required: true,
  },
})

const selectedObj = ref<object | null>(null)
const selectedType = ref<string>('')

const showDetails = (o1: object, type: string) => {
  selectedObj.value = o1
  selectedType.value = type

  const modalElement = document.getElementById('modalDetails')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.show()
}
</script>

<template>
  <h5>Подробная информация</h5>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-xl-2 row-cols-xxl-3">
      <div class="col">
        <PersonItemsTable :person="pd.person" @details="x => showDetails(x, '3.2.')" />
        <AddressItemsTable :address="pd.address" @details="x => showDetails(x, '3.5.')" />
        <ContactItemsTable :contact="pd.contact" @details="x => showDetails(x, '3.7.')" />
      </div>
      <div class="col">
        <DudlItemsTable :dudl="pd.dudl" @details="x => showDetails(x, '3.4.')" />
        <SnilsItemsTable :snils="pd.snils" @details="x => showDetails(x, '3.8.')" />
        <SocialItemsTable :social="pd.socialStatus" @details="x => showDetails(x, '3.9.')" />
      </div>
      <div class="col">
        <PolicyItemsTable :policy="pd.policy" @details="x => showDetails(x, '3.3.')" />
        <AttachItemsTable :attach="pd.attach" @details="x => showDetails(x, '3.6.')" />
        <ErnItemsTable :ern="pd.ern" @details="x => showDetails(x, '3.10.')" />
      </div>
    </div>
  </div>
  <ModalDetails :obj="selectedObj" :type="selectedType" />
</template>
