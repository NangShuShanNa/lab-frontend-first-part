<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const router = useRouter()
const events = ref<Event[]>([])   // ✅ always an array
const totalEvents = ref(0)
const keyword = ref('')           // ✅ search keyword

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)

const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

function updateKeyword(value: string) {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }

  queryFunction.then((response) => {
    events.value = response.data
    console.log('events', events.value)

    totalEvents.value = response.headers['x-total-count']
    console.log('totalEvent', totalEvents.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}

// ✅ load first time
onMounted(() => {
  updateKeyword('')
})
</script>

<template>
  <h1>Events For Good</h1>

  <main class="flex flex-col items-center">
    <!-- ✅ Search box -->
    <div class="w-64 mb-4">
      <input
        v-model="keyword"
        type="text"
        placeholder="Search..."
        class="w-full border rounded px-3 py-2"
        @input="updateKeyword(keyword)"
      />
    </div>

    <!-- ✅ Render events (from backend, not local filter) -->
    <div class="flex flex-col items-center">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />

      <!-- Pagination -->
      <div class="pagination">
        <RouterLink
          id="page-prev"
          :to="{ name: 'event-list-view', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          &#60; Prev Page
        </RouterLink>

        <RouterLink
          id="page-next"
          :to="{ name: 'event-list-view', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNexPage"
        >
          Next Page &#62;
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
