import { SubmitHandler, useForm } from 'react-hook-form'
import { schema, SchemaFilterType } from './schema.ts'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import toast from 'react-hot-toast'

interface UseUpdateFormParams {
  // eslint-disable-next-line no-unused-vars
  onFilter: (data: SchemaFilterType) => Promise<void>
}

export const useFilterForm = (params: UseUpdateFormParams) => {
  const form = useForm<Required<SchemaFilterType>>({
    resolver: yupResolver(schema)
  })

  const handleFilterCustomers: SubmitHandler<SchemaFilterType> =
    React.useCallback(
      async values => {
        try {
          await params.onFilter({
            name: values.name?.length ? values.name : undefined,
            birthdate: values.birthdate?.length ? values.birthdate : undefined,
            gender: values.gender?.length ? values.gender : undefined,
            city: values.city?.length ? values.city : undefined,
            state: values.state?.length ? values.state : undefined,
            document: values.document?.length ? values.document : undefined
          })
        } catch (e) {
          /* eslint-disable @typescript-eslint/no-explicit-any */
          toast.error(
            (e as any)?.response?.data.message ?? 'Erro ao listar clientes',
            { position: 'top-center' }
          )
        }
      },
      [params]
    )

  return {
    ...form,
    handleFilterCustomers
  }
}
