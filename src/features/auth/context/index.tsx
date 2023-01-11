import { createContext, PropsWithChildren, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLocalStorage } from '~/hooks'

import { AuthContextValue, AuthData } from './type'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const initialValue = { token: '' }

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage<AuthData>('react-auth', initialValue)
  const navigate = useNavigate()

  const login = async (data: AuthData) => {
    setUser(data)
    navigate('/dashboard', { replace: true })
  }

  const logout = () => {
    setUser(initialValue)
    navigate('/', { replace: true })
  }

  const value = {
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a CountProvider')
  }

  return context
}

export { AuthProvider, useAuth }
