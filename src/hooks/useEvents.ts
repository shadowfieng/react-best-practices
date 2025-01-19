import { useState } from 'react'
import { CalendarEvent } from '../types/'

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    date: '2024-03-25',
    title: 'Team Meeting',
    description: 'Weekly team sync with project updates',
    category: 'Work',
    recurrence: 'weekly',
    reminder: false
  },
  {
    id: '2',
    date: '2024-03-26',
    title: 'Doctor Appointment',
    description: 'Annual checkup',
    category: 'Health',
    recurrence: 'yearly',
    reminder: true,
    reminderTime: '09:00'
  },
  {
    id: '3',
    date: '2024-03-27',
    title: 'Family Dinner',
    description: 'Weekly dinner with parents',
    category: 'Family',
    recurrence: 'weekly',
    reminder: true,
    reminderTime: '18:00'
  },
  {
    id: '4',
    date: '2024-03-28',
    title: 'Gym Session',
    description: 'Personal training',
    category: 'Health',
    recurrence: 'daily',
    reminder: false
  },
  {
    id: '5',
    date: '2024-03-29',
    title: 'Project Deadline',
    description: 'Submit final deliverables',
    category: 'Work',
    recurrence: 'none',
    reminder: true,
    reminderTime: '10:00'
  }
]

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = events
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const deleteEvent = (id: string, recurringId?: string) => {
    if (recurringId) {
      const shouldDeleteAll = window.confirm(
        'Do you want to delete all instances of this recurring event?'
      )
      if (shouldDeleteAll) {
        setEvents(events.filter((event) => event.recurringId !== recurringId))
      } else {
        setEvents(events.filter((event) => event.id !== id))
      }
    } else {
      setEvents(events.filter((event) => event.id !== id))
    }
  }

  return {
    events,
    setEvents,
    searchTerm,
    setSearchTerm,
    filteredEvents,
    deleteEvent
  }
}
