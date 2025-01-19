import React, { createContext, useContext, useState, ReactNode } from 'react'
import { CalendarEvent } from '../types'
import { useEventsContext } from './EventsContext'

interface FormContextType {
  formState: {
    editingEvent: CalendarEvent | null
    selectedDate: string
    title: string
    description: string
    category: string
    recurrence: CalendarEvent['recurrence']
    reminder: boolean
    reminderTime: string
  }
  formHandlers: {
    setSelectedDate: (value: string) => void
    setTitle: (value: string) => void
    setDescription: (value: string) => void
    setCategory: (value: string) => void
    setRecurrence: (value: CalendarEvent['recurrence']) => void
    setReminder: (value: boolean) => void
    setReminderTime: (value: string) => void
  }
  formActions: {
    handleSubmit: (e: React.FormEvent) => void
    startEditing: (event: CalendarEvent) => void
    cancelEditing: () => void
  }
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [recurrence, setRecurrence] =
    useState<CalendarEvent['recurrence']>('none')
  const [reminder, setReminder] = useState(false)
  const [reminderTime, setReminderTime] = useState('')
  const { events, setEvents } = useEventsContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newEvent: CalendarEvent = {
      id: editingEvent?.id || crypto.randomUUID(),
      date: selectedDate,
      title,
      description,
      category,
      recurrence,
      reminder,
      reminderTime: reminder ? reminderTime : undefined
    }

    if (editingEvent) {
      // Update existing event
      setEvents(
        events.map((event) => (event.id === editingEvent.id ? newEvent : event))
      )
    } else {
      // Add new event
      setEvents([...events, newEvent])
    }

    // Reset form
    cancelEditing()
  }

  const startEditing = (event: CalendarEvent) => {
    setEditingEvent(event)
    setSelectedDate(event.date)
    setTitle(event.title)
    setDescription(event.description)
    setCategory(event.category)
    setRecurrence(event.recurrence)
    setReminder(event.reminder)
    setReminderTime(event.reminderTime || '')
  }

  const cancelEditing = () => {
    setEditingEvent(null)
    setSelectedDate('')
    setTitle('')
    setDescription('')
    setCategory('')
    setRecurrence('none')
    setReminder(false)
    setReminderTime('')
  }

  return (
    <FormContext.Provider
      value={{
        formState: {
          editingEvent,
          selectedDate,
          title,
          description,
          category,
          recurrence,
          reminder,
          reminderTime
        },
        formHandlers: {
          setSelectedDate,
          setTitle,
          setDescription,
          setCategory,
          setRecurrence,
          setReminder,
          setReminderTime
        },
        formActions: {
          handleSubmit,
          startEditing,
          cancelEditing
        }
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
