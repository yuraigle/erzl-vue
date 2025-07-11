<script lang="ts" setup>
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth.store'

const form = reactive({
  username: '',
  password: '',
})

const validations = {
  username: [required],
  password: [required],
}

const v$ = useVuelidate(validations, form)

const auth = useAuthStore()

const onSubmit = async () => {
  const isCorrect = await v$.value.$validate()
  if (isCorrect) {
    auth.login(form.username, form.password)
  }
}
</script>

<template>
  <div class="w-100 mx-auto mt-auto login-form p-4 card shadow">
    <form @submit.prevent="onSubmit">
      <div class="form-floating mb-2 has-validation">
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.username.$errors.length > 0 }"
          id="username"
          placeholder="Логин"
          v-model="form.username"
        />
        <label for="username">Логин</label>
      </div>
      <div class="form-floating mb-2 has-validation">
        <input
          type="password"
          class="form-control"
          :class="{ 'is-invalid': v$.password.$errors.length > 0 }"
          id="password"
          placeholder="Пароль"
          v-model="form.password"
        />
        <label for="password" class="form-label">Пароль</label>
      </div>

      <button class="btn btn-lg btn-primary w-100 mt-1" :disabled="auth.isLoading">Войти</button>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 450px;
}
</style>
