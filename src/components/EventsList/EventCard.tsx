import { CalendarEvent } from '../../types/'

interface EventCardProps {
  event: CalendarEvent
  onEdit: (event: CalendarEvent) => void
  onDelete: (id: string, recurringId?: string) => void
}

export const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => (
  <div className="event-card">
    <div className="event-header">
      <h3>{event.title}</h3>
      <div className="event-badges">
        <span className={`category-badge ${event.category.toLowerCase()}`}>
          {event.category}
        </span>
        {event.recurrence !== 'none' && (
          <span className="recurrence-badge">
            {event.recurrence.charAt(0).toUpperCase() +
              event.recurrence.slice(1)}
          </span>
        )}
        {event.reminder && (
          <span className="reminder-badge">🔔 {event.reminderTime}</span>
        )}
      </div>
    </div>
    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
    {event.description && <p>{event.description}</p>}
    <div className="event-actions">
      <button onClick={() => onEdit(event)} className="edit-btn">
        Edit Event
      </button>
      <button
        onClick={() => onDelete(event.id, event.recurringId)}
        className="delete-btn"
      >
        Delete Event
      </button>
    </div>
  </div>
)
