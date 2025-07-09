import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router'
import { useToastsStore } from '@/stores'
import { API_URL } from '@/../environment';

export interface User {
  id: string
  name: string
  role: string
  token: string
  till: number
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const toasts = useToastsStore();

  const user = ref<User | null>(null);
  const isLoading = ref(false);

  user.value = JSON.parse(localStorage.getItem('user') || 'null');

  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true

      const response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
        .catch(() => {
          throw new Error('Ошибка подключения к серверу')
        });

      const data = await response.json()

      if (!data || !data.token) {
        const message = data && data.message ? data.message : 'Ошибка авторизации'
        throw new Error(message)
      }

      user.value = {
        id: data.id || 0,
        name: data.name,
        role: data.role,
        token: data.token,
        till: Date.now() + 12 * 60 * 60 * 1000 // 12 hours
      }

      localStorage.setItem('user', JSON.stringify(user.value));
      router.push('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка авторизации';
      toasts.showError(message);
    } finally {
      isLoading.value = false
    }
  };

  const logout = () => {
    user.value = null;
    isLoading.value = false;

    localStorage.removeItem('user');
    router.push('/login');
  };

  const isAuthenticated = computed(() => {
    return user.value && user.value.token && user.value.till > Date.now();
  });

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };
});
