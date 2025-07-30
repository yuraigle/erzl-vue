<script setup lang="ts">
import { reactive, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, minValue, required } from '@vuelidate/validators'
import { useToastsStore, useFerzlStore, useRegisterStore } from '@/stores'
import type { RegisterDudlRequest, PersonItem } from '@/types'
import { F011, f011DocName } from '@/nsi/f011'
import { formatDateYmd } from '@/utils'

import { Modal } from 'bootstrap'
import ErrorFeedback from '../ErrorFeedback.vue'

const props = defineProps({
  oip: String,
})

const form = reactive<RegisterDudlRequest>({
  dudl_ser: '',
  dudl_num: '',
  dudl_date_b: null,
  dudl_date_e: null,
  dudl_type: null,
  issuer: null,
  issuer_oksm: null,
  ctzn_oksm: null,
  no_citizenship: false,
  descr: null,
  surname: '',
  patronymic: null,
  first_name: '',
  birth_day: null,
  birthplace: null,
  gender: 0,
  birth_oksm: null,
  dost: null,
  dudl_code_division: null,
})

const validations = {
  dudl_ser: {},
  dudl_num: {
    required: helpers.withMessage('Обязательное поле', required),
    mask: helpers.withMessage('Формат номера ДУДЛ - только цифры', helpers.regex(/^\d+$/)),
  },
  dudl_date_b: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  dudl_date_e: {},
  dudl_type: {
    required: helpers.withMessage('Обязательное поле', required),
    required2: helpers.withMessage('Обязательное поле', helpers.regex(/^\d+$/)),
  },
  issuer: {},
  issuer_oksm: {},
  ctzn_oksm: {},
  no_citizenship: {},
  descr: {},
  surname: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  patronymic: {},
  first_name: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  birth_day: {
    required: helpers.withMessage('Обязательное поле', required),
  },
  birthplace: {},
  gender: {
    required: helpers.withMessage('Обязательное поле', required),
    required2: helpers.withMessage('Обязательное поле', minValue(1)),
  },
  birth_oksm: {},
  dost: {},
  dudl_code_division: {},
}

const v$ = useVuelidate(validations, form)
const ferzlStore = useFerzlStore()
const regStore = useRegisterStore()

watch(
  () => props.oip,
  (v1: string | undefined, v0: string | undefined) => {
    if (v1 && v1 != v0) {
      const personItems: PersonItem[] = ferzlStore.personData?.person.personItems || []
      const personItem: PersonItem = personItems[0]
      form.surname = personItem.surname
      form.patronymic = personItem.patronymic
      form.first_name = personItem.firstName
      form.birth_day = formatDateYmd(personItem.birthDay)
      form.gender = personItem.gender
      form.birth_oksm = personItem.birthOksm
    }
  },
  { immediate: true },
)

const onSubmit = async () => {
  const isCorrect = await v$.value.$validate()
  if (!isCorrect) return

  const oip: string = ferzlStore.personData?.oip || ''
  if (!oip) {
    return useToastsStore().showError('Не найдена активная страховка')
  }

  regStore
    .registerDudl(oip, { ...form })
    .then(() => {
      useToastsStore().showMessage('Документ добавлен', 'success')
      ferzlStore.searchOip(oip)
      closeModal()
    })
    .catch((err: string) => useToastsStore().showError(err))
}

const closeModal = () => {
  Modal.getOrCreateInstance(document.getElementById('modalDudlForm')).hide()
}

const onChangeNoCitizenship = () => {
  if (form.no_citizenship) {
    form.ctzn_oksm = 'Б/Г'
  } else {
    form.ctzn_oksm = null
  }
}
</script>

