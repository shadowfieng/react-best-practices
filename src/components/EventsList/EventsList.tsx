import { CalendarEvent } from '../../types/'
import { EventCard } from './EventCard'

interface EventsListProps {
  events: CalendarEvent[]
  onEdit: (event: CalendarEvent) => void
  onDelete: (id: string, recurringId?: string) => void
}

export const EventsList = ({ events, onEdit, onDelete }: EventsListProps) => (
  <div className="events-list">
    <h2>Upcoming Events</h2>
    {events.length === 0 ? (
      <p>No events found</p>
    ) : (
      events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    )}
  </div>
)
