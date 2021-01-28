import React from 'react'
import { getBasket } from './lib/api'


function Basket() {

  const [basket, setBasket] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getBasket()
        setBasket(data)
  
      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [])
  
  console.log(basket)

  return (
    <main>
      <h1>View Basket</h1>
      <p>Please review and cofirm your order.</p>
    </main>
  )
}

export default Basket