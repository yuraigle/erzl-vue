import { ref } from 'vue';
import { defineStore } from 'pinia';
import { callApi } from '@/utils/api';

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

  const searchF032 = async (mcod: string): Promise<F032> => {
    return new Promise((resolve, reject) => {
      isLoadingReg.value = true
      callApi('/nsi/f032/' + mcod, 'GET', null)
        .then((data: F032) => resolve(data))
        .catch((err: string) => reject(err))
        .finally(() => isLoadingReg.value = false)
    });
  }

  const searchF033 = async (mcod: string): Promise<Array<F033>> => {
    return new Promise((resolve, reject) => {
      isLoadingReg.value = true
      callApi('/nsi/f033/' + mcod, 'GET', null)
        .then((data: F033[]) => resolve(data))
        .catch((err: string) => reject(err))
        .finally(() => isLoadingReg.value = false)
    });
  }

  const registerAttach = async (dto: RegisterAttachRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      dto.snils_doctor = dto.snils_doctor?.replace(/[^0-9]/g, '') || null
      isLoadingReg.value = true
      callApi('/person/attachment', 'POST', JSON.stringify(dto))
        .then(() => resolve())
        .catch((err: string) => reject(err))
        .finally(() => isLoadingReg.value = false)
    });
  }

  return {
    searchF032,
    searchF033,
    registerAttach,
    isLoadingReg,
  }
})
