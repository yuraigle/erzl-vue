import { ref } from 'vue';
import { defineStore } from 'pinia';
import { callApi } from '@/utils/api';

import type { RegisterSnilsRequest, RegisterDudlRequest } from '@/types';

export const useRegisterStore = defineStore('register', () => {

  const isLoadingReg = ref(false);

  const registerSnils = async (oip: string, dto: RegisterSnilsRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      dto.ss = dto.ss.replace(/[^0-9]/g, '');
      isLoadingReg.value = true;
      callApi(`/person/${oip}/snils`, 'POST', JSON.stringify(dto))
        .then(() => resolve())
        .catch((err: string) => reject(err))
        .finally(() => isLoadingReg.value = false)
    });
  }

  const registerDudl = async (oip: string, dto: RegisterDudlRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      isLoadingReg.value = true;
      callApi(`/person/${oip}/dudl`, 'POST', JSON.stringify(dto))
        .then(() => resolve())
        .catch((err: string) => reject(err))
        .finally(() => isLoadingReg.value = false)
    });
  }

  return {
    isLoadingReg,
    registerSnils,
    registerDudl
  }
})
