<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useAuthStore } from '@/stores/auth'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

// ✅ Import Pinia Auth Store
const authStore = useAuthStore()

// ✅ Simplified validation schema (as required in step 4.2)
const validationSchema = yup.object({
  email: yup.string().required('The email is required'),
  password: yup.string().required('The password is required')
})

// ✅ Setup form
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

// ✅ Define fields
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

// ✅ Handle form submission
const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!')
  console.log(values)
  authStore.login(values.email, values.password)
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <!-- ✅ FORM -->
      <form class="space-y-6" @submit.prevent="onSubmit">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div class="mt-2">
            <!-- ✅ Type changed from 'email' to 'text' (as required in step 4.2) -->
            <InputText
              type="text"
              v-model="email"
              placeholder="Email address"
              :error="errors['email']"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div class="mt-2">
            <InputText
              type="password"
              v-model="password"
              placeholder="Password"
              :error="errors['password']"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold
                   leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
