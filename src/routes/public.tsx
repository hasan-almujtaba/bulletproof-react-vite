import React from 'react'
import { RouteObject } from 'react-router-dom'
import { LandingPage } from '~/features/misc'

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/register',
    element: <div>Register page</div>,
  },
]

export default publicRoutes
