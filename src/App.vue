<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <!-- Event -->
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }"
          >
            Event
          </RouterLink>
          |

          <!-- Auction -->
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'auction-list-view' }"
          >
            Auction
          </RouterLink>
          |

          <!-- About -->
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'about' }"
          >
            About
          </RouterLink>
          |

          <!-- New Event -->
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'add-event' }"
          >
            New Event
          </RouterLink>
          |

          <!-- Organizer -->
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'create-organizer-view' }"
          >
            Organizer
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Shows whichever route is active -->
    <RouterView />
  </div>
</template>
