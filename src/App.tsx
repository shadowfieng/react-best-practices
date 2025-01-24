import { useState } from 'react'
import { faker } from '@faker-js/faker'
import './index.css'
import { List } from './List'
import withToggles from './withToggle'

type Product = {
  id: number
  productName: string
  description: string
  price: string
}

type Company = {
  id: number
  companyName: string
  phrase: string
}

const products = Array.from({ length: 20 }, (_, index): Product => {
  return {
    id: index,
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price()
  }
})

const companies = Array.from({ length: 15 }, (_, index) => {
  return {
    id: index,
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase()
  }
})

function ProductItem({ product }: { product: Product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  )
}

function CompanyItem({
  company,
  defaultVisibility
}: {
  company: Company
  defaultVisibility: boolean
}) {
  const [isVisible, setIsVisible] = useState(defaultVisibility)

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  )
}

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <List
          title="Products"
          items={products}
          renderItem={(product) => <ProductItem product={product} />}
        />
        <List
          title="Companies"
          items={companies}
          renderItem={(company) => (
            <CompanyItem
              key={company.companyName}
              company={company}
              defaultVisibility={false}
            />
          )}
        />

        <div className="col-2">
          <ProductListWithToggle title="Products HOC" items={products} />
        </div>
      </div>
    </div>
  )
}

// LATER: Let's say we got this component from a 3rd-party library, and can't change it. But we still want to add the 2 toggle functionalities to it
function ProductList({ items }: { items: Product[] }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  )
}

const ProductListWithToggle = withToggles(ProductList)
