// ✅ Event type (used in event list, detail, and form)
export interface Event {
  id?: number               // optional: backend auto-generates ID
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petAllowed: boolean       // must match backend field name exactly
  organizer: Organizer      // related organizer info
  images: string[]          // URLs of event images
}

// ✅ Message state (for flash messages)
export interface MessageState {
  message: string
}

// ✅ Event state (for current selected event)
export interface EventState {
  event: Event | null
}

// ✅ Organizer type (updated for authentication & roles)
// This matches OrganizerAuthDTO in backend:
// {
//   "id": 1,
//   "name": null,
//   "roles": ["ROLE_USER", "ROLE_ADMIN"]
// }
export interface Organizer {
  id: number
  name: string | null
  roles: string[]
}
