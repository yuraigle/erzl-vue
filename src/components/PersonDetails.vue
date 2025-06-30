<script setup lang="ts">
import { defineProps } from 'vue'
import type PersonData from '@/types/PersonData'
import PersonItemsTable from './PersonItemsTable.vue'
import DudlItemsTable from './DudlItemsTable.vue'
import PolicyItemsTable from './PolicyItemsTable.vue'
import SnilsItemsTable from './SnilsItemsTable.vue'
import AttachItemsTable from './AttachItemsTable.vue'
import ErnItemsTable from './ErnItemsTable.vue'
import SocialItemsTable from './SocialItemsTable.vue'
import ContactItemsTable from './ContactItemsTable.vue'
import AddressItemsTable from './AddressItemsTable.vue'

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
    <div class="row">
      <div class="col-4">
        <PersonItemsTable :person-items="pd.person.personItems" v-if="pd.person" />
        <ContactItemsTable :contact-items="pd.contact.contactItems" v-if="pd.contact" />
        <AddressItemsTable :address-items="pd.address.addressItems" v-if="pd.address" />
      </div>
      <div class="col-4">
        <DudlItemsTable :dudl-items="pd.dudl.dudlItems" v-if="pd.dudl" />
        <SnilsItemsTable :snils-items="pd.snils.snilsItems" v-if="pd.snils" />
        <SocialItemsTable
          :social-items="pd.socialStatus.socialStatusItems"
          v-if="pd.socialStatus"
        />
        <ErnItemsTable :ern-items="pd.ern.ernItems" v-if="pd.ern" />
      </div>
      <div class="col-4">
        <PolicyItemsTable :policy-items="pd.policy.policyItems" v-if="pd.policy" />
        <AttachItemsTable :attach-items="pd.attach.attachItems" v-if="pd.attach" />
      </div>
    </div>
  </div>
</template>
