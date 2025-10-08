import { defineStore } from 'pinia'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { Organizer } from '@/types'   // ✅ Import Organizer type

// ✅ Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// ✅ Define Pinia store for authentication
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    // ✅ Organizer that contains nested user with roles
    user: null as (Organizer & { user?: { roles?: string[] } }) | null
  }),

  getters: {
    // ✅ Getter to get current user name (Organizer name)
    currentUserName(): string {
      return this.user?.organizationName || ''
    },

    // ✅ Fix: Check admin role from nested user
    isAdmin(): boolean {
      return this.user?.user?.roles?.includes('ROLE_ADMIN') || false
    },

    // ✅ For secure requests (Step 6.14)
    authorizationHeader(): string {
      return `Bearer ${this.token}`
    }
  },

  actions: {
    async login(email: string, password: string) {
      console.log('🟢 Trying to log in with:', email, password)
      try {
        const response = await apiClient.post('/api/v1/auth/authenticate', {
          username: email,
          password: password
        })

        this.token = response.data.accessToken
        this.user = response.data.user

        localStorage.setItem('access_token', this.token as string)
        localStorage.setItem('user', JSON.stringify(this.user))

        console.log('✅ Login successful. Token stored:', this.token)
        console.log('👤 User stored:', this.user)

        return response
      } catch (error: any) {
        console.error('❌ Login failed:', error.response || error.message)
        throw error
      }
    },

    logout() {
      console.log('🚪 Logging out...')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },

    reload(token: string, user: Organizer) {
      console.log('♻️ Reloading session from localStorage...')
      this.token = token
      this.user = user
    }
  }
})
