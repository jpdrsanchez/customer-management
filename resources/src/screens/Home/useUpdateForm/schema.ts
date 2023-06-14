import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .optional(),
  birthdate: yup.string().optional(),
  gender: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional()
})

export type SchemaType = yup.InferType<typeof schema>
