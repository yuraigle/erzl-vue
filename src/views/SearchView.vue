<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  enp: '',
  ss: '',
  oip: '',
  doc_t: 0,
  doc_s: '',
  doc_n: '',
  fam: '',
  im: '',
  ot: '',
  dr_from: '',
  dr_to: '',
  okato: '',
})
</script>

<template>
  <div class="d-flex">
    <div class="search-container border-end">
      <h5 class="my-4">Параметры поиска</h5>
      <form>
        <div class="mb-2 d-flex">
          <div>
            <label for="enp" class="form-label inline">ЕНП</label>
          </div>
          <div class="flex-grow-1">
            <input type="text" id="enp" class="form-control" v-model="form.enp" />
          </div>
        </div>
        <div class="mb-2 d-flex">
          <div>
            <label for="ss" class="form-label inline">СНИЛС</label>
          </div>
          <div class="flex-grow-1">
            <input type="text" id="ss" class="form-control" v-model="form.ss" />
          </div>
        </div>
        <div class="mb-2 mt-3">
          <label for="doc_t" class="d-none"></label>
          <select type="text" id="doc_t" class="form-select" v-model="form.doc_t">
            <option value="0">Выбрать документ</option>
          </select>
        </div>
        <div class="mb-2 d-flex">
          <label for="doc_s" class="d-none"></label>
          <input
            type="text"
            class="form-control"
            id="doc_s"
            v-model="form.doc_s"
            placeholder="Серия"
          />
          <div class="mx-2 doc-num-symbol">№</div>
          <label for="doc_n" class="d-none"></label>
          <input
            type="text"
            class="form-control"
            id="doc_n"
            v-model="form.doc_n"
            placeholder="Номер"
          />
        </div>

        <hr />

        <div class="d-flex">
          <div>
            <label for="fam" class="form-label inline small">Фамилия</label>
          </div>
          <div class="flex-grow-1">
            <input type="text" id="fam" class="form-control form-control-sm" v-model="form.fam" />
          </div>
        </div>
        <div class="d-flex">
          <div>
            <label for="im" class="form-label inline small">Имя</label>
          </div>
          <div class="flex-grow-1">
            <input type="text" id="im" class="form-control form-control-sm" v-model="form.im" />
          </div>
        </div>
        <div class="d-flex">
          <div>
            <label for="ot" class="form-label inline small">Отчество</label>
          </div>
          <div class="flex-grow-1">
            <input type="text" id="ot" class="form-control form-control-sm" v-model="form.ot" />
          </div>
        </div>
        <div class="d-flex">
          <div>
            <label for="dr_from" class="form-label inline small">ДР</label>
          </div>
          <div>
            <div class="input-group">
              <input
                type="date"
                class="form-control form-control-sm"
                id="dr_from"
                v-model="form.dr_from"
              />
              <input
                type="date"
                class="form-control form-control-sm"
                id="dr_to"
                v-model="form.dr_to"
              />
            </div>
          </div>
        </div>
        <div class="mb-1 d-flex">
          <div>
            <label for="okato" class="form-label inline small">ОКАТО</label>
          </div>
          <div class="flex-grow-1">
            <input
              type="text"
              id="okato"
              class="form-control form-control-sm"
              v-model="form.okato"
              placeholder="25000"
            />
          </div>
        </div>

        <hr />

        <div class="mb-2 d-flex">
          <div>
            <label for="oip" class="form-label inline">OIP</label>
          </div>
          <div class="flex-grow-1">
            <div class="input-group">
              <span class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" value="" />
              </span>
              <input type="text" id="oip" class="form-control" v-model="form.oip" />
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-3 w-100">Поиск</button>
      </form>
    </div>
    <div class="container-fluid"></div>
  </div>
</template>

<style lang="css" scoped>
.search-container {
  width: 400px;
  height: 100%;
  padding: 10px;
}

.doc-num-symbol {
  line-height: 38px;
}

label.inline {
  line-height: 38px;
  display: block;
  width: 75px !important;
}
</style>
