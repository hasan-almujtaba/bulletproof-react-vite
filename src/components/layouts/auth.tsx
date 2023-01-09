import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '~/features/auth'

export const AuthLayout = () => {
  const { user } = useAuth()

  if (user.token === '' || user.token === undefined) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
