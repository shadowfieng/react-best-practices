import { useEventsContext } from '../../contexts/EventsContext'
import { useFormContext } from '../../contexts/FormContext'
import { EventCard } from './EventCard'

export const EventsList = () => {
  const { filteredEvents, deleteEvent } = useEventsContext()
  const { formActions } = useFormContext()

  return (
    <div className="events-list">
      <h2>Upcoming Events</h2>
      {filteredEvents.length === 0 ? (
        <p>No events found</p>
      ) : (
        filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={formActions.startEditing}
            onDelete={deleteEvent}
          />
        ))
      )}
    </div>
  )
}
