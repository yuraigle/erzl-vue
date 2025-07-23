import type { User, UserRequestDto } from '@/types';

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { callApi } from '@/utils/api';

export const useUsersStore = defineStore('users', () => {
  const isLoading = ref(false);

  const getList = async (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      isLoading.value = true;
      callApi('/users', 'GET', null)
        .then((items: User[]) => {
          if (!items || items.length == 0) {
            reject('Ничего не найдено')
          }
          resolve(items);
        })
        .catch((err: string) => reject(err))
        .finally(() => isLoading.value = false)
    });
  }

  const addUser = async (dto: UserRequestDto): Promise<void> => {
    return new Promise((resolve, reject) => {
      isLoading.value = true;
      callApi('/users', 'POST', JSON.stringify(dto))
        .then(() => resolve())
        .catch((err: string) => reject(err))
        .finally(() => isLoading.value = false)
    });
  }

  const editUser = async (id: number, dto: UserRequestDto): Promise<void> => {
    return new Promise((resolve, reject) => {
      isLoading.value = true;
      callApi('/users/' + id, 'PUT', JSON.stringify(dto))
        .then(() => resolve())
        .catch((err: string) => reject(err))
        .finally(() => isLoading.value = false)
    });
  }

  const deleteUser = async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      isLoading.value = true;
      callApi('/users/' + id, 'DELETE', null)
        .then(() => resolve())
        .catch((err: string) => reject(err))
        .finally(() => isLoading.value = false)
    });
  }

  return {
    isLoading,
    getList,
    addUser,
    editUser,
    deleteUser,
  }
});
