import { SearchBar } from './components/SearchBar'
import { EventForm } from './components/EventForm'
import { EventsList } from './components/EventsList'
import { EventsProvider } from './contexts/EventsContext'
import { FormProvider } from './contexts/FormContext'
import './App.css'

function App() {
  return (
    <EventsProvider>
      <FormProvider>
        <div className="calendar-planner">
          <h1>Calendar Planner</h1>
          <SearchBar />
          <EventForm />
          <EventsList />
        </div>
      </FormProvider>
    </EventsProvider>
  )
}

export default App
