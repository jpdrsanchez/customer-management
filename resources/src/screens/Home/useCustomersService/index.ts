import * as React from 'react'
import {
  DtoCustomer,
  DtoListCustomersResponse
} from '../../../services/customer/dtoListCustomersResponse.ts'
import { DtoListCustomersRequest } from '../../../services/customer/dtoListCustomersRequest.ts'
import { CustomerService } from '../../../services/customer'
import toast from 'react-hot-toast'
import { DtoInsertCustomerRequest } from '../../../services/customer/dtoInsertCustomerRequest.ts'

export const UseCustomersService = () => {
  const [meta, setMeta] = React.useState<DtoListCustomersResponse>()
  const [customer, setCustomer] = React.useState<DtoCustomer>()
  const [customers, setCustomers] = React.useState<DtoCustomer[]>()
  const [loading, setLoading] = React.useState<boolean>()

  const handleGetCustomers = React.useCallback(
    async (request: DtoListCustomersRequest) => {
      try {
        setLoading(true)
        const response = await CustomerService.list(request)
        setMeta(response)
        setCustomers(response.data)
      } catch (e) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        toast.error(
          (e as any)?.response?.data.message ?? 'Erro ao listar clientes',
          { position: 'top-center' }
        )
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const handleDeleteCustomer = React.useCallback(async (id: string) => {
    try {
      await CustomerService.delete(id)
      toast.success('Cliente removido com sucesso', { position: 'top-center' })
    } catch (e) {
      toast.error(
        (e as any)?.response?.data.message ?? 'Erro ao apagar cliente',
        { position: 'top-center' }
      )
    }
  }, [])

  const handleUpdateCustomer = React.useCallback(
    async (
      id: string,
      request: Partial<Omit<DtoInsertCustomerRequest, 'document'>>
    ) => {
      try {
        await CustomerService.update(id, request)
      } catch (e) {
        toast.error(
          (e as any)?.response?.data.message ?? 'Erro ao atualizar cliente',
          { position: 'top-center' }
        )
      }
    },
    []
  )

  const handleShowCustomer = React.useCallback(async (id: string) => {
    try {
      const customer = await CustomerService.findById(id)
      setCustomer(customer)
    } catch (e) {
      toast.error(
        (e as any)?.response?.data.message ?? 'Erro ao procurar cliente',
        { position: 'top-center' }
      )
    }
  }, [])

  React.useEffect(() => {
    handleGetCustomers({})
  }, [handleGetCustomers])

  return {
    customers,
    loading,
    handleGetCustomers,
    handleDeleteCustomer,
    handleUpdateCustomer,
    handleShowCustomer,
    customer,
    setCustomer,
    meta
  }
}
