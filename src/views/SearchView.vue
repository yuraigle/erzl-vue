<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, maxLength } from '@vuelidate/validators'

import EraserIcon from '@/components/icons/EraserIcon.vue'

const form = reactive({
  enp: '',
  ss: '',
  doc_t: 0,
  doc_s: '',
  doc_n: '',
  fam: '',
  im: '',
  ot: '',
  dr_from: '',
  dr_to: '',
  okato: '',
  oip: '',
  oip_selected: false,
})

const validations = {
  enp: {
    mask: helpers.withMessage('Формат ЕНП - 16 цифр', helpers.regex(/^\d{4} \d{4} \d{4} \d{4}$/)),
  },
  ss: {
    mask: helpers.withMessage('Формат СНИЛС - 11 цифр', helpers.regex(/^\d{3}-\d{3}-\d{3} \d{2}$/)),
  },
  doc_s: {
    maxLength: helpers.withMessage('Максимум 10 символов', maxLength(10)),
  },
  doc_n: {
    maxLength: helpers.withMessage('Максимум 20 символов', maxLength(20)),
  },
  fam: {
    mask: helpers.withMessage('Некорректные символы', helpers.regex(/^[А-ЯЁа-яё \-']{0,40}$/)),
  },
  im: {
    mask: helpers.withMessage('Некорректные символы', helpers.regex(/^[А-ЯЁа-яё \-']{0,40}$/)),
  },
  ot: {
    mask: helpers.withMessage('Некорректные символы', helpers.regex(/^[А-ЯЁа-яё \-']{0,40}$/)),
  },
  okato: {
    mask: helpers.withMessage('Формат OKATO - 5 цифр', helpers.regex(/^\d{5}$/)),
  },
  oip: {
    mask: helpers.withMessage('Формат OIP - 12 цифр', helpers.regex(/^\d{12}$/)),
  },
}

const v$ = useVuelidate(validations, form)

const onSubmit = async () => {
  const isCorrect = await v$.value.$validate()

  if (isCorrect) {
    console.log('OK')
  } else {
    console.log('Errors')
  }
}

const onInputEnp = (e: Event) => {
  form.enp = (e.target as HTMLInputElement).value
  form.enp = form.enp
    .replace(/[^\d]+/g, '')
    .substring(0, 16)
    .replace(/^(\d{12})(\d)/, '$1 $2')
    .replace(/^(\d{8})(\d)/, '$1 $2')
    .replace(/^(\d{4})(\d)/, '$1 $2')
}

const onInputSs = (e: Event) => {
  form.ss = (e.target as HTMLInputElement).value
  form.ss = form.ss
    .replace(/[^\d]+/g, '')
    .substring(0, 11)
    .replace(/^(\d{9})(\d)/, '$1 $2')
    .replace(/^(\d{6})(\d)/, '$1-$2')
    .replace(/^(\d{3})(\d)/, '$1-$2')
}

const onInputOkato = (e: Event) => {
  form.okato = (e.target as HTMLInputElement).value
  form.okato = form.okato.replace(/[^\d]+/g, '').substring(0, 5)
}

const onInputOip = (e: Event) => {
  form.oip = (e.target as HTMLInputElement).value
  form.oip = form.oip.replace(/[^\d]+/g, '').substring(0, 12)
}

const maskFio = (s: string) => {
  return s.replace(/[^А-ЯЁа-яё \-']+/g, '').substring(0, 40)
}

const onInputFam = (e: Event) => {
  form.fam = (e.target as HTMLInputElement).value
  form.fam = maskFio(form.fam)
}

const onInputIm = (e: Event) => {
  form.im = (e.target as HTMLInputElement).value
  form.im = maskFio(form.im)
}

const onInputOt = (e: Event) => {
  form.ot = (e.target as HTMLInputElement).value
  form.ot = maskFio(form.ot)
}

const clearForm = () => {
  form.enp = ''
  form.ss = ''
  form.doc_t = 0
  form.doc_s = ''
  form.doc_n = ''
  form.fam = ''
  form.im = ''
  form.ot = ''
  form.dr_from = ''
  form.dr_to = ''
  form.okato = ''
  form.oip = ''
  form.oip_selected = false
}
</script>

<template>
  <div class="d-flex">
    <div class="search-container border-end px-3 flex-shrink-0">
      <h5 class="my-4">Параметры поиска</h5>
      <form @submit.prevent="onSubmit">
        <div class="mb-2 d-flex">
          <div>
            <label for="enp" class="form-label inline small">ЕНП</label>
          </div>
          <div class="flex-grow-1">
            <input
              id="enp"
              type="text"
              class="form-control"
              @input="onInputEnp"
              :value="form.enp"
              :class="{ 'is-invalid': v$.enp.$errors.length > 0 }"
              :disabled="form.oip_selected"
            />
            <span v-if="v$.enp.$error" class="invalid-feedback">
              {{ v$.enp.$errors[0].$message }}
            </span>
          </div>
        </div>

        <div class="mb-2 d-flex">
          <div>
            <label for="ss" class="form-label inline small">СНИЛС</label>
          </div>
          <div class="flex-grow-1">
            <input
              id="ss"
              type="text"
              class="form-control"
              @input="onInputSs"
              :value="form.ss"
              :class="{ 'is-invalid': v$.ss.$errors.length > 0 }"
              :disabled="form.oip_selected"
            />
            <span v-if="v$.ss.$errors.length > 0" class="invalid-feedback">
              {{ v$.ss.$errors[0].$message }}
            </span>
          </div>
        </div>

        <div class="mb-2">
          <label for="doc_t" class="d-none"></label>
          <select id="doc_t" class="form-select" v-model="form.doc_t" :disabled="form.oip_selected">
            <option value="0">Выбрать документ</option>
            <option value="14">14 - Паспорт гражданина РФ</option>
            <option value="3">3 - Свидетельство о рождении, выданное в РФ</option>
          </select>
        </div>

        <div class="mb-4 d-flex">
          <div>
            <label for="doc_s" class="d-none"></label>
            <input
              id="doc_s"
              type="text"
              class="form-control"
              placeholder="Серия"
              v-model="form.doc_s"
              :class="{ 'is-invalid': v$.doc_s.$errors.length > 0 }"
              :disabled="form.doc_t == 0 || form.oip_selected"
            />
            <span v-if="v$.doc_s.$errors.length > 0" class="invalid-feedback">
              {{ v$.doc_s.$errors[0].$message }}
            </span>
          </div>

          <div class="mx-2 doc-num-symbol">№</div>

          <div>
            <label for="doc_n" class="d-none"></label>
            <input
              id="doc_n"
              type="text"
              class="form-control"
              placeholder="Номер"
              v-model="form.doc_n"
              :class="{ 'is-invalid': v$.doc_n.$errors.length > 0 }"
              :disabled="form.doc_t == 0 || form.oip_selected"
            />
            <span v-if="v$.doc_n.$errors.length > 0" class="invalid-feedback">
              {{ v$.doc_n.$errors[0].$message }}
            </span>
          </div>

        </div>

        <hr />

        <div class="mb-2 d-flex">
          <div>
            <label for="fam" class="form-label inline small">Фамилия</label>
          </div>
          <div class="flex-grow-1">
            <input
              id="fam"
              type="text"
              class="form-control"
              @input="onInputFam"
              :value="form.fam"
              :class="{ 'is-invalid': v$.fam.$errors.length > 0 }"
              :disabled="form.oip_selected"
            />
            <span v-if="v$.fam.$errors.length > 0" class="invalid-feedback">
              {{ v$.fam.$errors[0].$message }}
            </span>
          </div>
        </div>

        <div class="mb-2 d-flex">
          <div>
            <label for="im" class="form-label inline small">Имя</label>
          </div>
          <div class="flex-grow-1">
            <input
              id="im"
              type="text"
              class="form-control"
              @input="onInputIm"
              :value="form.im"
              :class="{ 'is-invalid': v$.im.$errors.length > 0 }"
              :disabled="form.oip_selected"
            />
            <span v-if="v$.im.$errors.length > 0" class="invalid-feedback">
              {{ v$.im.$errors[0].$message }}
            </span>
          </div>
        </div>

        <div class="mb-2 d-flex">
          <div>
            <label for="ot" class="form-label inline small">Отчество</label>
          </div>
          <div class="flex-grow-1">
            <input
              id="ot"
              type="text"
              class="form-control"
              @input="onInputOt"
              :value="form.ot"
              :class="{ 'is-invalid': v$.ot.$errors.length > 0 }"
              :disabled="form.oip_selected"
            />
            <span v-if="v$.ot.$errors.length > 0" class="invalid-feedback">
              {{ v$.ot.$errors[0].$message }}
            </span>
          </div>
        </div>

        <div class="mb-2 d-flex" title="Диапазон даты рождения">
          <div>
            <label for="dr_from" class="form-label inline small">ДР</label>
          </div>
          <div class="flex-grow-1">
            <div class="input-group">
              <input
                id="dr_from"
                type="date"
                class="form-control"
                v-model="form.dr_from"
                :disabled="form.oip_selected"
              />
              <span class="input-group-text">&mdash;</span>
              <input
                id="dr_to"
                type="date"
                class="form-control"
                v-model="form.dr_to"
                :disabled="form.oip_selected"
              />
            </div>
          </div>
        </div>

        <div class="mb-4 d-flex" title="Регион страхования">
          <div>
            <label for="okato" class="form-label inline small">ОКАТО</label>
          </div>
          <div class="flex-grow-1">
            <input
              id="okato"
              type="text"
              class="form-control"
              placeholder="25000"
              @input="onInputOkato"
              :value="form.okato"
              :disabled="form.oip_selected"
              :class="{ 'is-invalid': v$.okato.$errors.length > 0 }"
            />
            <div v-if="v$.okato.$errors.length > 0" class="invalid-feedback">
              {{ v$.okato.$errors[0].$message }}
            </div>
          </div>
        </div>

        <hr />

        <div class="mb-4 d-flex" title="Идентификатор персоны в ФЕРЗЛ">
          <div>
            <label for="oip" class="form-label inline small">OIP</label>
          </div>
          <div class="flex-grow-1">
            <div class="input-group">
              <span class="input-group-text">
                <input
                  class="form-check-input mt-0"
                  type="checkbox"
                  id="oip_selected"
                  v-model="form.oip_selected"
                />
              </span>
              <input
                id="oip"
                type="text"
                class="form-control"
                @input="onInputOip"
                :value="form.oip"
                :disabled="!form.oip_selected"
                :class="{ 'is-invalid': v$.oip.$errors.length > 0 }"
              />
              <span v-if="v$.oip.$errors.length > 0" class="invalid-feedback">
                {{ v$.oip.$errors[0].$message }}
              </span>
            </div>
          </div>
        </div>

        <div class="d-flex">
          <div class="flex-shrink-1">
            <button
              type="button"
              class="btn btn-outline-dark me-3"
              title="Очистить форму"
              @click="clearForm"
            >
              <EraserIcon />
            </button>
          </div>
          <div class="flex-grow-1">
            <button type="submit" class="btn btn-primary w-100">Поиск</button>
          </div>
        </div>
      </form>
    </div>
    <div class="container-fluid"></div>
  </div>
</template>

<style lang="css" scoped>
.search-container {
  width: 420px;
  padding: 10px;
}

.doc-num-symbol {
  line-height: 38px;
}

label.inline {
  line-height: 38px;
  margin-bottom: 0;
  display: block;
  width: 75px !important;
}

.invalid-feedback {
  font-size: smaller;
}
</style>
