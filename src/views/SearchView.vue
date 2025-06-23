<script setup lang="ts">
import { reactive } from 'vue'

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
</script>

<template>
  <div class="d-flex">
    <div class="search-container border-end px-3 flex-shrink-0">
      <h5 class="my-4">Параметры поиска</h5>
      <form>
        <div class="mb-2 d-flex">
          <div>
            <label for="enp" class="form-label inline small">ЕНП</label>
          </div>
          <div class="flex-grow-1">
            <input
              type="text"
              id="enp"
              class="form-control"
              v-model="form.enp"
              :disabled="form.oip_selected"
            />
          </div>
        </div>

        <div class="mb-2 d-flex">
          <div>
            <label for="ss" class="form-label inline small">СНИЛС</label>
          </div>
          <div class="flex-grow-1">
            <input
              type="text"
              id="ss"
              class="form-control"
              v-model="form.ss"
              :disabled="form.oip_selected"
            />
          </div>
        </div>

        <div class="mb-2">
          <label for="doc_t" class="d-none"></label>
          <select
            type="text"
            id="doc_t"
            class="form-select"
            v-model="form.doc_t"
            :disabled="form.oip_selected"
          >
            <option value="0">Выбрать документ</option>
            <option value="14">14 - Паспорт гражданина РФ</option>
            <option value="3">3 - Свидетельство о рождении, выданное в РФ</option>
          </select>
        </div>

        <div class="mb-4 d-flex">
          <label for="doc_s" class="d-none"></label>
          <input
            type="text"
            class="form-control"
            id="doc_s"
            v-model="form.doc_s"
            placeholder="Серия"
            :disabled="form.doc_t == 0 || form.oip_selected"
          />
          <div class="mx-2 doc-num-symbol">№</div>
          <label for="doc_n" class="d-none"></label>
          <input
            type="text"
            class="form-control"
            id="doc_n"
            v-model="form.doc_n"
            placeholder="Номер"
            :disabled="form.doc_t == 0 || form.oip_selected"
          />
        </div>

        <hr />

        <div class="mb-2 d-flex">
          <div>
            <label for="fam" class="form-label inline small">Фамилия</label>
          </div>
          <div class="flex-grow-1">
            <input
              type="text"
              id="fam"
              class="form-control"
              v-model="form.fam"
              :disabled="form.oip_selected"
            />
          </div>
        </div>

        <div class="mb-2 d-flex">
          <div>
            <label for="im" class="form-label inline small">Имя</label>
          </div>
          <div class="flex-grow-1">
            <input
              type="text"
              id="im"
              class="form-control"
              v-model="form.im"
              :disabled="form.oip_selected"
            />
          </div>
        </div>

        <div class="mb-2 d-flex">
          <div>
            <label for="ot" class="form-label inline small">Отчество</label>
          </div>
          <div class="flex-grow-1">
            <input
              type="text"
              id="ot"
              class="form-control"
              v-model="form.ot"
              :disabled="form.oip_selected"
            />
          </div>
        </div>

        <div class="mb-2 d-flex" title="Диапазон даты рождения">
          <div>
            <label for="dr_from" class="form-label inline small">ДР</label>
          </div>
          <div class="flex-grow-1">
            <div class="input-group">
              <input
                type="date"
                class="form-control"
                id="dr_from"
                v-model="form.dr_from"
                :disabled="form.oip_selected"
              />
              <span class="input-group-text">&mdash;</span>
              <input
                type="date"
                class="form-control"
                id="dr_to"
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
              type="text"
              id="okato"
              class="form-control mb-0"
              v-model="form.okato"
              placeholder="25000"
              :disabled="form.oip_selected"
            />
          </div>
        </div>

        <hr />

        <div class="mb-4 d-flex">
          <div>
            <label for="oip" class="form-label inline small">OIP</label>
          </div>
          <div class="flex-grow-1">
            <div class="input-group">
              <span class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" v-model="form.oip_selected" />
              </span>
              <input
                type="text"
                id="oip"
                class="form-control"
                v-model="form.oip"
                :disabled="!form.oip_selected"
              />
            </div>
          </div>
        </div>

        <div class="d-flex">
          <div class="flex-shrink-1">
            <button type="button" class="btn btn-outline-dark me-3">
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
  height: 100%;
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
</style>
