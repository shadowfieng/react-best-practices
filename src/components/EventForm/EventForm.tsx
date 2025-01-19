import { CalendarEvent } from '../../types/'

interface EventFormProps {
  onSubmit: (e: React.FormEvent) => void
  editingEvent: CalendarEvent | null
  formData: {
    selectedDate: string
    title: string
    description: string
    category: string
    recurrence: CalendarEvent['recurrence']
    reminder: boolean
    reminderTime: string
  }
  onFormChange: {
    setSelectedDate: (value: string) => void
    setTitle: (value: string) => void
    setDescription: (value: string) => void
    setCategory: (value: string) => void
    setRecurrence: (value: CalendarEvent['recurrence']) => void
    setReminder: (value: boolean) => void
    setReminderTime: (value: string) => void
  }
  onCancel: () => void
}

export const EventForm = ({
  onSubmit,
  editingEvent,
  formData,
  onFormChange,
  onCancel
}: EventFormProps) => {
  const categories = ['Work', 'Personal', 'Family', 'Health', 'Other']

  return (
    <form onSubmit={onSubmit} className="event-form">
      <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>

      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={formData.selectedDate}
          onChange={(e) => onFormChange.setSelectedDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="title">Event Title:</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => onFormChange.setTitle(e.target.value)}
          required
          placeholder="Enter event title"
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => onFormChange.setCategory(e.target.value)}
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
          value={formData.description}
          onChange={(e) => onFormChange.setDescription(e.target.value)}
          placeholder="Enter event description"
        />
      </div>

      <div>
        <label htmlFor="recurrence">Recurrence:</label>
        <select
          id="recurrence"
          value={formData.recurrence}
          onChange={(e) =>
            onFormChange.setRecurrence(
              e.target.value as CalendarEvent['recurrence']
            )
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

      <div className="reminder-section">
        <div className="reminder-checkbox">
          <input
            type="checkbox"
            id="reminder"
            checked={formData.reminder}
            onChange={(e) => onFormChange.setReminder(e.target.checked)}
          />
          <label htmlFor="reminder">Set Reminder</label>
        </div>

        {formData.reminder && (
          <div className="reminder-time">
            <label htmlFor="reminderTime">Reminder Time:</label>
            <input
              type="time"
              id="reminderTime"
              value={formData.reminderTime}
              onChange={(e) => onFormChange.setReminderTime(e.target.value)}
              required
            />
          </div>
        )}
      </div>

      <div className="form-buttons">
        <button type="submit">
          {editingEvent ? 'Update Event' : 'Add Event'}
        </button>
        {editingEvent && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
