import React from 'react'
import { getBasket } from './lib/api'
import { Button } from 'semantic-ui-react'


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
      
      {basket && basket.length > 0 ?
        <div className="checkout-basket">
          {basket.map(pie => {
            return (
              <div className="flex-box" key={pie.id}>
                <img src={pie.product.image} alt={pie.product.name} />
                <h3>{pie.product.name}</h3>
                <p>£{pie.product.price}</p>
                <p>Quantity:{pie.quantity}</p>
              </div>
            )
          })
          }
          <Button>Checkout</Button>
        </div>
        :
        <p>Your basket is empty...</p>
      }
      
    </main>
  )
}

export default Basket