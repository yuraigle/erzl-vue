import { defineStore } from 'pinia';
import { ref } from 'vue';
import { callApi } from '@/utils/api';
import { useToastsStore } from './toasts.store';

interface GarCodeResponse {
  text: string
}

export const useGarStore = defineStore('gar', () => {
  const isLoading = ref(false);
  const cached = ref<Map<string, string>>(new Map<string, string>());

  const search = (code: string): void => {
    isLoading.value = true;
    callApi('/gar/' + code, 'GET', null)
      .then((data: GarCodeResponse) => {
        cached.value.set(code, data.text);
      })
      .catch((err: string) => {
        useToastsStore().showError(err);
      })
      .finally(() => isLoading.value = false)
  }

  return {
    isLoading,
    cached,
    search,
  }
});
