import { CalendarEvent } from '../../types/'
import { useFormContext } from '../../contexts/FormContext'

export const EventForm = () => {
  const { formState, formHandlers, formActions } = useFormContext()
  const categories = ['Work', 'Personal', 'Family', 'Health', 'Other']

  return (
    <form onSubmit={formActions.handleSubmit} className="event-form">
      <h2>{formState.editingEvent ? 'Edit Event' : 'Add New Event'}</h2>

      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={formState.selectedDate}
          onChange={(e) => formHandlers.setSelectedDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="title">Event Title:</label>
        <input
          type="text"
          id="title"
          value={formState.title}
          onChange={(e) => formHandlers.setTitle(e.target.value)}
          required
          placeholder="Enter event title"
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={formState.category}
          onChange={(e) => formHandlers.setCategory(e.target.value)}
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
          value={formState.description}
          onChange={(e) => formHandlers.setDescription(e.target.value)}
          placeholder="Enter event description"
        />
      </div>

      <div>
        <label htmlFor="recurrence">Recurrence:</label>
        <select
          id="recurrence"
          value={formState.recurrence}
          onChange={(e) =>
            formHandlers.setRecurrence(
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
            checked={formState.reminder}
            onChange={(e) => formHandlers.setReminder(e.target.checked)}
          />
          <label htmlFor="reminder">Set Reminder</label>
        </div>

        {formState.reminder && (
          <div className="reminder-time">
            <label htmlFor="reminderTime">Reminder Time:</label>
            <input
              type="time"
              id="reminderTime"
              value={formState.reminderTime}
              onChange={(e) => formHandlers.setReminderTime(e.target.value)}
              required
            />
          </div>
        )}
      </div>

      <div className="form-buttons">
        <button type="submit" onClick={formActions.handleSubmit}>
          {formState.editingEvent ? 'Update Event' : 'Add Event'}
        </button>
        {formState.editingEvent && (
          <button
            type="button"
            onClick={formActions.cancelEditing}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
