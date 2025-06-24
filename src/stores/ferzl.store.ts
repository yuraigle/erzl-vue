import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface SearchParams {
  enp: string
  ss: string
  oip: string
}

export interface PersonDataShort {
  fio: string
  enp: string
  birthDay: Date
  gender: number
  oip: string
}

export const useFerzlStore = defineStore('ferzl', () => {
  const personList = ref<PersonDataShort[]>([]);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const searchCriteria = async (params: SearchParams) => {
    try {
      isLoading.value = true

      const response = await fetch('http://10.10.11.59:8084/api/search-criteria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
        .catch(() => {
          throw new Error('Ошибка подключения к серверу')
        });

        const data = await response.json()
        console.log(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка поиска'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    personList,
    error,
    isLoading,
    searchCriteria
  };
});
