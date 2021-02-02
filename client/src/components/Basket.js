import React from 'react'
// import useForm from '../utils/useForm'
import { getAllBasketItems, deleteBasketItem, updateBasketItem, getSingleUser, editUser } from './lib/api'
import { getPayload } from './lib/auth'
//import { Button } from 'semantic-ui-react'


function Basket() {
  const [basketItems, setBasketItems] = React.useState(null)
  const [user, setUser] = React.useState(null)
  // const [itemQuantity, setItemQuantity] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

  // const { formdata, handleChange } = useForm({
  //   quantity: ''
  // })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllBasketItems()
        setBasketItems(data) 
      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSingleUser()
        setUser(data)

      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [])

  const payload = getPayload()


  const handleRemoveFromBasket = async (event) => {
    try {
      await deleteBasketItem(event.target.id)
      const { data } = await getAllBasketItems()
      setBasketItems(data) 
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditFromBasket = async (event) => {
    try {
      // await updateBasketItem(event.target.id)
      // const { data } = await getAllBasketItems()
      // setBasketItems(data) 

      console.log(updateBasketItem)
      console.log('basket item number', event.target.id)
      console.log(event.target.value)
      event.target.value = ''
      event.target.value = event.nativeEvent.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddToWishlist = async (event) => {
    const favIds = user.favourites.map(fav => {
      return fav.id
    })
    await editUser(payload.sub, { favourites: [ ...favIds, event.target.id ] })
  }

  return (
    <main className="narrow-page">
      <h1>Shopping Bag</h1>
      <p>Please review and cofirm your order.</p>
      
      {basketItems && basketItems.length > 0 ?
        <div className="checkout-basket">
          {basketItems.map(item => {
            return (
              <div className="flex-box basket-item" key={item.id}>
                <figure>
                  <img src={item.product.image} alt={item.product.name} />
                </figure>
                <div>
                  <h3>{item.product.name}</h3>
                  <p><strong>£{item.product.price.toFixed(2)}</strong></p>
                  <p>Quantity: </p>
                  {/* <span id={item.id} className="box">{item.quantity} ⌵</span></p> */}
                  <input onChange={handleEditFromBasket} id={item.id} name="quantity" type="number" value={item.quantity} /><button onClick={handleEditFromBasket}>Update item</button>
                  <p onClick={handleRemoveFromBasket} id={item.id} className="remove-add-btn">Remove</p>
                  <p onClick={handleAddToWishlist} id={item.product.id}className="remove-add-btn">Add to your wish list</p>
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
            }, 0).toFixed(2)}
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