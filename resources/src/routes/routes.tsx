import { createBrowserRouter } from 'react-router-dom'
import { Index } from '../templates/RootTemplate'
import { CreateScreen } from '../screens/Create'
import { HomeScreen } from '../screens/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/',
        element: <HomeScreen />
      },
      {
        path: 'create',
        element: <CreateScreen />
      }
    ]
  }
])
