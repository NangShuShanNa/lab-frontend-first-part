import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizers(perPage?: number, page?: number) {
    let url = '/organizers'
    if (perPage && page) {
      url += `?_limit=${perPage}&_page=${page}`
    }
    return apiClient.get(url)
  },

  // ✅ New method to get one organizer by ID
  getOrganizer(id: string | number) {
    return apiClient.get(`/organizers/${id}`)
  },

  createOrganizer(organizer: any) {
    return apiClient.post('/organizers', organizer)
  }
}
