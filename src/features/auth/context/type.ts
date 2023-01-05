export type AuthData = {
  token: string
}

export type AuthContextValue = {
  user: AuthData
  login: (data: AuthData) => void
  logout: () => void
}
