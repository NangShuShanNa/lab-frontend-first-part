import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import AuctionListView from '@/views/AuctionListView.vue'
import AuctionDetailView from '@/views/AuctionDetailView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

// ✅ Event create
import AddEventView from '@/views/event/EventFormView.vue'

// ✅ Organizer create
import CreateOrganizerView from '@/views/OrganizerView.vue'

// ✅ Organizer list
import OrganizerListView from '@/views/event/OrganizerListView.vue'

// ✅ Auth
import LoginView from '@/views/event/LoginView.vue'
import { useAuthStore } from '@/stores/auth'   // ✅ import auth store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ✅ Event list
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1')
      })
    },

    // ✅ Event layout with children
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
          .then((response) => {
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
      children: [
        { path: '', name: 'event-detail-view', component: EventDetailView, props: true },
        { path: 'register', name: 'event-register-view', component: EventRegisterView, props: true },
        { path: 'edit', name: 'event-edit-view', component: EventEditView, props: true }
      ]
    },

    // ✅ Add event (Admin only)
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView,
      meta: { requiresAdmin: true }    // ✅ mark as admin-only
    },

    // ✅ Organizer routes
    {
      path: '/organizers',
      name: 'organizer-list-view',
      component: OrganizerListView
    },
    {
      path: '/organizers/create',
      name: 'create-organizer-view',
      component: CreateOrganizerView,
      meta: { requiresAdmin: true }    // ✅ only admin can create
    },
    {
      path: '/organizers/:id',
      name: 'organizer-detail-view',
      component: () => import('@/views/event/OrganizerDetailView.vue'),
      props: true
    },

    // ✅ Auction routes
    {
      path: '/auctions',
      name: 'auction-list-view',
      component: AuctionListView
    },
    {
      path: '/auctions/:id',
      name: 'auction-detail-view',
      component: AuctionDetailView
    },

    // ✅ About
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },

    // ✅ Login
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

    // ✅ Error routes
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { top: 0 }
  }
})

// ✅ Progress bar
router.beforeEach((to, from, next) => {
  nProgress.start()

  const authStore = useAuthStore()

  // ✅ Check if route requires admin role
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    alert('🚫 You do not have permission to access this page.')
    next({ name: 'event-list-view' }) // redirect to home
  } else {
    next()
  }
})

router.afterEach(() => {
  nProgress.done()
})

export default router
