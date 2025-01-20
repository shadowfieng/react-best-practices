import { createContext, ReactNode, useContext, useState } from 'react'

type CounterContextValue = {
  count: number
  increase: () => void
  decrease: () => void
}

const CounterContext = createContext<CounterContextValue | null>(null)

export const useCounterContext = () => {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounterContext must be used within a CounterProvider')
  }
  return context
}

function Counter({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const increase = () => setCount((c) => c + 1)
  const decrease = () => setCount((c) => c - 1)

  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  )
}

// 3. Create child components to help implementing the common task
function Count() {
  const { count } = useCounterContext()
  return <span>{count}</span>
}

function Label({ children }: { children: ReactNode }) {
  return <span>{children}</span>
}

function Increase({ icon }: { icon: ReactNode }) {
  const { increase } = useCounterContext()
  return <button onClick={increase}>{icon}</button>
}

function Decrease({ icon }: { icon: ReactNode }) {
  const { decrease } = useCounterContext()
  return <button onClick={decrease}>{icon}</button>
}
Counter.Count = Count
Counter.Label = Label
Counter.Increase = Increase
Counter.Decrease = Decrease

export default Counter
