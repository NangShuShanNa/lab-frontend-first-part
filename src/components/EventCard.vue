<script setup lang="ts">
import { type Event } from '@/types'

// receive props from parent
defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink
    class="event-link"
    :to="{ name: 'event-detail-view', params: { id: event.id } }"
  >
    <div
      class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
    >
      <!-- Event title -->
      <h2>{{ event.title }}</h2>
      <span>by</span>
      <h5>{{event.organizer.name}}</h5>

      <!-- Time and Date -->
      <span>{{ event.time }} on {{ event.date }}</span>
      <br />

      <!-- Category and Location -->
      <span>{{ event.category }} @ {{ event.location }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
