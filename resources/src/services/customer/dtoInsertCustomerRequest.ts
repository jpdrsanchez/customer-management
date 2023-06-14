export interface DtoInsertCustomerRequest {
  name: string
  gender: 'male' | 'female'
  document: string
  birthdate: string
  address: string
  state: string
  city: string
}
