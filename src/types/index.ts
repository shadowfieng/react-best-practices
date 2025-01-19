export interface CalendarEvent {
  id: string
  date: string
  title: string
  description: string
  category: string
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  recurringId?: string
  reminder: boolean
  reminderTime?: string
}
