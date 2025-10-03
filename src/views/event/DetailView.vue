<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'

// Props from parent (router view or event fetch)
const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)
</script>

<template>
  <div>
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>

    <!-- ✅ Show event images -->
    <div v-if="event.images && event.images.length > 0" class="flex flex-row flex-wrap justify-center">
      <img
        v-for="(image, index) in event.images"
        :key="index"
        :src="image"
        alt="event image"
        class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
      />
    </div>
  </div>
</template>
