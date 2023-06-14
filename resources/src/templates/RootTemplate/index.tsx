import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../assets/upd8-logo.png'

export const Index = () => {
  return (
    <main className="bg-neutral-50 flex items-stretch h-screen overflow-auto">
      <nav className="h-full bg-stone-200 pt-0 pb-6 px-6 border-r border-r-gray-200">
        <img src={logo} alt="Logo da empresa upd8" className="-mt-6" />
        <div className="grid gap-2">
          <NavLink to="/" className="block text-lg">
            Home
          </NavLink>
          <NavLink to="/create" className="block text-lg">
            Criar
          </NavLink>
        </div>
      </nav>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </main>
  )
}
