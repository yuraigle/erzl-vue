import { defineStore } from 'pinia';
import { useToastsStore } from '@/stores'
import { API_URL } from '@/../environment';

export interface F032 {
  mcod: string
  oktmoP: string
  oidMo: string
  namMok: string
}

export interface F033 {
  areaType: number
  oidSpmo: string
  namSkSpmo: string
}

export const useAttachStore = defineStore('attach', () => {

  const searchF032 = async (mcod: string): Promise<F032> => {
    return new Promise((resolve, reject) => {
      try {
        fetch('http://10.10.10.111:8082/api' + '/nsi/f032/' + mcod, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => resolve(data))
      } catch {
        reject('Ошибка поиска в справочнике F032')
      }
    })
  }

  const searchF033 = async (mcod: string): Promise<Array<F033>> => {
    return new Promise((resolve, reject) => {
      try {
        fetch('http://10.10.10.111:8082/api' + '/nsi/f033/' + mcod, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => {
            if (!resp.ok) {
              reject()
            }
            return resp.json()
          })
          .catch(() => reject())
          .then((data) => resolve(data))
      } catch {
        reject('Ошибка поиска в справочнике F033')
      }
    })
  }

  return {
    searchF032,
    searchF033,
  }
})
