export interface RegisterDudlRequest {
  dudl_ser: string | null
  dudl_num: string
  dudl_date_b: number | null
  dudl_date_e: number | null
  dudl_type: string | null
  issuer: string | null
  issuer_oksm: string | null
  ctzn_oksm: string | null
  no_citizenship: boolean
  descr: string | null
  surname: string
  patronymic: string | null
  first_name: string
  birth_day: string | null
  birthplace: string | null
  gender: number | null
  birth_oksm: string | null
  dost: string | null
  dudl_code_division: string | null
}
