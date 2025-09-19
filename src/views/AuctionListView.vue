<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// State
const auctions = ref<any[]>([])
const search = ref('')
const selectedType = ref('')
const types = ref(['All Types', 'Collectible', 'Electronics', 'Art', 'Sports'])

// Load auctions from backend
const fetchAuctions = async () => {
  try {
    const response = await axios.get('http://localhost:8080/auctionitems')
    auctions.value = response.data
  } catch (error) {
    console.error('Error fetching auctions:', error)
  }
}

onMounted(fetchAuctions)

// ✅ Filter logic
const filteredAuctions = computed(() => {
  return auctions.value.filter(item => {
    const matchesSearch = item.description
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchesType =
      selectedType.value === '' ||
      selectedType.value === 'All Types' ||
      item.type === selectedType.value

    return matchesSearch && matchesType
  })
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Auction Items</h1>

    <!-- Search + Filter -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Search description"
        class="flex-1 border rounded px-3 py-2"
      />

      <select
        v-model="selectedType"
        class="border rounded px-3 py-2"
      >
        <option
          v-for="type in types"
          :key="type"
          :value="type"
        >
          {{ type }}
        </option>
      </select>

      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>

    <!-- Auction Cards -->
    <div class="grid gap-4">
      <div
        v-for="item in filteredAuctions"
        :key="item.id"
        class="border rounded p-4 shadow"
      >
        <h2 class="text-lg font-semibold">{{ item.description }}</h2>
        <p class="text-sm text-gray-600">Type: {{ item.type }}</p>
        <p class="text-sm text-gray-600">
          Successful Bid:
          <span v-if="item.successfulBid">
            ${{ item.successfulBid.amount }}
          </span>
          <span v-else class="text-red-500">No winner yet</span>
        </p>
      </div>
    </div>
  </div>
</template>
