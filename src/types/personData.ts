export interface PersonData {
  oip: string;
  person: {
    personItems: PersonItem[];
  };
  policy: {
    policyItems: PolicyItem[];
  };
  dudl: {
    dudlItems: DudlItem[];
  };
  address: {
    addressItems: AddressItem[];
  };
  attach: {
    attachItems: AttachItem[];
  };
  contact: {
    contactItems: ContactItem[];
  };
  snils: {
    snilsItems: SnilsItem[];
  };
  socialStatus: {
    socialStatusItems: SocialStatusItem[];
  };
  ern: {
    ernItems: ErnItem[];
  };
}

export interface Pagination {
  pageNumber: number
  itemPerPage: number
  count: number
}

export interface PersonDataShort {
  fio: string
  enp: string
  birthDay: number
  gender: number
  oip: string
}

export interface PersonItem {
  surname: string;
  patronymic: string;
  firstName: string;
  birthDay: number;
  gender: number;
  birthOksm: string | null;
  deathDate: number | null;
  whenMerged: number | null;
  dateEdit: number;
  status: string;
}

export interface PolicyItem {
  pcySer: string | null;
  pcyNum: string | null;
  enpCalc: string | null;
  enp: string;
  pcyDateB: number;
  pcyDateE: number | null;
  pcyDateH: number | null;
  pcyDateT: number | null;
  pcyDateEnpCalc: number | null;
  pcyDatePr: number | null;
  pcyType: string;
  pcyStatus: string;
  okato: string;
  dsource: string;
  dsourceType: string;
  descr: string | null;
  gender: number;
  insurName: string;
  insurfName: string;
  insurOgrn: string;
  insurfOgrn: string;
  insurCode: string;
  insurfCode: string;
  insurfDate: number | null;
  tmpcertNum: string | null;
  tmpcertDateB: number | null;
  tmpcertDateE: number | null;
  uekNum: string | null;
  pcyCategory: string | null;
  surname: string;
  patronymic: string;
  firstName: string;
  birthDay: number;
  blankNum: string;
}

export interface DudlItem {
  dudlSer: string;
  dudlNum: string;
  dudlDateB: number;
  dudlType: string;
  surname: string;
  patronymic: string;
  firstName: string;
  dudlDateE: number | null;
  issuer: string;
  issuerOksm: string;
  ctznOksm: string;
  descr: string | null;
  birthDay: number;
  birthplace: string;
  birthOksm: string;
  dost: string | null;
  dsource: string;
  dsourceType: string;
  dudlStatus: string;
  gender: number;
  noCitizenship: boolean;
  dudlCodeDivision: string | null;
}

export interface AddressItem {
  okato: string | null;
  oksm: string;
  aoguid: string | null;
  hsguid: string | null;
  addressText: string;
  mailIndex: string | null;
  appNum: string | null;
  dsourceType: string;
  dsource: string;
  addressType: string;
  addressDateB: number;
  addressDateE: number | null;
  addressStatus: string;
}

export interface AttachItem {
  areaType: string;
  areaId: string | null;
  attachMethod: string;
  dateAttachB: number;
  dateAttachE: number | null;
  moId: string | null;
  moCode: string;
  moFId: string | null;
  snilsDoctor: string | null;
  doctorId: string | null;
  doctorSince: number | null;
  dsource: string;
  dsourceType: string;
  descr: string | null;
  moOkato: string;
  attachStatus: string;
  depId: string | null;
  mcapitation: string | null;
}

export interface ContactItem {
  contactStatus: string
  contactText: string
  contactType: string | null
  descr: string | null
  dsource: string
  dsourceType: string
}

export interface SnilsItem {
  snils: string;
  dsource: string;
  dsourceType: string;
  descr: string | null;
  statusSnils: string;
}

export interface SocialStatusItem {
  socialStatus: string;
  dsourceType: string;
  dsource: string;
  descr: string | null;
  regDate: number;
}

export interface ErnItem {
  ern: string;
  dsource: string;
  dsourceType: string;
  ernStatus: string;
}