<template>
  <div class="modal fade" id="modalDudlForm" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title">Добавление документа</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_dudl_type" class="form-label inline wide small text-end pe-3">
                Тип документа:
              </label>
            </div>
            <div class="flex-grow-1">
              <select
                id="form_dudl_type"
                class="form-select"
                :class="{ 'is-invalid': v$.dudl_type.$errors.length > 0 }"
                v-model="form.dudl_type"
              >
                <option value=""></option>
                <option value="14">14 - {{ f011DocName('14') }}</option>
                <option value="3">3 - {{ f011DocName('3') }}</option>
                <option
                  v-for="n in Object.values(F011)
                    .map((n) => n.type)
                    .filter((n) => n != '3' && n != '14')"
                  :value="n"
                  :key="n"
                >
                  {{ n }} - {{ f011DocName(n) }}
                </option>
              </select>
              <ErrorFeedback :errors="v$.dudl_type.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_dudl_ser" class="form-label inline wide small text-end pe-3">
                Серия и номер:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_dudl_ser"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.dudl_ser.$errors.length > 0 }"
                v-model="form.dudl_ser"
              />
              <ErrorFeedback :errors="v$.dudl_ser.$errors" />
            </div>
            <div class="flex-shrink-1">
              <label for="form_dudl_num" class="form-label inline small text-end px-2"> № </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_dudl_num"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.dudl_num.$errors.length > 0 }"
                v-model="form.dudl_num"
              />
              <ErrorFeedback :errors="v$.dudl_num.$errors" />
            </div>

            <div class="flex-grow-1" v-if="form.dudl_type == '14'">
              <input
                id="form_dudl_code_division"
                type="text"
                class="form-control ms-2"
                :class="{ 'is-invalid': v$.dudl_code_division.$errors.length > 0 }"
                v-model="form.dudl_code_division"
                placeholder="000-000"
                title="Код подразделения"
                style="width: 100px"
              />
              <ErrorFeedback :errors="v$.dudl_code_division.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_dudl_date_b" class="form-label inline wide small text-end pe-3">
                Срок действия документа:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_dudl_date_b"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.dudl_date_b.$errors.length > 0 }"
                v-model="form.dudl_date_b"
                title="Дата начала действия документа"
              />
              <ErrorFeedback :errors="v$.dudl_date_b.$errors" />
            </div>
            <div class="flex-shrink-1">
              <label for="form_dudl_date_e" class="form-label inline small text-end px-2">
                &mdash;
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_dudl_date_e"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.dudl_date_e.$errors.length > 0 }"
                v-model="form.dudl_date_e"
                title="Дата окончания действия документа, расчётная или фактическая"
              />
              <ErrorFeedback :errors="v$.dudl_date_e.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_issuer_oksm" class="form-label inline wide small text-end pe-3">
                Кем выдан документ:
              </label>
            </div>
            <div class="flex-shrink-1">
              <input
                id="form_issuer_oksm"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.issuer_oksm.$errors.length > 0 }"
                v-model="form.issuer_oksm"
                placeholder="ОКСМ"
                title="Код страны, выдавшей документ"
                style="width: 75px"
              />
              <ErrorFeedback :errors="v$.issuer_oksm.$errors" />
            </div>
            <div class="flex-grow-1 ms-3">
              <input
                id="form_issuer"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.issuer.$errors.length > 0 }"
                placeholder="Наименование органа, выдавшего документ"
                title="Наименование органа, выдавшего документ"
                v-model="form.issuer"
              />
              <ErrorFeedback :errors="v$.issuer.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_ctzn_oksm" class="form-label inline wide small text-end pe-3">
                Гражданство:
              </label>
            </div>
            <div>
              <input
                id="form_ctzn_oksm"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.ctzn_oksm.$errors.length > 0 }"
                v-model="form.ctzn_oksm"
                placeholder="ОКСМ"
                title="Код страны гражданства"
                style="width: 75px"
                :disabled="form.no_citizenship"
              />
              <span v-if="v$.ctzn_oksm.$error" class="invalid-feedback">
                {{ v$.ctzn_oksm.$errors[0].$message }}
              </span>
            </div>
            <div class="form-check ms-3">
              <label class="form-check-label mt-2">
                <input
                  id="form_no_citizenship"
                  type="checkbox"
                  class="form-check-input"
                  v-model="form.no_citizenship"
                  @change="onChangeNoCitizenship"
                />
                Без гражданства
              </label>
            </div>
          </div>
          <!--  -->
          <hr />

          <div class="my-2 d-flex">
            <div>
              <label for="form_surname" class="form-label inline wide small text-end pe-3">
                ФИО:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_surname"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.surname.$errors.length > 0 }"
                v-model="form.surname"
                placeholder="Фамилия"
              />
              <ErrorFeedback :errors="v$.surname.$errors" />
            </div>
            <div class="flex-grow-1 ms-2">
              <input
                id="form_first_name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.first_name.$errors.length > 0 }"
                v-model="form.first_name"
                placeholder="Имя"
              />
              <ErrorFeedback :errors="v$.first_name.$errors" />
            </div>
            <div class="flex-grow-1 ms-2">
              <input
                id="form_patronymic"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.patronymic.$errors.length > 0 }"
                v-model="form.patronymic"
                placeholder="Отчество"
              />
              <ErrorFeedback :errors="v$.patronymic.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_birth_day" class="form-label inline wide small text-end pe-3">
                Дата рождения:
              </label>
            </div>
            <div class="flex-shrink-1">
              <input
                id="form_birth_day"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.birth_day.$errors.length > 0 }"
                v-model="form.birth_day"
              />
              <ErrorFeedback :errors="v$.birth_day.$errors" />
            </div>
            <div class="ms-3">
              <div class="d-flex mt-2 mb-2" :class="{ 'is-invalid': v$.gender.$errors.length > 0 }">
                <label
                  class="form-checklabel"
                  :class="{ 'is-invalid': v$.gender.$errors.length > 0 }"
                  >Пол:</label
                >
                <input
                  id="form_gender_1"
                  type="radio"
                  class="form-check-input ms-3"
                  v-model="form.gender"
                  value="1"
                />
                <label class="form-check-label ps-2" for="form_gender_1"> Муж </label>

                <input
                  id="form_gender_2"
                  type="radio"
                  class="form-check-input ms-2"
                  v-model="form.gender"
                  value="2"
                />
                <label class="form-check-label ps-2" for="form_gender_2"> Жен </label>
              </div>
              <ErrorFeedback :errors="v$.gender.$errors" />
            </div>
          </div>
          <!--  -->
          <div class="my-2 d-flex">
            <div>
              <label for="form_birth_oksm" class="form-label inline wide small text-end pe-3">
                Место рождения:
              </label>
            </div>
            <div class="flex-shrink-1">
              <input
                id="form_birth_oksm"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.birth_oksm.$errors.length > 0 }"
                v-model="form.birth_oksm"
                placeholder="ОКСМ"
                title="Код страны рождения"
                style="width: 75px"
              />
              <ErrorFeedback :errors="v$.birth_oksm.$errors" />
            </div>
            <div class="flex-grow-1 ms-2">
              <input
                id="form_birthplace"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.birthplace.$errors.length > 0 }"
                v-model="form.birthplace"
                placeholder="Место рождения, как на документе"
              />
              <ErrorFeedback :errors="v$.birthplace.$errors" />
            </div>
          </div>

          <div class="my-2 d-flex">
            <div>
              <label for="form_descr" class="form-label inline wide small text-end pe-3">
                Описание:
              </label>
            </div>
            <div class="flex-grow-1">
              <input
                id="form_descr"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.descr.$errors.length > 0 }"
                v-model="form.descr"
                placeholder="Служебное поле"
              />
              <ErrorFeedback :errors="v$.descr.$errors" />
            </div>

            <div class="flex-shrink-1 ms-2">
              <input
                id="form_dost"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.dost.$errors.length > 0 }"
                v-model="form.dost"
                placeholder="Код дост."
                title="Код достоверности, 1-6"
                style="width: 100px"
              />
              <ErrorFeedback :errors="v$.dost.$errors" />
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
  width: 250px !important;
}

.invalid-feedback {
  font-size: smaller;
}
</style>
