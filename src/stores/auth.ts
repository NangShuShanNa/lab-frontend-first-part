import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosInstance } from 'axios'

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
    token: null as string | null
  }),

  actions: {
    // ✅ Login action
    async login(username: string, password: string) {
      console.log('🟢 Trying to log in with:', username, password)

      try {
        const response = await apiClient.post('/api/v1/auth/authenticate', {
          username,
          password
        })
        this.token = response.data.access_token
        console.log('✅ Login successful. Token stored:', this.token)
        return response
      } catch (error: any) {
        console.error('❌ Login failed:', error.response || error.message)
        throw error
      }
    }
  }
})
