import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router'
import { useToastsStore } from '@/stores'
import { callApi } from '@/utils/api';

import type { AuthDetails } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<AuthDetails | null>(null);
  const isLoading = ref(false);

  user.value = JSON.parse(localStorage.getItem('user') || 'null');

  const login = async (username: string, password: string) => {
    isLoading.value = true
    callApi('/login', 'POST', JSON.stringify({ username, password }))
      .then((data: AuthDetails) => {
        user.value = { ...data, till: Date.now() + 12 * 60 * 60 * 1000 };
        localStorage.setItem('user', JSON.stringify(user.value));
        router.push('/');
      })
      .catch((err: string) => useToastsStore().showError(err))
      .finally(() => isLoading.value = false)
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
