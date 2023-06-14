import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .required('O campo nome é obrigatório'),
  document: yup
    .string()
    .matches(/\d{11}/, 'O Campo CPF deve conter 11 digitos')
    .required('O campo CPF é obrigatório'),
  birthdate: yup
    .string()
    .required('O campo de data de nascimento é obrigatório'),
  gender: yup.string().required('O campo de sexo é obrigatório'),
  address: yup.string().required('O campo de endereço é obrigatório'),
  city: yup.string().required('O campo de cidade é obrigatório'),
  state: yup.string().required('O campo de estado é obrigatório')
})

export type SchemaType = yup.InferType<typeof schema>
