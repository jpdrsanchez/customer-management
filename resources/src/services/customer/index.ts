import { DtoInsertCustomerRequest } from './dtoInsertCustomerRequest.ts'
import { api } from '../index.ts'
import { DtoInsertCustomerResponse } from './dtoInsertCustomerResponse.ts'
import { DtoListCustomersRequest } from './dtoListCustomersRequest.ts'
import {
  DtoCustomer,
  DtoListCustomersResponse
} from './dtoListCustomersResponse.ts'

export class CustomerService {
  public static async insert(request: DtoInsertCustomerRequest) {
    const response = await api.post<DtoInsertCustomerResponse>(
      '/api/customers',
      request
    )

    return response.data
  }

  public static async list(request: DtoListCustomersRequest) {
    const response = await api.get<DtoListCustomersResponse>('api/customers', {
      params: request
    })

    return response.data
  }

  public static async delete(id: string) {
    await api.delete(`api/customers/${id}`)
  }

  public static async update(
    id: string,
    request: Partial<Omit<DtoInsertCustomerRequest, 'document'>>
  ) {
    await api.put(`api/customers/${id}`, request)
  }

  public static async findById(id: string) {
    const response = await api.get<DtoCustomer>(`api/customers/${id}`)

    return response.data
  }
}
