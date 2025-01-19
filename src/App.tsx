import { SearchBar } from './components/SearchBar/SearchBar'
import { EventForm } from './components/EventForm/EventForm'
import { EventsList } from './components/EventsList/EventsList'
import { useEvents } from './hooks/useEvents'
import { useEventForm } from './hooks/useEventForm'
import { useReminders } from './hooks/useReminders'
import './App.css'

function App() {
  const {
    events,
    setEvents,
    searchTerm,
    setSearchTerm,
    filteredEvents,
    deleteEvent
  } = useEvents()
  const { formState, formHandlers, formActions } = useEventForm(setEvents)
  useReminders(events)

  return (
    <div className="calendar-planner">
      <h1>Calendar Planner</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <EventForm
        onSubmit={formActions.handleSubmit}
        editingEvent={formState.editingEvent}
        formData={formState}
        onFormChange={formHandlers}
        onCancel={formActions.cancelEditing}
      />

      <EventsList
        events={filteredEvents}
        onEdit={formActions.startEditing}
        onDelete={deleteEvent}
      />
    </div>
  )
}

export default App
