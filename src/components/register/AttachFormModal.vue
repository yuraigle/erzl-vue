<script setup lang="ts">
import type { F032, F033, RegisterAttachRequest } from '@/stores/attach.store'

import { ref, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, minValue, required } from '@vuelidate/validators'
import { useAttachStore, useToastsStore, useFerzlStore } from '@/stores'

import { Modal } from 'bootstrap'

const form = reactive({
  date_attach_b: null,
  date_attach_e: null,
  attach_method: 0,
  area_type: 0,
  area_id: '',
  mo_id: '',
  mo_code: '',
  mo_f_id: '',
  doctor_id: '',
  snils_doctor: '',
  doctor_since: null,
  mo_dep_id: '',
})

const validations = {
  date_attach_b: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  date_attach_e: {},
  attach_method: {
    minValue: helpers.withMessage('Обязательное поле', minValue(1)),
  },
  area_type: {
    minValue: helpers.withMessage('Обязательное поле', minValue(1)),
  },
  area_id: {},
  mo_id: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  mo_code: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  mo_f_id: {},
  doctor_id: {},
  snils_doctor: {
    mask: helpers.withMessage('Формат СНИЛС - 11 цифр', helpers.regex(/^\d{3}-\d{3}-\d{3} \d{2}$/)),
  },
  doctor_since: {},
  mo_dep_id: {
    required: helpers.withMessage('Обязательное поле', required),
  },
}

const v$ = useVuelidate(validations, form)

const attachStore = useAttachStore()
const ferzlStore = useFerzlStore()

const moObj = ref<F032 | null>(null)
const spmoList = ref<Array<F033> | null>(null)

const onInputMoCode = (e: Event) => {
  const oldVal = form.mo_code

  form.mo_code = (e.target as HTMLInputElement).value
  form.mo_code = form.mo_code.replace(/[^\d]+/g, '').substring(0, 6)

  if (oldVal == form.mo_code) return

  if (form.mo_code.length == 6) {
    attachStore.searchF032(form.mo_code).then(
      (res) => {
        moObj.value = res
        form.mo_id = res.oidMo
      },
      (err) => {
        moObj.value = null
        form.mo_id = ''
        useToastsStore().showError(err)
      },
    )

    attachStore.searchF033(form.mo_code).then(
      (res) => {
        spmoList.value = res
        form.mo_dep_id = ''
      },
      (err) => {
        spmoList.value = null
        form.mo_dep_id = ''
        useToastsStore().showError(err)
      }
    )
  } else {
    moObj.value = null
    spmoList.value = null
    form.mo_id = ''
    form.mo_dep_id = ''
  }
}

const onInputSs = (e: Event) => {
  form.snils_doctor = (e.target as HTMLInputElement).value
  form.snils_doctor = form.snils_doctor
    .replace(/[^\d]+/g, '')
    .substring(0, 11)
    .replace(/^(\d{9})(\d)/, '$1 $2')
    .replace(/^(\d{6})(\d)/, '$1-$2')
    .replace(/^(\d{3})(\d)/, '$1-$2')
}

const onSubmit = async () => {
  const isCorrect = await v$.value.$validate()

  if (isCorrect) {
    const oip = ferzlStore.personData?.oip || null
    const enp = ferzlStore.personData?.policy?.policyItems
      .find(p => p.pcyStatus.startsWith('Д'))?.enp || null

    if (!oip || !enp) {
      useToastsStore().showError('Не найдена активная страховка');
      return;
    }

    const dto = {...form, enp} as RegisterAttachRequest

    attachStore.registerAttach(dto)
      .then(() => {
        ferzlStore.searchOip(oip)
        closeModal()
      })
      .catch((e: Error) => {
        useToastsStore().showError(e.message);
      })
  }
}

const closeModal = () => {
  const modalElement = document.getElementById('modalAttachForm')
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.hide()
}
</script>

