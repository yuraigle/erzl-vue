<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const username = ref('')
const password = ref('')
const auth = useAuthStore()

const login = () => {
  auth.login(username.value, password.value)
}
</script>

<template>
  <div class="w-100 mx-auto mt-auto login-form p-4 card shadow">
    <form>
      <div class="form-floating mb-2 has-validation">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Логин"
          v-model="username"
        />
        <label for="username">Логин</label>
      </div>
      <div class="form-floating mb-2 has-validation">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Пароль"
          v-model="password"
        />
        <label for="password" class="form-label">Пароль</label>
      </div>

      <button
        class="btn btn-lg btn-primary w-100 mt-1"
        :disabled="auth.isLoading"
        @click.prevent="login"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 450px;
}
</style>
