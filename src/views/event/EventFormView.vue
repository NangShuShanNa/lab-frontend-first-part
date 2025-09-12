<script setup lang="ts">
import type { Event } from '@/types'
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'   // flash message store

// define reactive event object (⚠️ no id)
const event = ref<Event>({
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  organizer: '',
  petAllowed: false   // ✅ match backend
})

// router + store instance
const router = useRouter()
const store = useMessageStore()

// save handler → calls backend
function saveEvent() {
  EventService.createEvent(event.value)
    .then((response: AxiosResponse<Event>) => {
      // ✅ Show success flash message
      store.updateMessage('✅ You have successfully added a new event: ' + response.data.title)

      setTimeout(() => {
        store.resetMessage()
      }, 3000)

      // Redirect to detail page
      router.push({
        name: 'event-detail-view',
        params: { id: response.data.id }
      })
    })
    .catch(() => {
      // ✅ Show error flash message
      store.updateMessage('❌ Network error, please try again.')

      setTimeout(() => {
        store.resetMessage()
      }, 3000)

      // Redirect to error page
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an Event</h1>

    <!-- ✅ Flash message -->
    <p v-if="store.message" :class="['flash', store.message.includes('❌') ? 'error' : 'success']">
      {{ store.message }}
    </p>

    <form @submit.prevent="saveEvent" class="event-form">
      <div class="form-group">
        <label>Category</label>
        <input v-model="event.category" type="text" placeholder="Category" class="field" />
      </div>

      <div class="form-group">
        <label>Title</label>
        <input v-model="event.title" type="text" placeholder="Title" class="field" />
      </div>

      <div class="form-group">
        <label>Description</label>
        <input v-model="event.description" type="text" placeholder="Description" class="field" />
      </div>

      <div class="form-group">
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Location" class="field" />
      </div>

      <div class="form-group">
        <label>Date</label>
        <input v-model="event.date" type="date" class="field" />
      </div>

      <div class="form-group">
        <label>Time</label>
        <input v-model="event.time" type="time" class="field" />
      </div>

      <div class="form-group">
        <label>Organizer</label>
        <input v-model="event.organizer" type="text" placeholder="Organizer" class="field" />
      </div>

      <!-- ✅ fixed name -->
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
  margin-bottom: 3rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.field {
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
  font-size: 1rem;
  align-self: flex-start;
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
