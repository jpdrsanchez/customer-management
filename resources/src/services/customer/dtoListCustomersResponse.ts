import { DtoInsertCustomerRequest } from './dtoInsertCustomerRequest.ts'

export interface DtoCustomer extends DtoInsertCustomerRequest {
  id: string
  created_at: string
  updated_at: string
}

export interface DtoListCustomersResponse {
  data: DtoCustomer[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
