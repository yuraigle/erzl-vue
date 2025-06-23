import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface User {
  id: string
  name: string
  role: string
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const isAuthenticated = computed(() => !!user.value);

  user.value = JSON.parse(localStorage.getItem('user') || 'null');

  // Actions
  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true

      // await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
        .catch(() => {
          throw new Error('Ошибка подключения к серверу')
        });

      const data = await response.json()

      if (!data || !data.accessToken) {
        const message = data && data.message ? data.message : 'Ошибка авторизации'
        throw new Error(message)
      }

      user.value = {
        id: data.id,
        name: data.firstName + ' ' + data.lastName,
        role: 'user',
        token: data.accessToken,
      }

      localStorage.setItem('user', JSON.stringify(user.value));
      window.location.href = '/'; // todo router.push
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка авторизации'
      throw err
    } finally {
      isLoading.value = false
    }
  };

  const logout = () => {
    user.value = null;
    isLoading.value = false;
    error.value = null;

    localStorage.removeItem('user');
    window.location.href = '/login'
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
  };
});
