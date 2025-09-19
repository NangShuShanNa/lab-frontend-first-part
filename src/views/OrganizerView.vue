<script setup lang="ts">
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'

const router = useRouter()

const organizer = ref({
  organizationName: '',
  address: ''
})

const saveOrganizer = () => {
  OrganizerService.createOrganizer(organizer.value)
    .then(() => {
      alert('Organizer created successfully!')
      router.push({ name: 'organizer-list-view' }) // redirect to list page
    })
    .catch(() => {
      alert('Error saving organizer')
    })
}
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Add Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <label class="block mb-2">Organization Name</label>
      <input v-model="organizer.organizationName" class="border w-full p-2 mb-4" required />

      <label class="block mb-2">Address</label>
      <input v-model="organizer.address" class="border w-full p-2 mb-4" required />

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  </div>
</template>
