import { useState } from 'react'

type Props<T> = {
  title: string
  items: T[]
  renderItem: (item: T, index: number, array: T[]) => React.ReactNode
}

export const List = <T,>({ title, items, renderItem }: Props<T>) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const displayItems = isCollapsed ? items.slice(0, 3) : items

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
    setIsCollapsed(false)
  }

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {isOpen && <ul className="list">{displayItems.map(renderItem)}</ul>}
      <button
        className="toggle-button"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        {isCollapsed ? `Show all ${items.length} items` : 'Show less'}
      </button>
    </div>
  )
}
