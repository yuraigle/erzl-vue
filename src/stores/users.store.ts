import type UserRequestDto from '@/types/UserRequestDto';

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToastsStore } from '@/stores'
import { API_URL } from '@/../environment';

export interface User {
  id: number
  username: string
  password: string
  name: string
  role: number
}

export const useUsersStore = defineStore('users', () => {
  const userList = ref<User[] | null>(null);
  const isLoading = ref(false);

  const getToken = (): string => {
    return JSON.parse(localStorage.getItem('user') || 'null')['token']
  };

  const getList = async () => {
    try {
      isLoading.value = true;
      userList.value = [];

      const response = await fetch(API_URL + '/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getToken(),
        },
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
          throw new Error('Ошибка поиска');
        }
      }

      const items = data;

      if (!items || items.length == 0) {
        throw new Error('Ничего не найдено')
      }

      userList.value = items;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка';
      useToastsStore().showError(message);
    } finally {
      isLoading.value = false
    }
  }

  const addUser = async (dto: UserRequestDto) => {
    try {
      isLoading.value = true;

      const response = await fetch(API_URL + '/users', {
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
          throw new Error('Ошибка');
        }
      }

      window.location.reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка';
      useToastsStore().showError(message);
    } finally {
      isLoading.value = false
    }
  }

  const editUser = async (id: number, dto: UserRequestDto) => {
    try {
      isLoading.value = true;

      const response = await fetch(API_URL + '/users/' + id, {
        method: 'PUT',
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
          throw new Error('Ошибка');
        }
      }

      window.location.reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка';
      useToastsStore().showError(message);
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (id: number) => {
    try {
      isLoading.value = true;

      const response = await fetch(API_URL + '/users/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getToken(),
        },
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
          throw new Error('Ошибка');
        }
      }

      window.location.reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка';
      useToastsStore().showError(message);
    } finally {
      isLoading.value = false
    }
  }

  return {
    userList,
    isLoading,
    getList,
    addUser,
    editUser,
    deleteUser,
  }
});
