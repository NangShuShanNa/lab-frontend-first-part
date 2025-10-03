<script setup lang="ts">
import type { Event } from '@/types'
import type { AxiosResponse } from 'axios'
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue'   // ✅ Import ImageUpload

// ✅ Event model
const event = ref<Event>({
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  organizer: {
    id: 0,
    organizationName: ''
  },
  images: [],   // ✅ Add images array
  petAllowed: false
})

// ✅ Organizers list
const organizers = ref<{ id: number; organizationName: string }[]>([])

const router = useRouter()
const store = useMessageStore()

// ✅ Load organizers
onMounted(() => {
  OrganizerService.getOrganizers()
    .then((res) => {
      organizers.value = res.data
      console.log('✅ Loaded organizers:', organizers.value)
    })
    .catch((err) => {
      console.error('❌ Error loading organizers:', err)
    })
})

// ✅ Save event
function saveEvent() {
  console.log('👉 Submitting event:', JSON.stringify(event.value, null, 2))

  EventService.createEvent(event.value)
    .then((response: AxiosResponse<Event>) => {
      store.updateMessage('✅ Event created: ' + response.data.title)
      setTimeout(() => store.resetMessage(), 3000)

      router.push({
        name: 'event-detail-view',
        params: { id: response.data.id }
      })
    })
    .catch((error) => {
      console.error('❌ Error:', error)
      store.updateMessage('❌ Network error, please try again.')
      setTimeout(() => store.resetMessage(), 3000)
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create Event</h1>

    <!-- ✅ Flash message -->
    <p v-if="store.message" :class="['flash', store.message.includes('❌') ? 'error' : 'success']">
      {{ store.message }}
    </p>

    <form @submit.prevent="saveEvent" class="event-form">
      <BaseInput v-model="event.category" type="text" label="Category" />
      <BaseInput v-model="event.title" type="text" label="Title" />
      <BaseInput v-model="event.description" type="text" label="Description" />
      <BaseInput v-model="event.location" type="text" label="Location" />
      <BaseInput v-model="event.date" type="date" label="Date" />
      <BaseInput v-model="event.time" type="time" label="Time" />

      <!-- ✅ Organizer dropdown -->
      <BaseSelect
        v-model="event.organizer.id"
        :options="organizers"
        label="Select Organizer"
      />

      <!-- ✅ Image upload -->
      <h3>The image of the Event</h3>
      <ImageUpload v-model="event.images" />

      <!-- ✅ Pets allowed -->
      <div class="form-group">
        <label>
          <input v-model="event.petAllowed" type="checkbox" />
          Pets Allowed?
        </label>
      </div>

      <button type="submit" class="button">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.event-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
}
.button:hover {
  background-color: #45a049;
}
.flash {
  padding: 0.7rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  font-weight: bold;
}
.success {
  background: #4caf50;
  color: white;
}
.error {
  background: #f44336;
  color: white;
}
</style>
