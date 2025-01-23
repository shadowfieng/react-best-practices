// src/UserTable.js
import { useEffect, useRef, useState } from 'react'
import UserModal from './UserModal'

type User = {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  const handleUserClick = async (userId: number) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController
    const signal = abortController.signal

    setLoading(true)
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        { signal }
      )
      if (!response.ok) {
        throw new Error('Failed to fetch user details')
      }
      const user = await response.json()
      setSelectedUser(user)
      setIsModalOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleUserClick(user.id)}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <UserModal user={selectedUser} onClose={closeModal} loading={loading} />
      )}
    </div>
  )
}

export default UserTable
