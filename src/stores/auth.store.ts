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
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  user.value = JSON.parse(localStorage.getItem('user') || 'null');

  // Actions
  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true

      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.accessToken) {
            user.value = {
              id: data.id,
              name: data.firstName + ' ' + data.lastName,
              role: 'user',
              token: data.accessToken,
            }

            localStorage.setItem('user', JSON.stringify(user.value));
            window.location.href = '/';
          }
        });

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
    isAuthenticated,
    login,
    logout,
  };
});
