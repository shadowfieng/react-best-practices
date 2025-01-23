import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
}

const UserFetch = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal }
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data: User[] = await response.json()
        setUsers(data)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          setError(
            err instanceof Error ? err.message : 'An unknown error occurred'
          )
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()

    // Cleanup function to abort the fetch request
    return () => {
      abortController.abort()
    }
  }, []) // Empty dependency array means this effect runs once on mount

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserFetch
