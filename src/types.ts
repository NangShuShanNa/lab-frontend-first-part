export interface Event {
  id?: number              // ✅ optional (backend generates ID)
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petAllowed: boolean      // ✅ match backend field name
  organizer: Organizer

}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}

export interface Organizer {
  id: number

  name: string
}
