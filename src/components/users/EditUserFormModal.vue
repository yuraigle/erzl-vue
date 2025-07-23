<script setup lang="ts">
import type { UserRequestDto } from '@/types'

import { reactive, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required, minLength } from '@vuelidate/validators'
import { useUsersStore, useToastsStore } from '@/stores'

const props = defineProps({
  id: Number,
  user: {
    type: Object as () => UserRequestDto,
  },
})

const form = reactive({
  username: props.user?.username || '',
  password: '',
  name: props.user?.name || '',
  role: props.user?.role || 3,
})

watch(
  () => props.user,
  (v1: UserRequestDto | undefined) => {
    if (v1) {
      form.username = v1.username
      form.name = v1.name
      form.role = v1.role
    }
  },
  { deep: true, immediate: true },
)

const validations = {
  username: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Не менее 5 знаков', minLength(5)),
    mask: helpers.withMessage('Недопустимые символы', helpers.regex(/^[A-Za-z0-9.@]+$/)),
  },
  password: {
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
      .editUser(props.id || 0, form)
      .then(() => window.location.reload())
      .catch((err: string) => useToastsStore().showError(err))
  }
}
</script>

<template>
  <div class="modal fade" id="modalUserEdit">
    <div class="modal-dialog modal-dialog-scrollable">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title">Редактирование пользователя</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-2 d-flex">
            <div>
              <label for="e_username" class="form-label inline small">Логин</label>
            </div>
            <div class="flex-grow-1">
              <input
                id="e_username"
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
              <label for="e_password" class="form-label inline small">Пароль</label>
            </div>
            <div class="flex-grow-1">
              <input
                id="e_password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': v$.password.$errors.length > 0 }"
                v-model="form.password"
                autocomplete="new-password"
              />
              <div class="text-muted small">Чтобы не менять пароль, оставьте поле пустым</div>
              <span v-if="v$.password.$error" class="invalid-feedback">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div>
          </div>
          <div class="mb-2 d-flex">
            <div>
              <label for="e_name" class="form-label inline small">Имя</label>
            </div>
            <div class="flex-grow-1">
              <input
                id="e_name"
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
            Сохранить
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
