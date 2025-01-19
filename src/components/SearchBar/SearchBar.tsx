import { useEventsContext } from '../../contexts/EventsContext'

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useEventsContext()

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  )
}
