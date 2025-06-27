<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const username = ref('emilys')
const password = ref('emilyspass')
const auth = useAuthStore()

const login = () => {
  auth.login(username.value, password.value)
}
</script>

<template>
  <div class="w-100 mx-auto mt-5 login-form">
    <h1 class="h3 text-center">Вход в систему</h1>
    <form>
      <div class="mb-2">
        <label for="username" class="form-label"></label>
        <input
          type="text"
          id="username"
          autocomplete="username"
          v-model="username"
          class="form-control"
          placeholder="Логин"
        />
      </div>
      <div class="mb-2">
        <label for="password" class="form-label"></label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          placeholder="Пароль"
        />
      </div>

      <button
        class="btn btn-primary w-100 mt-2"
        :disabled="auth.isLoading"
        @click.prevent="login"
      >Войти</button>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 400px;
}
</style>
