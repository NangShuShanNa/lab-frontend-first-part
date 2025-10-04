<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'

// Organizer type definition
interface Organizer {
  id: number
  organizationName: string
  email: string
  address: string
  imageUrl: string
}

const route = useRoute()
const organizer = ref<Organizer | null>(null)

onMounted(async () => {
  try {
    // Convert route param to number (backend expects Long ID)
    const id = Number(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id)
    const res = await OrganizerService.getOrganizer(id)
    organizer.value = res.data
  } catch (err: any) {
    console.error('❌ Error loading organizer:', err)
  }
})
</script>

<template>
  <div v-if="organizer" class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">{{ organizer.organizationName }}</h1>
    <p><strong>Email:</strong> {{ organizer.email }}</p>
    <p><strong>Address:</strong> {{ organizer.address }}</p>

    <div class="mt-4">
      <img
        :src="organizer.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'"
        alt="Organizer Image"
        class="w-64 rounded shadow border"
        @error="($event) => ($event.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'"
      />
    </div>
  </div>

  <div v-else class="text-center p-6">
    <p>Loading organizer details...</p>
  </div>
</template>
