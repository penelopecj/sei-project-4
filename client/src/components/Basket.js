import React from 'react'
import useEditQuantityForm from '../utils/useEditQuantityForm'
import { getAllBasketItems, deleteBasketItem, updateBasketItem, getSingleUser, editUser } from './lib/api'
import { getPayload } from './lib/auth'
//import { Link } from 'react-router-dom'
//import { Button } from 'semantic-ui-react'


function Basket() {
  const [basketItems, setBasketItems] = React.useState(null)
  const [user, setUser] = React.useState(null)
  // const [itemQuantity, setItemQuantity] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)
  
  const { formdata, setFormdata, handleChange } = useEditQuantityForm({
    quantity: ''
  })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllBasketItems()
        setBasketItems(data) 
        setFormdata(data)
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

  console.log('basket items', basketItems)
  const handleEditFromBasket = async (event) => {
    try {
      await updateBasketItem(event.target.id, formdata[parseInt(event.target.className)]) 
      const { data } = await getAllBasketItems()
      setBasketItems(data)
      console.log(event.target.className)
      console.log(typeof(parseInt(event.target.className)))
      // basketItems[position].quantity = event.target.value
      // await updateBasketItem(event.target.id)
      // const { data } = await getAllBasketItems()
      // setBasketItems(data) 
      console.log(updateBasketItem)
      // console.log(updateBasketItem)
      //console.log('basket item number', event.target.id)
      // console.log(event.target.value)
      // event.target.value = ''
      // event.target.value = event.nativeEvent.data
    } catch (err) {
      console.log(err)
    }
  }
  console.log('From basket js', formdata)
  
  const handleAddToWishlist = async (event) => {
    const favIds = user.favourites.map(fav => {
      return fav.id
    })
    await editUser(payload.sub, { favourites: [ ...favIds, event.target.id ] })
  }

  return (
    <main className="narrow-page">
      <h1 className="noto-sans">Shöpping Bag</h1>
      <p>Please review and cofirm your order.</p>
      
      {basketItems && basketItems.length > 0 ?
        <div className="checkout-basket">
          {basketItems.map((item, index) => {
            return (
              <div className="flex-box basket-item" key={item.id}>
                <figure>
                  <img src={item.product.image} alt={item.product.name} />
                </figure>
                <div>
                  <h3>{item.product.name}</h3>
                  <p><strong>£{item.product.price.toFixed(2)}</strong></p>
                  {item.product.categories.length > 0 ?
                    <ul>
                      {item.product.categories.map(category => {
                        return (
                          <li key={category.id}>{category.name}</li>
                        )
                      })}
                    </ul>
                    :
                    <ul></ul>
                  }
                  <div className="change-quantity">
                    <p>Quantity: </p>
                    <input 
                      placeholder={item.quantity}
                      onChange={handleChange} 
                      id={index} 
                      name="quantity" 
                      type="number" 
                      max="15"
                      min="1"
                      value={formdata.quantity} 
                    />
                    <button 
                      onClick={handleEditFromBasket} 
                      id={item.id} 
                      className={index} 
                    >Update item</button>
                  </div>
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
              return acc + (curr.product.price * curr.quantity)
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