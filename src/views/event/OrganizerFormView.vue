<script setup lang="ts">
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'

const router = useRouter()
const saving = ref(false)

const organizer = ref({
  organizationName: '',
  address: '',
  email: '',
  imageUrl: ''   // ✅ only 1 image allowed
})

const saveOrganizer = async () => {
  saving.value = true
  try {
    const response = await OrganizerService.createOrganizer(organizer.value)
    if (response.status === 201) {   // ✅ check CREATED
      alert('✅ Organizer created successfully!')
      // ✅ redirect to detail view instead of list
      router.push({ name: 'organizer-detail-view', params: { id: response.data.id } })
    }
  } catch (error: any) {
    console.error("Save failed:", error.response?.data || error.message)
    alert(`❌ Error saving organizer: ${error.response?.data?.message || 'Unknown error'}`)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Add Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <label class="block mb-2">Organization Name</label>
      <input v-model="organizer.organizationName" class="border w-full p-2 mb-4" required />

      <label class="block mb-2">Email</label>
      <input v-model="organizer.email" type="email" class="border w-full p-2 mb-4" required />

      <label class="block mb-2">Address</label>
      <input v-model="organizer.address" class="border w-full p-2 mb-4" required />

      <!-- ✅ New field for image -->
      <label class="block mb-2">Image URL</label>
      <input v-model="organizer.imageUrl" type="text" class="border w-full p-2 mb-4" required />

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full" :disabled="saving">
        {{ saving ? 'Saving...' : 'Save' }}
      </button>
    </form>
  </div>
</template>
