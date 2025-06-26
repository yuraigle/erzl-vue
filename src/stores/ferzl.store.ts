import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToastsStore } from '@/stores'
import { API_URL, BEARER_TOKEN } from '@/../environment';

export interface SearchParams {
  enp: string | null
  ss: string | null
  oip: string | null
}

export interface PersonDataShort {
  fio: string
  enp: string
  birthDay: Date
  gender: number
  oip: string
}

export interface PersonDataFull {
  oip: string
}

const convertParams = (params: SearchParams) => {
  const dto = {} as SearchParams;

  dto.enp = params.enp ? params.enp.replace(/[^0-9]+/g, '') : null;
  dto.ss = params.ss ? params.ss.replace(/[^0-9]+/g, '') : null;
  dto.oip = params.oip ? params.oip.replace(/[^0-9]+/g, '') : null;

  return dto;
}

export const useFerzlStore = defineStore('ferzl', () => {
  const personList = ref<PersonDataShort[]>([]);
  const personData = ref<PersonDataFull | null>(null);
  const isLoading = ref(false);

  const searchCriteria = async (params: SearchParams) => {
    try {
      isLoading.value = true
      personList.value = []

      const response = await fetch(API_URL + '/search-criteria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + BEARER_TOKEN,
        },
        body: JSON.stringify(convertParams(params)),
      })
        .catch(() => {
          throw new Error('Ошибка подключения к серверу')
        });

      const data = await response.json()

      if (!response.ok) {
        const message = Array.isArray(data) && data.length > 0 ? data[0] : 'Ошибка поиска';
        throw new Error(message);
      }

      personList.value = data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка поиска';
      useToastsStore().showError(message);
    } finally {
      isLoading.value = false
    }
  }

  const searchOip = async (oip: string) => {
    try {
      personData.value = null;

      const response = await fetch(API_URL + '/person-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + BEARER_TOKEN,
        },
        body: JSON.stringify({ oip: oip }),
      })
        .catch(() => {
          throw new Error('Ошибка подключения к серверу')
        });

      const data = await response.json()

      if (!response.ok) {
        const message = Array.isArray(data) && data.length > 0 ? data[0] : 'Ошибка поиска';
        throw new Error(message);
      }

      personData.value = data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка поиска';
      useToastsStore().showError(message);
    }
  }

  return {
    personList,
    personData,
    isLoading,
    searchCriteria,
    searchOip
  };
});
