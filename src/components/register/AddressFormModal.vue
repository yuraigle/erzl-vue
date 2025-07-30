<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, minValue, required } from '@vuelidate/validators'
import { useToastsStore, useFerzlStore, useRegisterStore } from '@/stores'
import type { RegisterAddressRequest } from '@/types'

import { Modal } from 'bootstrap'
import ErrorFeedback from '../ErrorFeedback.vue'

const form = reactive<RegisterAddressRequest>({
  okato: null,
  oksm: null,
  aoguid: null,
  hsguid: null,
  app_num: null,
  address_type: null,
  valid_from: null,
  valid_to: null,
})

const uuidFmt = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

const validations = {
  okato: {
    required: helpers.withMessage('Обязательное поле', required),
    mask: helpers.withMessage('Формат ОКАТО 5-11 цифр', helpers.regex(/^[0-9]{5,11}$/)),
  },
  oksm: {
    required: helpers.withMessage('Обязательное поле', required),
    mask: helpers.withMessage('3 латинских буквы', helpers.regex(/^[A-Z]{3}$/)),
  },
  aoguid: {
    required: helpers.withMessage('Обязательное поле', required),
    mask: helpers.withMessage('Формат UUID', helpers.regex(uuidFmt)),
  },
  hsguid: {
    mask: helpers.withMessage('Формат UUID', helpers.regex(uuidFmt)),
  },
  app_num: {},
  address_type: {
    required: helpers.withMessage('Обязательное поле', required),
    minValue: helpers.withMessage('Обязательное поле', minValue(1)),
  },
  valid_from: {},
  valid_to: {},
}

const v$ = useVuelidate(validations, form)
const ferzlStore = useFerzlStore()
const regStore = useRegisterStore()

const onSubmit = async () => {
  const isCorrect = await v$.value.$validate()
  if (!isCorrect) return

  const oip: string = ferzlStore.personData?.oip || ''
  if (!oip) {
    return useToastsStore().showError('Не найдена активная страховка')
  }

  regStore
    .registerAddress(oip, { ...form })
    .then(() => {
      useToastsStore().showMessage('Адрес добавлен', 'success')
      ferzlStore.searchOip(oip)
      closeModal()
    })
    .catch((err: string) => useToastsStore().showError(err))
}

const closeModal = () => {
  Modal.getOrCreateInstance(document.getElementById('modalAddressForm')).hide()
}

const onInputOksm = (e: Event) => {
  form.oksm = (e.target as HTMLInputElement).value
  form.oksm = form.oksm
    .replace(/[^a-zA-Z]+/g, '')
    .substring(0, 3)
    .toUpperCase()
}

const onInputOkato = (e: Event) => {
  form.okato = (e.target as HTMLInputElement).value
  form.okato = form.okato
    .replace(/[^0-9]+/g, '')
    .substring(0, 11)
}
</script>

<template>
  <div class="modal fade" id="modalAddressForm">
    <div class="modal-dialog modal-lg">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title">Добавление адреса</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_address_type" class="form-label inline wide small text-end pe-3">
                Тип адреса:
              </label>
            </div>
            <div class="flex-grow-1">
              <select
                id="form_address_type"
                class="form-select"
                :class="{ 'is-invalid': v$.address_type.$errors.length > 0 }"
                v-model="form.address_type"
              >
                <option value=""></option>
                <option value="1">1. Адрес регистрации по месту жительства</option>
                <option value="2">2. Адрес места пребывания</option>
                <option value="3">3. Адрес фактического проживания</option>
              </select>
              <ErrorFeedback :errors="v$.address_type.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_oksm" class="form-label inline wide small text-end pe-3">
                Код региона:
              </label>
            </div>
            <div class="flex-shrink-1">
              <input
                id="form_oksm"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.oksm.$errors.length > 0 }"
                :value="form.oksm"
                @input="onInputOksm"
                placeholder="ОКСМ"
                title="Код страны"
                style="width: 150px"
              />
              <ErrorFeedback :errors="v$.oksm.$errors" />
            </div>
            <div class="flex-grow-1 ms-2">
              <input
                id="form_okato"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.okato.$errors.length > 0 }"
                :value="form.okato"
                @input="onInputOkato"
                placeholder="ОКАТО"
                title="Код региона, района, города, села, населенного пункта из справочника ОКАТО"
              />
              <ErrorFeedback :errors="v$.okato.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_aoguid" class="form-label inline wide small text-end pe-3">
                Код ГАР с точностью до улицы:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_aoguid"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.aoguid.$errors.length > 0 }"
                v-model="form.aoguid"
              />
              <ErrorFeedback :errors="v$.aoguid.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_hsguid" class="form-label inline wide small text-end pe-3">
                Код ГАР с точностью до дома:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_hsguid"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.hsguid.$errors.length > 0 }"
                v-model="form.hsguid"
              />
              <ErrorFeedback :errors="v$.hsguid.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_app_num" class="form-label inline wide small text-end pe-3">
                Номер квартиры:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_app_num"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.app_num.$errors.length > 0 }"
                v-model="form.app_num"
              />
              <ErrorFeedback :errors="v$.app_num.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_valid_from" class="form-label inline wide small text-end pe-3">
                Срок действия:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_valid_from"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.valid_from.$errors.length > 0 }"
                v-model="form.valid_from"
              />
              <ErrorFeedback :errors="v$.valid_from.$errors" />
            </div>
            <div class="flex-shrink-1">
              <label for="form_valid_to" class="form-label inline small text-end px-2">
                &mdash;
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_valid_to"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.valid_to.$errors.length > 0 }"
                v-model="form.valid_to"
              />
              <ErrorFeedback :errors="v$.valid_to.$errors" />
            </div>
          </div>
          <!--  -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="submit" class="btn btn-primary" :disabled="regStore.isLoadingReg">
            Добавить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped>
label.inline {
  line-height: 38px;
  margin-bottom: 0;
  display: block;
}

.wide {
  width: 250px !important;
}

.invalid-feedback {
  font-size: smaller;
}
</style>
