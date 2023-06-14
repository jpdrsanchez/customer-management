import { DtoInsertCustomerRequest } from './dtoInsertCustomerRequest.ts'

export interface DtoInsertCustomerResponse {
  message: string
  customer: {
    id: string
    created_at: string
    updated_at: string
  } & DtoInsertCustomerRequest
}
