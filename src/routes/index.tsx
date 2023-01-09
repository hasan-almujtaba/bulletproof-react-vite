import { createBrowserRouter, Outlet } from 'react-router-dom'

import { AuthProvider } from '~/features/auth'
import { ErrorPage } from '~/features/misc'

import protectedRoutes from './protected'
import publicRoutes from './public'

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [...protectedRoutes, ...publicRoutes],
  },
])

export default router
