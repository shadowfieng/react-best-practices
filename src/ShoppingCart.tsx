import { useState } from 'react'

type Item = {
  name: string
  price: number
}

const ShoppingCart = () => {
  const [cart, setCart] = useState<Item[]>([])
  const [total, setTotal] = useState(0)

  const addItem = (item: Item) => {
    // Not using the callback function
    setTimeout(() => {
      setCart([...cart, item])
      setTotal(total + item.price) // This can lead to incorrect total
    }, 1000)
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name}: ${item.price}
          </li>
        ))}
      </ul>
      <h2>Total: ${total}</h2>
      <button onClick={() => addItem({ name: 'Apple', price: 1 })}>
        Add Apple
      </button>
      <button onClick={() => addItem({ name: 'Banana', price: 2 })}>
        Add Banana
      </button>
    </div>
  )
}

export default ShoppingCart
