import { useEffect } from 'react'
import { CalendarEvent } from '../types/'

export const useReminders = (events: CalendarEvent[]) => {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      events.forEach((event) => {
        if (event.reminder && event.reminderTime) {
          const eventDateTime = new Date(`${event.date}T${event.reminderTime}`)
          const timeDiff = eventDateTime.getTime() - now.getTime()

          if (timeDiff > 0 && timeDiff <= 60000) {
            if (Notification.permission === 'granted') {
              new Notification(`Reminder: ${event.title}`, {
                body: `Event starting at ${eventDateTime.toLocaleTimeString()}\n${event.description}`,
                icon: '/favicon.ico'
              })
            }
          }
        }
      })
    }

    const intervalId = setInterval(checkReminders, 60000)
    return () => clearInterval(intervalId)
  }, [events])
}
