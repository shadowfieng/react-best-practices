interface SearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search events..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-input"
    />
  </div>
)