<template>
  <div class="modal fade" id="modalAttachForm">
    <div class="modal-dialog modal-lg">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title">Добавление прикрепления</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-2 d-flex">
            <div>
              <label for="date_attach_b" class="form-label inline wide small text-end pe-3">
                Дата прикрепления:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="date_attach_b"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.date_attach_b.$errors.length > 0 }"
                v-model="form.date_attach_b"
              />
              <span v-if="v$.date_attach_b.$error" class="invalid-feedback">
                {{ v$.date_attach_b.$errors[0].$message }}
              </span>
            </div>
            <div>
              <label for="date_attach_e" class="form-label small inline text-end px-2">
                &mdash;
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="date_attach_e"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.date_attach_e.$errors.length > 0 }"
                v-model="form.date_attach_e"
              />
              <span v-if="v$.date_attach_e.$error" class="invalid-feedback">
                {{ v$.date_attach_e.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="mb-2 d-flex">
            <div>
              <label for="attach_method" class="form-label inline wide small text-end pe-3">
                Способ прикрепления:
              </label>
            </div>
            <div class="flex-grow-1">
              <select
                id="attach_method"
                class="form-select"
                :class="{ 'is-invalid': v$.attach_method.$errors.length > 0 }"
                v-model="form.attach_method"
              >
                <option value="0"></option>
                <option value="1">1. По месту регистрации</option>
                <option value="2">2. По личному заявлению</option>
                <option value="3">3. По заявлению в электронном виде</option>
              </select>
              <span v-if="v$.attach_method.$error" class="invalid-feedback">
                {{ v$.attach_method.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="mb-0 d-flex">
            <div>
              <label for="mo_code" class="form-label inline wide small text-end pe-3">
                Код МО:
              </label>
            </div>
            <div>
              <input
                id="mo_code"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.mo_code.$errors.length > 0 }"
                @input="onInputMoCode"
                :value="form.mo_code"
                placeholder="6-значный"
              />
              <span v-if="v$.mo_code.$error" class="invalid-feedback">
                {{ v$.mo_code.$errors[0].$message }}
              </span>
            </div>
            <div class="flex-grow-1 ps-3">
              <label for="mo_id" class="form-label d-none"></label>
              <input
                id="mo_id"
                type="text"
                class="form-control"
                disabled
                :class="{ 'is-invalid': v$.mo_id.$errors.length > 0 }"
                v-model="form.mo_id"
                placeholder="OID в ФРМО"
              />
              <span v-if="v$.mo_id.$error" class="invalid-feedback">
                {{ v$.mo_id.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="d-flex mt-1">
            <div class="small wide"></div>
            <div class="small text-muted">{{ moObj?.namMok }}</div>
          </div>

          <div class="my-2 d-flex">
            <div>
              <label for="area_type" class="form-label inline wide small text-end pe-3">
                Тип участка:
              </label>
            </div>
            <div class="flex-grow-1">
              <select
                id="area_type"
                class="form-select"
                :class="{ 'is-invalid': v$.area_type.$errors.length > 0 }"
                v-model="form.area_type"
              >
                <option value="0"></option>
                <option value="1">1. Терапевт</option>
                <option value="2">2. Женская консультация</option>
                <option value="3">3. Стоматолог</option>
                <option value="4">4. СМП</option>
                <option value="5">5. ФАП</option>
              </select>
              <span v-if="v$.area_type.$error" class="invalid-feedback">
                {{ v$.area_type.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="mt-2 d-flex">
            <div>
              <label for="mo_dep_id" class="form-label inline wide small text-end pe-3">
                Подразделение МО:
              </label>
            </div>
            <div class="flex-grow-1">
              <select
                id="mo_dep_id"
                class="form-select"
                :class="{ 'is-invalid': v$.mo_dep_id.$errors.length > 0 }"
                v-model="form.mo_dep_id"
              >
                <option value=""></option>
                <option v-for="sp in spmoList" :key="sp.uidspmo" :value="sp.oidSpmo"
                  :style="{'font-weight': sp.areaType == form.area_type ? 'bold' : 'normal'}"
                  :title="sp.namSkSpmo"
                >
                  {{ sp.oidSpmo?.replace(/^.*\./, '') }} - {{ sp.namSkSpmo.replace(/^(.{45}).*/, '$1...') }}
                </option>
              </select>
              <span v-if="v$.mo_dep_id.$error" class="invalid-feedback">
                {{ v$.mo_dep_id.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="d-flex mt-1">
            <div class="small wide"></div>
            <div class="small text-muted">{{ form.mo_dep_id }}</div>
          </div>

          <div class="my-2 d-flex">
            <div>
              <label for="area_id" class="form-label inline wide small text-end text-muted pe-3">
                ИД участка:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="area_id"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.area_id.$errors.length > 0 }"
                v-model="form.area_id"
                placeholder="GUID участка прикрепления в ФРМО"
              />
              <span v-if="v$.area_id.$error" class="invalid-feedback">
                {{ v$.area_id.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="mb-2 d-flex">
            <div>
              <label for="mo_f_id" class="form-label inline wide small text-end text-muted pe-3">
                ИД филиала:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="mo_f_id"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.mo_f_id.$errors.length > 0 }"
                v-model="form.mo_f_id"
                placeholder="OID филиала МО в ФРМО"
              />
              <span v-if="v$.mo_f_id.$error" class="invalid-feedback">
                {{ v$.mo_f_id.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="mb-2 d-flex">
            <div>
              <label for="snils_doctor" class="form-label inline wide small text-end pe-3">
                Медработник:
              </label>
            </div>
            <div>
              <input
                id="snils_doctor"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.snils_doctor.$errors.length > 0 }"
                :value="form.snils_doctor"
                @input="onInputSs"
                placeholder="СНИЛС"
              />
              <span v-if="v$.snils_doctor.$error" class="invalid-feedback">
                {{ v$.snils_doctor.$errors[0].$message }}
              </span>
            </div>
            <div class="flex-grow-1 ps-3">
              <label for="doctor_id" class="form-label d-none"></label>
              <input
                id="doctor_id"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.doctor_id.$errors.length > 0 }"
                v-model="form.doctor_id"
                placeholder="OID в ФРМР"
              />
              <span v-if="v$.doctor_id.$error" class="invalid-feedback">
                {{ v$.doctor_id.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="mb-2 d-flex">
            <div>
              <label for="doctor_since" class="form-label inline wide small text-end pe-3">
                Дата прикрепления к врачу:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="doctor_since"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.doctor_since.$errors.length > 0 }"
                v-model="form.doctor_since"
              />
              <span v-if="v$.doctor_since.$error" class="invalid-feedback">
                {{ v$.doctor_since.$errors[0].$message }}
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="submit" class="btn btn-primary" :disabled="attachStore.isLoadingReg">Добавить</button>
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
