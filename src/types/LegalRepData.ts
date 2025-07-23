export interface Voucher {
  voucherType: string;
  voucherSer: string;
  voucherNum: string;
  voucherDateB: number;
  voucherDateE: number | null;
  voucherStatus: string;
  dsource: string;
  dsourceType: string;
}

export interface LegalRepData {
  oip: string
  legRepType: number
  legRepDateB: number
  legRepDateE: number | null
  status: string
  vouchers: {
    voucher: Voucher[]
  }
}

export interface LegalRepResponse {
  externalRequestId: string
  legalRepresentation: {
    legalRepresentationItem: LegalRepData[]
  }
  legalRepresentationBy: {
    legalRepresentationItem: LegalRepData[]
  }
}
