import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToastsStore } from '@/stores'
import { API_URL, BEARER_TOKEN } from '@/../environment';
import type { PersonData, PersonDataShort } from '@/types/PersonData';

export interface SearchParams {
  oip_selected: boolean | null
  oip: string | null
  enp: string | null
  ss: string | null
  doc_t: number | null
  doc_s: string | null
  doc_n: string | null
  fam: string | null
  im: string | null
  ot: string | null
  okato: string | null
  dr_from: string | null
  dr_to: string | null
  page: number | null
}

export interface Pagination {
  pageNumber: number
  itemPerPage: number
  count: number
}

const convertParams = (params: SearchParams) => {
  const dto = {} as SearchParams;

  if (params.oip_selected) {
    dto.oip = params.oip ? params.oip.replace(/[^0-9]+/g, '') : null;
  } else {
    dto.enp = params.enp ? params.enp.replace(/[^0-9]+/g, '') : null;
    dto.ss = params.ss ? params.ss.replace(/[^0-9]+/g, '') : null;
    dto.doc_t = params.doc_t ? params.doc_t : null
    dto.doc_s = params.doc_s ? params.doc_s.trim() : null
    dto.doc_n = params.doc_n ? params.doc_n.trim() : null
    dto.fam = params.fam ? params.fam.trim() : null
    dto.im = params.im ? params.im.trim() : null
    dto.ot = params.ot ? params.ot.trim() : null
    dto.dr_from = params.dr_from ? params.dr_from : null
    dto.dr_to = params.dr_to ? params.dr_to : null

    dto.okato = params.okato ? params.okato.trim() : null
    if (!dto.fam && !dto.im && !dto.ot) {
      dto.okato = null; // подставляем окато только при поиске по ФИО
    }

    dto.page = params.page ? params.page : 1;
  }

  return dto;
}

export const useFerzlStore = defineStore('ferzl', () => {
  const personList = ref<PersonDataShort[]>([]);
  const pagination = ref<Pagination | null>(null);
  const personData = ref<PersonData | null>(null);
  const isLoading = ref(false);
  const isLoading2 = ref(false);
  const lastForm = ref<SearchParams | null>(null);

  const searchCriteria = async (params: SearchParams) => {
    try {
      isLoading.value = true;
      isLoading2.value = false;
      personData.value = null;
      personList.value = [];
      pagination.value = null;
      lastForm.value = params;

      if (params.oip_selected && params.oip) {
        searchOip(params.oip);
        return;
      }

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

      const items = data.personDataShortItem as PersonDataShort[];
      pagination.value = data.pagination;

      if (!items || items.length == 0) {
        throw new Error('Ничего не найдено')
      }

      personList.value = items;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка поиска';
      useToastsStore().showError(message);
    } finally {
      isLoading.value = false
    }
  }

  const searchCriteriaPage = async (n: number) => {
    if (lastForm.value) {
      lastForm.value.page = n;
      await searchCriteria(lastForm.value);
    }
  }

  const searchOip = async (oip: string) => {
    try {
      isLoading2.value = true
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
    } finally {
      isLoading2.value = false
    }
  }

  return {
    personList,
    personData,
    pagination,
    isLoading,
    isLoading2,
    searchOip,
    searchCriteria,
    searchCriteriaPage
  };
});
