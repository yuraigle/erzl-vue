<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'
import { useUsersStore, useToastsStore } from '@/stores'

const form = reactive({
  username: '',
  password: '',
  name: '',
  role: 4,
})

const validations = {
  username: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Не менее 5 знаков', minLength(5)),
    mask: helpers.withMessage('Недопустимые символы', helpers.regex(/^[A-Za-z0-9.@]+$/)),
  },
  password: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Не менее 5 знаков', minLength(5)),
  },
  name: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Не менее 5 знаков', minLength(5)),
  },
}

const v$ = useVuelidate(validations, form)

const usersStore = useUsersStore()

const onSubmit = async () => {
  const isCorrect = await v$.value.$validate()

  if (isCorrect) {
    usersStore
      .addUser(form)
      .then(() => window.location.reload())
      .catch((err: string) => useToastsStore().showError(err))
  }
}
</script>

<template>
  <div class="modal fade" id="modalUserCreate">
    <div class="modal-dialog modal-dialog-scrollable">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title">Новый пользователь</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-2 d-flex">
            <div>
              <label for="username" class="form-label inline small">Логин</label>
            </div>
            <div class="flex-grow-1">
              <input
                id="username"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.username.$errors.length > 0 }"
                v-model="form.username"
              />
              <span v-if="v$.username.$error" class="invalid-feedback">
                {{ v$.username.$errors[0].$message }}
              </span>
            </div>
          </div>
          <div class="mb-2 d-flex">
            <div>
              <label for="password" class="form-label inline small">Пароль</label>
            </div>
            <div class="flex-grow-1">
              <input
                id="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': v$.password.$errors.length > 0 }"
                v-model="form.password"
              />
              <span v-if="v$.password.$error" class="invalid-feedback">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div>
          </div>
          <div class="mb-2 d-flex">
            <div>
              <label for="name" class="form-label inline small">Имя</label>
            </div>
            <div class="flex-grow-1">
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.name.$errors.length > 0 }"
                v-model="form.name"
              />
              <span v-if="v$.name.$error" class="invalid-feedback">
                {{ v$.name.$errors[0].$message }}
              </span>
            </div>
          </div>
          <div class="mb-2 d-flex">
            <div>
              <label for="name" class="form-label inline small">Роль</label>
            </div>
            <div class="flex-grow-1">
              <select class="form-select" v-model="form.role">
                <option value="3">Читатель</option>
                <option value="4">Редактор</option>
                <option value="9">Администратор</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="submit" class="btn btn-primary" :disabled="usersStore.isLoading">
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
  width: 75px !important;
}

.invalid-feedback {
  font-size: smaller;
}
</style>
