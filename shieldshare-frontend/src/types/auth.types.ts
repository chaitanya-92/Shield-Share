export interface AuthState {
  token: string | null
  login: (token: string) => void
  logout: () => void
}