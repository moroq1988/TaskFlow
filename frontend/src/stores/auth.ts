import { defineStore } from "pinia"

interface User {
  id: number
  username: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(email: string, password: string) {
      // ログイン処理
    },
    async logout() {
      // ログアウト処理
    },
  },
})
