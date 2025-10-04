<script setup lang="ts">
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'

const router = useRouter()

// reactive form data
const organizer = ref({
  organizationName: '',
  email: '',
  address: '',
  imageUrl: ''   // ✅ only 1 image allowed
})

const saveOrganizer = () => {
  OrganizerService.createOrganizer(organizer.value)
    .then((res) => {
      alert('Organizer created successfully!')

      // ✅ redirect to the detail view using returned ID
      router.push({
        name: 'organizer-detail-view',
        params: { id: res.data.id }
      })
    })
    .catch((err) => {
      console.error('Error saving organizer:', err)
      alert('Error saving organizer')
    })
}
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-xl font-bold mb-4">Add Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <label class="block mb-2">Organization Name</label>
      <input v-model="organizer.organizationName" class="border w-full p-2 mb-4" required />

      <label class="block mb-2">Email</label>
      <input v-model="organizer.email" type="email" class="border w-full p-2 mb-4" required />

      <label class="block mb-2">Address</label>
      <input v-model="organizer.address" class="border w-full p-2 mb-4" required />

      <label class="block mb-2">Image URL</label>
      <input v-model="organizer.imageUrl" type="text" class="border w-full p-2 mb-4" required />

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  </div>
</template>
