import { ref } from 'vue';
import { defineStore } from 'pinia';
import { callApi } from '@/utils/api';

export interface RegisterSnilsRequest {
  oip: string
  ss: string
}

export const useRegisterStore = defineStore('register', () => {

  const isLoadingReg = ref(false);

  const registerSnils = async (dto: RegisterSnilsRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      dto.ss = dto.ss.replace(/[^0-9]/g, '');
      isLoadingReg.value = true;
      callApi('/person/snils', 'POST', JSON.stringify(dto))
        .then(() => resolve())
        .catch((err: string) => reject(err))
        .finally(() => isLoadingReg.value = false)
    });
  }

  return {
    isLoadingReg,
    registerSnils
  }
})
