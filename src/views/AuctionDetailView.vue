<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AuctionService from '@/services/AuctionService'

const route = useRoute()
const auction = ref<any>(null)

onMounted(() => {
  AuctionService.getAuction(Number(route.params.id)).then((response) => {
    auction.value = response.data
  })
})
</script>

<template>
  <div v-if="auction" class="p-4">
    <h1 class="text-xl font-bold mb-4">{{ auction.description }} ({{ auction.type }})</h1>

    <h2 class="font-semibold mb-2">Bids</h2>
    <ul>
      <li v-for="b in auction.bids" :key="b.id">
        💰 {{ b.amount }} | 🕒 {{ b.datetime }}
      </li>
    </ul>

    <p v-if="auction.successfulBid" class="mt-4 text-green-600 font-semibold">
      ✅ Successful Bid: {{ auction.successfulBid.amount }}
    </p>
  </div>
</template>
