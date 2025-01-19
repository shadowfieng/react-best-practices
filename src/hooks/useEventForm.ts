import { useState } from 'react'
import { CalendarEvent } from '../types/'

export const useEventForm = (
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
) => {
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [recurrence, setRecurrence] =
    useState<CalendarEvent['recurrence']>('none')
  const [reminder, setReminder] = useState(false)
  const [reminderTime, setReminderTime] = useState('')

  const generateRecurringDates = (
    startDate: string,
    recurrence: CalendarEvent['recurrence'],
    count: number = 5
  ) => {
    const dates: string[] = []
    const start = new Date(startDate)

    for (let i = 0; i < count; i++) {
      const date = new Date(start)
      switch (recurrence) {
        case 'daily':
          date.setDate(start.getDate() + i)
          break
        case 'weekly':
          date.setDate(start.getDate() + i * 7)
          break
        case 'monthly':
          date.setMonth(start.getMonth() + i)
          break
        case 'yearly':
          date.setFullYear(start.getFullYear() + i)
          break
        default:
          continue
      }
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !title) return

    if (editingEvent) {
      setEvents((events) =>
        events.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                date: selectedDate,
                title,
                description,
                category: category || 'Other',
                recurrence,
                reminder,
                reminderTime: reminder ? reminderTime : undefined
              }
            : event
        )
      )
      setEditingEvent(null)
    } else {
      const recurringId = Date.now().toString()
      if (recurrence === 'none') {
        const newEvent: CalendarEvent = {
          id: recurringId,
          date: selectedDate,
          title,
          description,
          category: category || 'Other',
          recurrence,
          reminder,
          reminderTime: reminder ? reminderTime : undefined
        }
        setEvents((events) => [...events, newEvent])
      } else {
        const dates = generateRecurringDates(selectedDate, recurrence)
        const newEvents: CalendarEvent[] = dates.map((date, index) => ({
          id: `${recurringId}-${index}`,
          date,
          title,
          description,
          category: category || 'Other',
          recurrence,
          recurringId,
          reminder,
          reminderTime: reminder ? reminderTime : undefined
        }))
        setEvents((events) => [...events, ...newEvents])
      }
    }

    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setSelectedDate('')
    setCategory('')
    setRecurrence('none')
    setReminder(false)
    setReminderTime('')
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
    resetForm()
  }

  return {
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
  }
}
