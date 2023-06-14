import { UseCustomersService } from './useCustomersService'
import { format } from 'date-fns'
import { genderObject } from './constants/gender.ts'
import { useUpdateForm } from './useUpdateForm'
import { SchemaType } from './useUpdateForm/schema.ts'
import states from '../../utils/estados-cidades.json'
import { useFilterForm } from './useFilterForm'
import { SchemaFilterType } from './useFilterForm/schema.ts'

export const HomeScreen = () => {
  const customers = UseCustomersService()
  const form = useUpdateForm({
    onSubmit: async (values: SchemaType) => {
      await customers.handleUpdateCustomer(customers.customer?.id ?? '', {
        ...values,
        gender: values.gender as 'male' | 'female'
      })
      customers.setCustomer(undefined)
      await customers.handleGetCustomers({})
    }
  })
  const filter = useFilterForm({
    onFilter: async (data: SchemaFilterType) => {
      await customers.handleGetCustomers({
        ...data,
        gender: data.gender as 'male' | 'female'
      })
    }
  })

  return (
    <>
      <form
        className="block max-w-5xl border border-neutral-900 p-4 rounded-xl mb-8"
        onSubmit={filter.handleSubmit(filter.handleFilterCustomers)}
      >
        <h1 className="font-medium text-indigo-500 mb-3">Cadastrar Cliente</h1>
        <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
          <div className="grid">
            <label htmlFor="document" className="mb-1 block text-sm">
              CPF
            </label>
            <input
              type="text"
              id="document"
              className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
              placeholder="00000000000"
              {...filter.register('document')}
            />
            <span className="block min-w-[1px] text-red-500 text-xs h-4">
              {filter.formState.errors.document?.message ?? ''}
            </span>
          </div>
          <div className="grid">
            <label htmlFor="name" className="mb-1 block text-sm">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
              {...filter.register('name')}
            />
            <span className="block min-w-[1px] text-red-500 text-xs h-4">
              {filter.formState.errors.name?.message ?? ''}
            </span>
          </div>
          <div className="grid">
            <label htmlFor="birthdate" className="mb-1 block text-sm">
              Data de Nascimento
            </label>
            <input
              type="date"
              id="birthdate"
              className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
              {...filter.register('birthdate')}
            />
            <span className="block min-w-[1px] text-red-500 text-xs h-4">
              {filter.formState.errors.birthdate?.message ?? ''}
            </span>
          </div>
          <div className="grid">
            <p className="block text-sm mb-1">Sexo:</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <input
                  value="male"
                  type="radio"
                  id="gender_male"
                  {...filter.register('gender')}
                />
                <label htmlFor="gender_male" className="text-sm">
                  Masculino
                </label>
              </div>
              <div className="flex items-center">
                <input
                  value="female"
                  type="radio"
                  id="gender_female"
                  {...filter.register('gender')}
                />
                <label htmlFor="gender_female" className="text-sm">
                  Feminino
                </label>
              </div>
            </div>
            <span className="block min-w-[1px] text-red-500 text-xs h-4">
              {filter.formState.errors.gender?.message ?? ''}
            </span>
          </div>
          <div className="grid">
            <label htmlFor="state" className="mb-1 block text-sm">
              Estado
            </label>
            <select
              id="state"
              className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
              defaultValue=""
              {...filter.register('state')}
            >
              <option disabled value="">
                Selecione um estado
              </option>
              {states.estados.map(state => (
                <option key={state.sigla} value={state.nome}>
                  {state.nome}
                </option>
              ))}
            </select>
            <span className="block min-w-[1px] text-red-500 text-xs h-4">
              {filter.formState.errors.state?.message ?? ''}
            </span>
          </div>
          <div className="grid">
            <label htmlFor="city" className="mb-1 block text-sm">
              Cidade
            </label>
            <select
              id="city"
              className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
              defaultValue=""
              {...filter.register('city')}
            >
              <option disabled value="">
                Selecione uma cidade
              </option>
              {!!filter.watch('state')?.length &&
                states.estados
                  .filter(state => state.nome === filter.watch('state'))
                  .map(state => {
                    return state.cidades.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))
                  })}
            </select>
            <span className="block min-w-[1px] text-red-500 text-xs h-4">
              {filter.formState.errors.city?.message ?? ''}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-6">
          <button
            type="submit"
            className="block px-6 py-2 bg-sky-600 text-neutral-50 cursor-pointer rounded-md"
          >
            Salvar
          </button>
          <button
            onClick={e => {
              e.preventDefault()
              filter.reset()
            }}
            type="reset"
            className="block px-6 py-2 bg-gray-200 cursor-pointer rounded-md"
          >
            Limpar
          </button>
        </div>
      </form>
      <div className="block max-w-5xl border border-neutral-900 p-4 rounded-xl">
        <h2 className="font-medium text-indigo-500 mb-3">
          Resultados da Pesquisa
        </h2>
        <table className="w-full border border-neutral-900">
          <thead className="bg-stone-200">
            <tr>
              <th colSpan={2} className="border border-neutral-900">
                Ações
              </th>
              <th className="border border-neutral-900 p-1">Cliente</th>
              <th className="border border-neutral-900 p-1">CPF</th>
              <th className="border border-neutral-900 p-1">Data Nasc.</th>
              <th className="border border-neutral-900 p-1">Estado</th>
              <th className="border border-neutral-900 p-1">Cidade</th>
              <th className="border border-neutral-900 p-1">Sexo</th>
            </tr>
          </thead>
          <tbody>
            {customers.loading && (
              <tr className="text-center">
                <td colSpan={8} className="border border-neutral-900 p-1">
                  Carregando...
                </td>
              </tr>
            )}
            {!customers.loading && !customers.customers?.length && (
              <tr className="text-center">
                <td colSpan={8} className="border border-neutral-900 p-1">
                  Nenhum cliente encontrado
                </td>
              </tr>
            )}
            {!!customers.customers?.length &&
              customers.customers.map(customer => {
                return (
                  <tr key={customer.id} className="text-center">
                    <td className="border border-neutral-900 p-1">
                      <button
                        onClick={() => {
                          customers.setCustomer(customer)
                          form.reset({
                            name: customer.name,
                            state: customer.state,
                            birthdate: format(
                              new Date(customer.birthdate),
                              'yyyy-MM-dd'
                            ),
                            gender: customer.gender,
                            city: customer.city,
                            address: customer.address
                          })
                        }}
                        type="button"
                        className="w-full block px-6 py-2 bg-yellow-300 cursor-pointer rounded-md"
                      >
                        Editar
                      </button>
                    </td>
                    <td className="border border-neutral-900 p-1">
                      <button
                        onClick={async e => {
                          e.preventDefault()
                          await customers.handleDeleteCustomer(customer.id)
                          await customers.handleGetCustomers({})
                        }}
                        type="button"
                        className="w-full block px-6 py-2 bg-red-500 text-neutral-50 cursor-pointer rounded-md"
                      >
                        Excluir
                      </button>
                    </td>
                    <td className="border border-neutral-900 p-1">
                      {customer.name}
                    </td>
                    <td className="border border-neutral-900 p-1">
                      {customer.document}
                    </td>
                    <td className="border border-neutral-900 p-1">
                      {format(new Date(customer.birthdate), 'dd/LL/yyyy')}
                    </td>
                    <td className="border border-neutral-900 p-1">
                      {customer.state}
                    </td>
                    <td className="border border-neutral-900 p-1">
                      {customer.city}
                    </td>
                    <td className="border border-neutral-900 p-1">
                      {genderObject?.[customer.gender] ?? ''}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        {!!customers.customer && (
          <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-50 bg-[rgba(0,0,0,0.3)] p-8 overflow-auto">
            <form
              className="bg-neutral-50 p-6 rounded-xl w-full max-w-3xl"
              onSubmit={form.handleSubmit(form.handleInsertCustomer)}
            >
              <div className="flex items-center justify-end mb-4">
                <button
                  onClick={() => {
                    customers.setCustomer(undefined)
                    form.reset()
                  }}
                >
                  X
                </button>
              </div>
              <h3 className="text-center font-medium text-xl mb-2">
                Editar Cliente
              </h3>
              <div className="grid gap-1 mb-2">
                <label htmlFor="name" className="block text-sm">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
                  {...form.register('name')}
                />
                <span className="block min-w-[1px] text-red-500 text-xs h-4">
                  {form.formState.errors.name?.message ?? ''}
                </span>
              </div>
              <div className="grid gap-1 mb-2">
                <label htmlFor="birthdate" className="block text-sm">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  id="birthdate"
                  className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
                  {...form.register('birthdate')}
                />
                <span className="block min-w-[1px] text-red-500 text-xs h-4">
                  {form.formState.errors.birthdate?.message ?? ''}
                </span>
              </div>
              <div className="grid gap-1 mb-2">
                <p className="block text-sm">Sexo:</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <input
                      value="male"
                      type="radio"
                      id="gender_male"
                      {...form.register('gender')}
                      defaultChecked={customers.customer.gender === 'male'}
                    />
                    <label htmlFor="gender_male" className="text-sm">
                      Masculino
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      value="female"
                      type="radio"
                      id="gender_female"
                      {...form.register('gender')}
                      defaultChecked={customers.customer.gender === 'female'}
                    />
                    <label htmlFor="gender_female" className="text-sm">
                      Feminino
                    </label>
                  </div>
                </div>
                <span className="block min-w-[1px] text-red-500 text-xs h-4">
                  {form.formState.errors.gender?.message ?? ''}
                </span>
              </div>
              <div className="grid gap-1 mb-2">
                <label htmlFor="state" className="block text-sm">
                  Estado
                </label>
                <select
                  id="state"
                  className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
                  {...form.register('state')}
                >
                  <option disabled value="">
                    Selecione um estado
                  </option>
                  {states.estados.map(state => (
                    <option key={state.sigla} value={state.nome}>
                      {state.nome}
                    </option>
                  ))}
                </select>
                <span className="block min-w-[1px] text-red-500 text-xs h-4">
                  {form.formState.errors.state?.message ?? ''}
                </span>
              </div>
              <div className="grid gap-1 mb-2">
                <label htmlFor="city" className="block text-sm">
                  Cidade
                </label>
                <select
                  id="city"
                  className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
                  {...form.register('city')}
                >
                  <option disabled value="">
                    Selecione uma cidade
                  </option>
                  {states.estados
                    .filter(state => state.nome === form.watch('state'))
                    .map(state => {
                      return state.cidades.map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))
                    })}
                </select>
                <span className="block min-w-[1px] text-red-500 text-xs h-4">
                  {form.formState.errors.city?.message ?? ''}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-300 py-2 px-6 rounded-xl mt-4"
              >
                Atualizar
              </button>
            </form>
          </div>
        )}
      </div>
      <nav className="flex items-center justify-center gap-2 mt-4 flex-wrap">
        {Array.from({ length: customers.meta?.meta.last_page || 0 })
          .fill('page')
          .map((_, index) => (
            <button
              onClick={async () => {
                await customers.handleGetCustomers({ page: index + 1 })
              }}
              className="flex items-center justify-center w-10 h-10 rounded border border-neutral-900"
              key={index}
            >
              {index + 1}
            </button>
          ))}
      </nav>
    </>
  )
}
