import { ref } from 'vue';
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
  uidspmo: string
  areaType: number
  oidSpmo: string
  namSkSpmo: string
}

export interface RegisterAttachRequest {
  enp: string
  date_attach_b: Date | null
  date_attach_e: Date | null
  attach_method: number
  area_type: number
  area_id: string | null
  mo_id: string
  mo_code: string
  mo_f_id: string | null
  doctor_id: string | null
  snils_doctor: string | null
  doctor_since: Date | null
  mo_dep_id: string
}

export const useAttachStore = defineStore('attach', () => {

  const isLoadingReg = ref(false);

  const getToken = (): string => {
    return JSON.parse(localStorage.getItem('user') || 'null')['token']
  }

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

  const registerAttach = async (dto: RegisterAttachRequest) => {
    try {
      isLoadingReg.value = true

      dto.snils_doctor = dto.snils_doctor?.replace(/[^0-9]/g, '') || null

      const response = await fetch(API_URL + '/person/attachment', {
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

      useToastsStore().showMessage('Прикрепление добавлено', 'success');
    } finally {
      isLoadingReg.value = false
    }
  }

  return {
    searchF032,
    searchF033,
    registerAttach,
    isLoadingReg,
  }
})
