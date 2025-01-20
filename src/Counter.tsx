import { ReactNode, useState } from 'react'

type CounterProps = {
  iconIncrease: ReactNode
  iconDecrease: ReactNode
  label: string
  hideLabel?: boolean
  hideIncrease?: boolean
  hideDecrease?: boolean
}

function Counter({
  iconIncrease,
  iconDecrease,
  label,
  hideLabel = false,
  hideIncrease = false,
  hideDecrease = false
}: CounterProps) {
  const [count, setCount] = useState(0)
  const increase = () => setCount((c) => c + 1)
  const decrease = () => setCount((c) => c - 1)

  return (
    <div>
      {!hideLabel && <span>{label}</span>}
      {!hideDecrease && <button onClick={decrease}>{iconDecrease}</button>}
      <span>{count}</span>
      {!hideIncrease && <button onClick={increase}>{iconIncrease}</button>}
    </div>
  )
}

export default Counter
