import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToastsStore } from '@/stores'
import { API_URL } from '@/../environment';

export interface RegisterSnilsRequest {
  oip: string
  ss: string
}

export const useRegisterStore = defineStore('register', () => {

  const isLoadingReg = ref(false);

  const getToken = (): string => {
    return JSON.parse(localStorage.getItem('user') || 'null')['token']
  }

  const registerSnils = async (dto: RegisterSnilsRequest) => {
    try {
      isLoadingReg.value = true

      dto.ss = dto.ss.replace(/[^0-9]/g, '')

      const response = await fetch(API_URL + '/person/snils', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getToken(),
        },
        body: JSON.stringify(dto),
      })
        .catch(() => {
          throw new Error('Ошибка подключения к серверу')
        });

      const data = await response.json()

      if (!response.ok) {
        if (Array.isArray(data) && data.length > 0) {
          throw new Error(data[0]);
        } else if (data?.message) {
          throw new Error(data.message);
        } else {
          throw new Error('Ошибка ' +  response.status);
        }
      }

      useToastsStore().showMessage('СНИЛС добавлен', 'success');

    } finally {
      isLoadingReg.value = false
    }
  }

  return {
    isLoadingReg,
    registerSnils
  }
})
