import { defineStore } from 'pinia';
import { ref } from 'vue';
import { callApi } from '@/utils/api';
import { useToastsStore } from './toasts.store';

import type { F032 } from '@/stores/attach.store';

export const useNsiStore = defineStore('nsi', () => {
  const cachedF032 = ref<Map<string, string>>(new Map<string, string>());

  const fetchF032 = async (code: string): Promise<string> => {
    if (cachedF032.value.has(code)) {
      return cachedF032.value.get(code) || '';
    }

    return new Promise((resolve) => {
      callApi('/nsi/f032/' + code, 'GET', null)
        .then((data: F032) => {
          cachedF032.value.set(code, data.namMok);
          resolve(data.namMok);
        })
        .catch(() => {
          cachedF032.value.set(code, '-');
          useToastsStore().showError('ЛПУ не найдена в справочнике F032');
        });
    })
  }

  return {
    cachedF032,
    fetchF032
  }
});
