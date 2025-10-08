<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiLogout, mdiAccountPlus, mdiLogin } from '@mdi/js'
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)

const authStore = useAuthStore()
const router = useRouter()

// ✅ Logout function (Step 6.12)
function logout() {
  authStore.logout()
  router.push({ name: 'login' })
  console.log('🔴 Logged out')
}

// ✅ Reload user from localStorage when refreshing (Step 6.13)
const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header class="max-h-screen leading-normal">
      <!-- Flash message -->
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>

      <div class="wrapper">
        <nav class="py-6 flex justify-center space-x-6">
          <!-- Show when NOT logged in -->
          <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto space-x-6">
            <li class="nav-item px-2">
              <RouterLink to="/register" class="nav-link flex items-center">
                <SvgIcon type="mdi" :path="mdiAccountPlus" />
                <span class="ml-2">Sign Up</span>
              </RouterLink>
            </li>

            <li class="nav-item px-2">
              <RouterLink to="/login" class="nav-link flex items-center">
                <SvgIcon type="mdi" :path="mdiLogin" />
                <span class="ml-2">Login</span>
              </RouterLink>
            </li>
          </ul>

          <!-- Show when logged in -->
          <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto space-x-6">
            <li class="nav-item px-2">
              <RouterLink to="/profile" class="nav-link flex items-center">
                <SvgIcon type="mdi" :path="mdiAccount" />
                <span class="ml-3">{{ authStore.currentUserName }}</span>
              </RouterLink>
            </li>

            <li class="nav-item px-2">
              <a class="nav-link flex items-center hover:cursor-pointer" @click="logout">
                <SvgIcon type="mdi" :path="mdiLogout" />
                <span class="ml-3">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.nav-link {
  color: #374151;
  text-decoration: none;
}
.nav-link:hover {
  color: #2563eb;
}
</style>
