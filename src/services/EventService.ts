import apiClient from './AxiosClient'
import type { Event } from '@/types'
import type { AxiosResponse } from 'axios'

export default {
  // ✅ Get all events
  getEvents(perPage: number, page: number): Promise<AxiosResponse<Event[]>> {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },

  // ✅ Get one event
  getEvent(id: number): Promise<AxiosResponse<Event>> {
    return apiClient.get('/events/' + id)
  },

  // ✅ Create new event
  createEvent(event: Event): Promise<AxiosResponse<Event>> {
    return apiClient.post('/events', event)
  },

  // ✅ Search events by keyword
  getEventsByKeyword(keyword: string, perPage: number, page: number):
    Promise<AxiosResponse<Event[]>> {
    return apiClient.get<Event[]>(
      '/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page
    )
  },

  // ✅ Register a participant for an event (new method)
  registerForEvent(eventId: number, userId: number): Promise<AxiosResponse<any>> {
    return apiClient.post(`/events/${eventId}/participants/${userId}`)
  }
}
