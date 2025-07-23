<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { useToastsStore, useFerzlStore, useRegisterStore } from '@/stores'
import type { RegisterSnilsRequest } from '@/stores/register.store'

import { Modal } from 'bootstrap'

const form = reactive({
  ss: '',
})

const validations = {
  ss: {
    required: helpers.withMessage('Обязательное поле', required),
    mask: helpers.withMessage('Формат СНИЛС - 11 цифр', helpers.regex(/^\d{3}-\d{3}-\d{3} \d{2}$/)),
  },
}

const v$ = useVuelidate(validations, form)

const ferzlStore = useFerzlStore()
const regStore = useRegisterStore()

const onInputSs = (e: Event) => {
  form.ss = (e.target as HTMLInputElement).value
  form.ss = form.ss
    .replace(/[^\d]+/g, '')
    .substring(0, 11)
    .replace(/^(\d{9})(\d)/, '$1 $2')
    .replace(/^(\d{6})(\d)/, '$1-$2')
    .replace(/^(\d{3})(\d)/, '$1-$2')
}

const onSubmit = async () => {
  const isCorrect = await v$.value.$validate()
  if (!isCorrect) return

  const oip: string = ferzlStore.personData?.oip || ''

  if (!oip) {
    return useToastsStore().showError('Не найдена активная страховка')
  }

  const dto: RegisterSnilsRequest = { ...form, oip }

  regStore
    .registerSnils(dto)
    .then(() => {
      useToastsStore().showMessage('СНИЛС добавлен', 'success')
      ferzlStore.searchOip(oip)
      closeModal()
    })
    .catch((err: string) => useToastsStore().showError(err))
}

const closeModal = () => {
  const modalElement = document.getElementById('modalSnilsForm')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.hide()
}
</script>

<template>
  <div class="modal fade" id="modalSnilsForm">
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title">Добавление СНИЛС</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="my-2 d-flex">
            <div>
              <label for="form_ss" class="form-label inline wide small text-end pe-3">
                СНИЛС:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_ss"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.ss.$errors.length > 0 }"
                :value="form.ss"
                @input="onInputSs"
              />
              <span v-if="v$.ss.$error" class="invalid-feedback">
                {{ v$.ss.$errors[0].$message }}
              </span>
            </div>
          </div>
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
  width: 100px !important;
}

.invalid-feedback {
  font-size: smaller;
}
</style>
