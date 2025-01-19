import { useState, useEffect } from 'react'
import './App.css'

// Define types for our events
interface CalendarEvent {
  id: string
  date: string
  title: string
  description: string
  category: string
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  recurringId?: string // to group recurring events
  reminder: boolean // Add reminder field
  reminderTime?: string // Optional time for the reminder
}

function App() {
  // State for events and form inputs with predefined events
  const [events, setEvents] = useState<CalendarEvent[]>([
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
      date: '2024-03-28',
      title: 'Doctor Appointment',
      description: 'Annual health checkup',
      category: 'Health',
      recurrence: 'none',
      reminder: false
    },
    {
      id: '3',
      date: '2024-04-01',
      title: 'Family Dinner',
      description: "Dinner at Mom's house",
      category: 'Family',
      recurrence: 'none',
      reminder: false
    },
    {
      id: '4',
      date: '2024-04-05',
      title: 'Gym Session',
      description: 'Personal training session',
      category: 'Health',
      recurrence: 'none',
      reminder: false
    },
    {
      id: '5',
      date: '2024-04-10',
      title: 'Project Deadline',
      description: 'Submit final project documentation',
      category: 'Work',
      recurrence: 'none',
      reminder: false
    }
  ])
  const [selectedDate, setSelectedDate] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [recurrence, setRecurrence] =
    useState<CalendarEvent['recurrence']>('none')
  const [reminder, setReminder] = useState(false)
  const [reminderTime, setReminderTime] = useState('')

  // Categories array
  const categories = ['Work', 'Personal', 'Family', 'Health', 'Other']

  // Function to generate recurring dates
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

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  // Check for due reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      events.forEach((event) => {
        if (event.reminder && event.reminderTime) {
          const eventDateTime = new Date(`${event.date}T${event.reminderTime}`)
          const timeDiff = eventDateTime.getTime() - now.getTime()

          // If the event is within the next minute and hasn't been notified
          if (timeDiff > 0 && timeDiff <= 60000) {
            if (Notification.permission === 'granted') {
              new Notification(`Reminder: ${event.title}`, {
                body: `Event starting at ${eventDateTime.toLocaleTimeString()}\n${event.description}`,
                icon: '/favicon.ico' // You can add your own icon
              })
            }
          }
        }
      })
    }

    const intervalId = setInterval(checkReminders, 60000) // Check every minute
    return () => clearInterval(intervalId)
  }, [events])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !title) return

    if (editingEvent) {
      // Update existing event
      setEvents(
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
      // Create new event(s)
      const recurringId = Date.now().toString()
      if (recurrence === 'none') {
        // Single event
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
        setEvents([...events, newEvent])
      } else {
        // Recurring events
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
        setEvents([...events, ...newEvents])
      }
    }

    // Reset form
    setTitle('')
    setDescription('')
    setSelectedDate('')
    setCategory('')
    setRecurrence('none')
    setReminder(false)
    setReminderTime('')
  }

  // Delete event
  const deleteEvent = (id: string, recurringId?: string) => {
    if (recurringId) {
      // Delete all instances of recurring event
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

  // Start editing event
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

  // Cancel editing
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

  // Filter events based on search term and sort by date
  const filteredEvents = events
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="calendar-planner">
      <h1>Calendar Planner</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Add/Edit Event Form */}
      <form onSubmit={handleSubmit} className="event-form">
        <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter event title"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
          />
        </div>

        {/* Add Recurrence Selection */}
        <div>
          <label htmlFor="recurrence">Recurrence:</label>
          <select
            id="recurrence"
            value={recurrence}
            onChange={(e) =>
              setRecurrence(e.target.value as CalendarEvent['recurrence'])
            }
            className="recurrence-select"
          >
            <option value="none">No Recurrence</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Add Reminder Section */}
        <div className="reminder-section">
          <div className="reminder-checkbox">
            <input
              type="checkbox"
              id="reminder"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
            />
            <label htmlFor="reminder">Set Reminder</label>
          </div>

          {reminder && (
            <div className="reminder-time">
              <label htmlFor="reminderTime">Reminder Time:</label>
              <input
                type="time"
                id="reminderTime"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                required={reminder}
              />
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit">
            {editingEvent ? 'Update Event' : 'Add Event'}
          </button>
          {editingEvent && (
            <button
              type="button"
              onClick={cancelEditing}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Events List */}
      <div className="events-list">
        <h2>Upcoming Events</h2>
        {filteredEvents.length === 0 ? (
          <p>No events found</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <h3>{event.title}</h3>
                <div className="event-badges">
                  <span
                    className={`category-badge ${event.category.toLowerCase()}`}
                  >
                    {event.category}
                  </span>
                  {event.recurrence !== 'none' && (
                    <span className="recurrence-badge">
                      {event.recurrence.charAt(0).toUpperCase() +
                        event.recurrence.slice(1)}
                    </span>
                  )}
                  {event.reminder && (
                    <span className="reminder-badge">
                      🔔 {event.reminderTime}
                    </span>
                  )}
                </div>
              </div>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              {event.description && <p>{event.description}</p>}
              <div className="event-actions">
                <button
                  onClick={() => startEditing(event)}
                  className="edit-btn"
                >
                  Edit Event
                </button>
                <button
                  onClick={() => deleteEvent(event.id, event.recurringId)}
                  className="delete-btn"
                >
                  Delete Event
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
