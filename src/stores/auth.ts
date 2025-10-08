import { defineStore } from 'pinia'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { Organizer } from '@/types'

// ✅ Create Axios client for backend
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as (Organizer & { roles?: string[] }) | null
  }),

  getters: {
    // ✅ Get organizer name (display in navbar)
    currentUserName(): string {
      return (this.user as any)?.organizationName || this.user?.name || ''
    },

    // ✅ Check if the user is admin
    isAdmin(): boolean {
      return this.user?.roles?.includes('ROLE_ADMIN') || false
    },

    // ✅ Use for API Authorization header
    authorizationHeader(): string {
      return `Bearer ${this.token}`
    }
  },

  actions: {
    // ✅ Login using email (backend maps it to username)
    async login(email: string, password: string) {
      console.log('🟢 Trying to log in with:', email, password)
      try {
        const response = await apiClient.post('/api/v1/auth/authenticate', {
          username: email,   // ✅ send "username" but value = email
          password: password
        })

        // ✅ Token & user from backend
        this.token = response.data.access_token
        this.user = response.data.user

        // ✅ Save in browser storage
        localStorage.setItem('access_token', this.token ?? '')
        localStorage.setItem('user', JSON.stringify(this.user))

        console.log('✅ Login successful. Token stored:', this.token)
        console.log('👤 User stored:', this.user)
        return response
      } catch (error: any) {
        console.error('❌ Login failed:', error.response || error.message)
        throw error
      }
    },

    // ✅ Logout function
    logout() {
      console.log('🚪 Logging out...')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },

    // ✅ Reload user when refreshing page
    reload(token: string, user: Organizer) {
      console.log('♻️ Reloading session from localStorage...')
      this.token = token
      this.user = user
    }
  }
})
