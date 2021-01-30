import React from 'react'
import { getBasket } from './lib/api'
//import { Button } from 'semantic-ui-react'


function Basket() {

  const [basketItems, setBasketItems] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getBasket()
        setBasketItems(data) 
      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [])
  

  return (
    <main className="narrow-page">
      <h1>Shopping Bag</h1>
      <p>Please review and cofirm your order.</p>
      
      {basketItems && basketItems.length > 0 ?
        <div className="checkout-basket">
          {basketItems.map(pie => {
            return (
              <div className="flex-box basket-item" key={pie.id}>
                <figure>
                  <img src={pie.product.image} alt={pie.product.name} />
                </figure>
                <div>
                  <h3>{pie.product.name}</h3>
                  <p><strong>£{pie.product.price}</strong></p>
                  <p>Quantity: <span className="box">{pie.quantity} ⌵</span></p>
                  <p>Remove</p>
                  <p>Add to your wish list</p>
                </div>
              </div>
            )
          })
          }
          <h2>Order summary</h2>
          <div className="space-between black-underline">
            <p>Total service cost</p>
            <p>Excluding service cost</p>
          </div>
          <div className="space-between align-center">
            <p><strong>Subtotal Inc VAT</strong></p> 
            <p className="total">£{basketItems.reduce((acc, curr) => {
              return acc + curr.product.price
            }, 0)}
            </p>
          </div>
          
          <button className="blue-background checkout-btn">Continue to checkout</button>
          <h5>↩︎ 365 days to change your mind</h5>
          <h5>⎋ Secure shopping with SSL data encryption</h5>
        </div>
        :
        <p>Your basket is empty...</p>
      }
      
    </main>
  )
}

export default Basket