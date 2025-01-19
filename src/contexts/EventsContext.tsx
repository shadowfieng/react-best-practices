import React, { createContext, useContext, useState, ReactNode } from 'react'
import { CalendarEvent } from '../types'

interface EventsContextType {
  events: CalendarEvent[]
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  filteredEvents: CalendarEvent[]
  deleteEvent: (id: string, recurringId?: string) => void
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

export const useEventsContext = () => {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error('useEventsContext must be used within an EventsProvider')
  }
  return context
}

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      date: '2025-03-25',
      title: 'Team Meeting',
      description: 'Weekly team sync with project updates',
      category: 'Work',
      recurrence: 'weekly',
      reminder: false
    },
    {
      id: '2',
      date: '2025-03-26',
      title: 'Doctor Appointment',
      description: 'Annual checkup',
      category: 'Health',
      recurrence: 'yearly',
      reminder: true,
      reminderTime: '1day'
    },
    {
      id: '3',
      date: '2025-03-27',
      title: 'Family Dinner',
      description: 'Weekly dinner with parents',
      category: 'Family',
      recurrence: 'weekly',
      reminder: true,
      reminderTime: '2hours'
    },
    {
      id: '4',
      date: '2025-03-28',
      title: 'Gym Session',
      description: 'Daily workout routine',
      category: 'Health',
      recurrence: 'daily',
      reminder: false
    }
  ])
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

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        searchTerm,
        setSearchTerm,
        filteredEvents,
        deleteEvent
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}
