<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'

// ✅ Define Organizer type
interface Organizer {
  id: number
  organizationName: string
  email: string
  address: string
  imageUrl: string
}

const organizers = ref<Organizer[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await OrganizerService.getOrganizers()
    organizers.value = res.data
  } catch (err) {
    console.error('Error loading organizers:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Organizer List</h1>

    <div v-if="loading" class="text-center">Loading organizers...</div>

    <div v-else>
      <div
        v-for="org in organizers"
        :key="org.id"
        class="border p-4 mb-4 rounded shadow hover:bg-gray-50"
      >
        <h2 class="text-xl font-semibold">{{ org.organizationName }}</h2>
        <p><strong>Email:</strong> {{ org.email }}</p>
        <p><strong>Address:</strong> {{ org.address }}</p>

        <!-- ✅ Click to go to OrganizerDetailView -->
        <RouterLink
          :to="{ name: 'organizer-detail-view', params: { id: org.id } }"
          class="text-blue-500 underline"
        >
          View Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>
