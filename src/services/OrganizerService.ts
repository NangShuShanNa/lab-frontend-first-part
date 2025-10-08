import apiClient from './AxiosClient'

export default {
  // ✅ Get all organizers (for dropdown list in Add Event page)
  getOrganizers() {
    return apiClient.get('/organizers')
  },

  // ✅ Get a single organizer by ID (used for detail or edit views)
  getOrganizer(id: string | number) {
    return apiClient.get(`/organizers/${id}`)
  },

  // ✅ Create a new organizer (used in OrganizerFormView.vue)
  createOrganizer(organizer: any) {
    return apiClient.post('/organizers', organizer)
  },

  // ✅ (Optional) Update organizer
  updateOrganizer(id: string | number, organizer: any) {
    return apiClient.put(`/organizers/${id}`, organizer)
  },

  // ✅ (Optional) Delete organizer
  deleteOrganizer(id: string | number) {
    return apiClient.delete(`/organizers/${id}`)
  }
}
