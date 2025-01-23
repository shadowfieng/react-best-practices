// src/UserModal.js
import styles from './UserModal.module.css'

type User = {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

const UserModal = ({
  user,
  onClose,
  loading
}: {
  user: User | null
  onClose: () => void
  loading: boolean
}) => {
  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <h2>User Details</h2>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default UserModal
