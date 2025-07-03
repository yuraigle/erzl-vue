<script setup lang="ts">
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

defineProps({
  pd: {
    type: Object as () => PersonData,
    required: true,
  },
})
</script>

<template>
  <h5>Подробная информация</h5>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-xl-2 row-cols-xxl-3">
      <div class="col">
        <PersonItemsTable :person="pd.person" />
        <ContactItemsTable :contact="pd.contact" />
        <AddressItemsTable :address="pd.address" />
      </div>
      <div class="col">
        <DudlItemsTable :dudl="pd.dudl" />
        <SnilsItemsTable :snils="pd.snils" />
      </div>
      <div class="col">
        <PolicyItemsTable :policy="pd.policy" />
        <AttachItemsTable :attach="pd.attach" />
      </div>
      <div class="col">
        <SocialItemsTable :social="pd.socialStatus" />
        <ErnItemsTable :ern="pd.ern" />
      </div>
    </div>
  </div>
</template>
