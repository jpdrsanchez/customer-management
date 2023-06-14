import * as yup from 'yup'

export const schema = yup.object({
  document: yup
    .string()
    .matches(/\d{11}/, {
      message: 'O Campo CPF deve conter 11 digitos',
      excludeEmptyString: true
    })
    .optional()
    .nullable(),
  name: yup.string().optional().nullable(),
  birthdate: yup.string().optional().nullable(),
  gender: yup.string().optional().nullable(),
  city: yup.string().optional().nullable(),
  state: yup.string().optional().nullable()
})

export type SchemaFilterType = yup.InferType<typeof schema>
