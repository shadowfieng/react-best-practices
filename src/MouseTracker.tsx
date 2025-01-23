// src/MouseTracker.js
import { useEffect, useRef, useState } from 'react'

const MouseTracker = () => {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 })
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 })
  const [keyPressed, setKeyPressed] = useState('')
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    const abortController = abortControllerRef.current
    const { signal } = abortController

    const handleMouseMove = (event: MouseEvent) => {
      setMouseCoordinates({ x: event.clientX, y: event.clientY })
    }

    const handleClick = (event: MouseEvent) => {
      setClickCoordinates({ x: event.clientX, y: event.clientY })
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      setKeyPressed(event.key)
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { signal })
    window.addEventListener('click', handleClick, { signal })
    window.addEventListener('keypress', handleKeyPress, { signal })

    // Cleanup function to remove the event listeners
    return () => {
      abortController.abort()
    }
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Mouse Tracker</h1>
      <p>
        Mouse Coordinates: X: {mouseCoordinates.x}, Y: {mouseCoordinates.y}
      </p>
      <p>
        Last Click Coordinates: X: {clickCoordinates.x}, Y: {clickCoordinates.y}
      </p>
      <p>Last Key Pressed: {keyPressed}</p>

      <button onClick={() => abortControllerRef.current?.abort()}>
        Detach Event Listeners
      </button>
    </div>
  )
}

export default MouseTracker
