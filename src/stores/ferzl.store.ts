import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToastsStore } from '@/stores';
import { callApi } from '@/utils/api';

import type { PersonData, PersonDataShort, Pagination } from '@/types/PersonData';
import type { LegalRepData, LegalRepResponse } from '@/types/LegalRepData';

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

const convertParams = (params: SearchParams) => {
  const dto = {} as SearchParams;

  if (params.oip_selected) {
    dto.oip = params.oip ? params.oip.replace(/[^0-9]+/g, '') : null;
  } else {
    dto.enp = params.enp ? params.enp.replace(/[^0-9]+/g, '') : null;
    dto.ss = params.ss ? params.ss.replace(/[^0-9]+/g, '') : null;
    dto.doc_t = params.doc_t && params.doc_t > 0 ? params.doc_t : null;
    dto.doc_s = params.doc_s ? params.doc_s.trim() : null;
    dto.doc_n = params.doc_n ? params.doc_n.trim() : null;
    dto.fam = params.fam ? params.fam.trim() : null;
    dto.im = params.im ? params.im.trim() : null;
    dto.ot = params.ot ? params.ot.trim() : null;
    dto.dr_from = params.dr_from ? params.dr_from : null;
    dto.dr_to = params.dr_to ? params.dr_to : null;

    dto.okato = params.okato ? params.okato.trim() : null;
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
  const legalRepList = ref<LegalRepData[]>([]);
  const legalRepByList = ref<LegalRepData[]>([]);
  const isLoading = ref(false);
  const isLoadingOip = ref(false);
  const isLoadingLegalRep = ref(false);
  const lastForm = ref<SearchParams | null>(null);

  const initialState = () => {
    isLoading.value = false;
    isLoadingOip.value = false;
    isLoadingLegalRep.value = false;
    personList.value = [];
    personData.value = null;
    legalRepList.value = [];
    legalRepByList.value = [];
    pagination.value = null;
    lastForm.value = null;
  }

  const searchCriteria = async (params: SearchParams) => {
    initialState();

    if (params.oip_selected && params.oip) {
      return searchOip(params.oip);
    }

    isLoading.value = true;
    callApi('/search-criteria', 'POST', JSON.stringify(convertParams(params)))
      .then((data) => {
        pagination.value = data.pagination;

        const items = data.personDataShortItem as PersonDataShort[];
        if (!items || items.length == 0) {
          useToastsStore().showError('Ничего не найдено');
        }
        personList.value = items;
      })
      .catch((err: string) => useToastsStore().showError(err))
      .finally(() => isLoading.value = false)

  }

  const searchCriteriaPage = async (n: number) => {
    if (lastForm.value) {
      lastForm.value.page = n;
      await searchCriteria(lastForm.value);
    }
  }

  const searchOip = async (oip: string) => {
    isLoadingOip.value = true
    personData.value = null;
    legalRepList.value = [];
    legalRepByList.value = [];

    callApi('/person-data', 'POST', JSON.stringify({ oip }))
      .then((data: PersonData) => {
        personData.value = data;
      })
      .catch((err: string) => useToastsStore().showError(err))
      .finally(() => isLoadingOip.value = false)
  }

  const searchLegalRep = async (oip?: string) => {
    isLoadingLegalRep.value = true;
    legalRepList.value = [];
    legalRepByList.value = [];

    callApi('/legal-rep', 'POST', JSON.stringify({ oip }))
      .then((data: LegalRepResponse) => {
        console.log(data);
        legalRepList.value = data.legalRepresentation?.legalRepresentationItem || [];
        legalRepByList.value = data.legalRepresentationBy?.legalRepresentationItem || [];
      })
      .catch((err: string) => useToastsStore().showError(err))
      .finally(() => isLoadingLegalRep.value = false)
  }

  return {
    isLoading,
    isLoadingOip,
    isLoadingLegalRep,
    personList,
    personData,
    legalRepList,
    legalRepByList,
    searchCriteria,
    searchCriteriaPage,
    searchOip,
    searchLegalRep,
    pagination,
  };
});
