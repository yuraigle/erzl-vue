import { defineStore } from 'pinia';
import { API_URL } from '@/../environment';

export interface F032 {
  mcod: string
  oktmoP: string
  oidMo: string
  namMok: string
}

export interface F033 {
  uidspmo: string
  areaType: number
  oidSpmo: string
  namSkSpmo: string
}

export const useAttachStore = defineStore('attach', () => {

  const searchF032 = async (mcod: string): Promise<F032> => {
    return new Promise((resolve, reject) => {
      fetch(API_URL + '/nsi/f032/' + mcod, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (resp) => {
            resp.json().then((data) => {
              if (!resp.ok) {
                reject(Array.isArray(data) ? data[0] : 'Ошибка ' + resp.status)
              } else {
                resolve(data)
              }
            })
          },
          () => reject('Ошибка подключения')
        )
    })
  }

  const searchF033 = async (mcod: string): Promise<Array<F033>> => {
    return new Promise((resolve, reject) => {
      fetch(API_URL + '/nsi/f033/' + mcod, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (resp) => {
            resp.json().then((data) => {
              if (!resp.ok) {
                reject(Array.isArray(data) ? data[0] : 'Ошибка ' + resp.status)
              } else {
                resolve(data)
              }
            })
          },
          () => reject('Ошибка подключения')
        )

    })
  }

  return {
    searchF032,
    searchF033,
  }
})
