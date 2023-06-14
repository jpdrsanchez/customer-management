import { SubmitHandler, useForm } from 'react-hook-form'
import { schema, SchemaType } from './schema.ts'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import toast from 'react-hot-toast'

interface UseUpdateFormParams {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: SchemaType) => Promise<void>
}

export const useUpdateForm = (params: UseUpdateFormParams) => {
  const form = useForm<Required<SchemaType>>({
    resolver: yupResolver(schema)
  })

  const handleInsertCustomer: SubmitHandler<SchemaType> = React.useCallback(
    async values => {
      try {
        await params.onSubmit(values)

        toast.success('Cliente atualizado com sucesso', {
          position: 'top-center'
        })
      } catch (e) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        toast.error(
          (e as any)?.response?.data.message ?? 'Erro ao criar novo cliente',
          { position: 'top-center' }
        )
      }
    },
    [params]
  )

  return {
    ...form,
    handleInsertCustomer
  }
}
