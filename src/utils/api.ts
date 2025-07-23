
import { API_URL } from '@/../environment';
import type { AuthDetails } from '@/types';

export const callApi = async (url: string, method: string, body: string | null): Promise<any> => {
  const user: AuthDetails | null = JSON.parse(localStorage.getItem('user') || 'null');
  const token = user?.token || '';

  return new Promise((resolve, reject) => {
    fetch(API_URL + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: body,
    })
      .then(
        (resp) => {
          resp.json().then(
            (data) => {
              if (resp.ok) {
                resolve(data)
              }

              // сервер ответил 400/500
              if (Array.isArray(data) && data.length > 0) {
                reject(data[0]); // массив ошибок
              } else if (data?.message) {
                reject(data.message); // объект с ошибкой
              } else {
                reject('Ошибка ' + resp.status); // что-то другое
              }
            },
            () => reject('Ошибка разбора ответа сервера') // json не json
          )
        },
        () => reject('Ошибка подключения к серверу') // timeout
      )
  });
}
