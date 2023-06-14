import { useLocalForm } from './useLocalForm'
import states from '../../utils/estados-cidades.json'

export const CreateScreen = () => {
  const form = useLocalForm()

  return (
    <form
      className="block max-w-4xl border border-neutral-900 p-4 rounded-xl"
      onSubmit={form.handleSubmit(form.handleInsertCustomer)}
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
            {...form.register('document')}
          />
          <span className="block min-w-[1px] text-red-500 text-xs h-4">
            {form.formState.errors.document?.message ?? ''}
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
            {...form.register('name')}
          />
          <span className="block min-w-[1px] text-red-500 text-xs h-4">
            {form.formState.errors.name?.message ?? ''}
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
            {...form.register('birthdate')}
          />
          <span className="block min-w-[1px] text-red-500 text-xs h-4">
            {form.formState.errors.birthdate?.message ?? ''}
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
                {...form.register('gender')}
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
        <div className="grid">
          <label htmlFor="address" className="mb-1 block text-sm">
            Endereço
          </label>
          <input
            type="text"
            id="address"
            className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
            {...form.register('address')}
          />
          <span className="block min-w-[1px] text-red-500 text-xs h-4">
            {form.formState.errors.address?.message ?? ''}
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
        <div className="grid">
          <label htmlFor="city" className="mb-1 block text-sm">
            Cidade
          </label>
          <select
            id="city"
            className="h-10 outline-0 border border-neutral-900 rounded-md py-2 px-4"
            defaultValue=""
            {...form.register('city')}
          >
            <option disabled value="">
              Selecione uma cidade
            </option>
            {!!form.watch('state')?.length &&
              states.estados
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
            form.reset()
          }}
          type="reset"
          className="block px-6 py-2 bg-gray-200 cursor-pointer rounded-md"
        >
          Limpar
        </button>
      </div>
    </form>
  )
}
