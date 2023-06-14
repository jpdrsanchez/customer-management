import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { schema, SchemaType } from './schema.ts'
import { yupResolver } from '@hookform/resolvers/yup'
import { CustomerService } from '../../../services/customer'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useLocalForm = () => {
  const navigate = useNavigate()
  const form = useForm<SchemaType>({ resolver: yupResolver(schema) })

  const handleInsertCustomer: SubmitHandler<SchemaType> = React.useCallback(
    async values => {
      try {
        const response = await CustomerService.insert({
          name: values.name,
          address: values.address,
          city: values.city,
          birthdate: values.birthdate,
          gender: values.gender as 'male' | 'female',
          state: values.state,
          document: values.document
        })

        toast.success(response.message, { position: 'top-center' })
        navigate('/')
      } catch (e) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        toast.error(
          (e as any)?.response?.data.message ?? 'Erro ao criar novo cliente',
          { position: 'top-center' }
        )
      }
    },
    [navigate]
  )

  return {
    ...form,
    handleInsertCustomer
  }
}
