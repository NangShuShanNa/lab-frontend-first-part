import apiClient from './AxiosClient'

export default {
  getOrganizers(perPage?: number, page?: number) {
    let url = '/organizers'
    if (perPage && page) {
      url += `?_limit=${perPage}&_page=${page}`
    }
    return apiClient.get(url)
  },

  // ✅ Get one organizer by ID
  getOrganizer(id: string | number) {
    return apiClient.get(`/organizers/${id}`)
  },

  createOrganizer(organizer: any) {
    return apiClient.post('/organizers', organizer)
  }
}
