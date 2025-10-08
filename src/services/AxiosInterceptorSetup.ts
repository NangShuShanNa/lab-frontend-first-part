// src/services/AxiosInterceptorSetup.ts
import apiClient from '@/services/AxiosClient.js'

// ✅ Attach token to every outgoing request automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      // Ensure headers exist before assigning Authorization
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`

      console.log('🟢 Token added to request:', config.headers.Authorization)
    } else {
      console.log('⚠️ No token found in localStorage')
    }
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// ✅ Handle unauthorized responses (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('🔴 Unauthorized! Clearing invalid token.')
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
