export interface DtoListCustomersRequest {
  page?: number | null
  per_page?: number | null
  name?: string | null
  gender?: 'male' | 'female' | null
  document?: string | null
  birthdate?: string | null
  state?: string | null
  city?: string | null
}
