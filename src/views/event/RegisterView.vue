<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import axios from 'axios'

const router = useRouter()
const store = useMessageStore()

// ✅ form data
const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// ✅ Sign up function
const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
      {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value
      }
    )

    console.log('✅ Registered successfully:', response.data)
    store.updateMessage('✅ Registration successful! You can now log in.')
    router.push({ name: 'login' })
  } catch (error: any) {
    console.error('❌ Registration failed:', error)
    alert('Registration failed. Please check your inputs or try again.')
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 class="text-2xl font-semibold text-center mb-4 text-gray-700">Sign Up</h2>

      <form @submit.prevent="register" class="flex flex-col space-y-4">
        <input v-model="firstname" type="text" placeholder="First Name" class="input" required />
        <input v-model="lastname" type="text" placeholder="Last Name" class="input" required />
        <input v-model="email" type="email" placeholder="Email" class="input" required />
        <input v-model="password" type="password" placeholder="Password" class="input" required />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="input"
          required
        />

        <button
          type="submit"
          class="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>

        <p class="text-center text-sm text-gray-600 mt-2">
          Already have an account?
          <RouterLink to="/login" class="text-blue-500 hover:underline">Login</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  width: 100%;
}
.input:focus {
  border-color: #22c55e;
}
</style>
