import axios from 'axios'
import type { Event } from '@/types'
import type { AxiosResponse } from 'axios'


const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // ✅ get all events
  getEvents(perPage: number, page: number): Promise<AxiosResponse<Event[]>> {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },

  // ✅ get one event
  getEvent(id: number): Promise<AxiosResponse<Event>> {
    return apiClient.get('/events/' + id)
  },

  // ✅ create new event (this was missing!)
  createEvent(event: Event): Promise<AxiosResponse<Event>> {
    return apiClient.post('/events', event)
  },
  getEventsByKeyword(keyword: string, perPage: number, page: number):
    Promise<AxiosResponse<Event[]>> {
    return apiClient.get<Event[]>(
      '/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page
    )
  }

}
