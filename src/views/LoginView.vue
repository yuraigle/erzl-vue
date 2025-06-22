<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

const username = ref('emilys');
const password = ref('emilyspass');

const login = () => {
  useAuthStore()
    .login(username.value, password.value);
};

</script>

<template>
  <div class="container-fluid">
    <h1>Вход в систему</h1>

    <form>
      <input type="text" v-model="username" placeholder="Имя пользователя" />
      <input type="password" v-model="password" placeholder="Пароль" />
      <button @click.prevent="login">Войти</button>
    </form>
  </div>
</template>
