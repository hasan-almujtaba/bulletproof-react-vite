import { RouteObject } from 'react-router-dom'

import { AuthLayout } from '~/components/layouts'

const protectedRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <AuthLayout />,
    children: [
      {
        path: '/dashboard',
        element: <div>wew</div>,
      },
      {
        path: '/dashboard/cxx',
        element: <div>wew</div>,
      },
    ],
  },
]

export default protectedRoutes
