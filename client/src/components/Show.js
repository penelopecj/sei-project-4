import React from 'react'
import { getSinglePie, createBasketItem, addReview, deleteReview, getSingleUser, editUser } from './lib/api'

import useForm from '../utils/useForm'
import { isAuthenticated, getPayload } from './lib/auth'
import { useParams, Link, useHistory } from 'react-router-dom'

import {
  //Checkbox,
  //Button,
  Comment
  //Form
} from 'semantic-ui-react'

function Show() {
  const [pie, setPie] = React.useState(null) 
  //const [reviews, setReviews] = React.useState(null)
  //const [newReview, setNewReview] = React.useState() 
  //const [hasError, setHasError] = React.useState(false)
  const [user, setUser] = React.useState(null)

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

  const { id } = useParams()
  const payload = getPayload()
  const { formdata, handleChange } = useForm({
    text: '',
    rating: '',
    pie: id,
    owner: payload.sub
  })

  const history = useHistory()

  const isLoggedIn = isAuthenticated()


  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSinglePie(id)
        setPie(data)
        //if (data.reviews) {
        //setReviews(data.reviews)
        //}
      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [id])

  const handleAddToWishlist = async () => {
    const favIds = user.favourites.map(fav => {
      return fav.id
    })
    await editUser(payload.sub, { favourites: [ ...favIds, pie.id ] })
  }

  const handleAddToBasket = async () => {
    try {
      await createBasketItem({
        quantity: 1,
        product: id
      })
      history.push('/basket')
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddReview = async event => {
    event.preventDefault()
    try {
      await addReview(formdata)
      const { data } = await getSinglePie(id)
      setPie(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId)
      const { data } = await getSinglePie(id)
      setPie(data)
    } catch (err) {
      console.log(err)
    }
  }

  //formdata.text = ''
  //event.target[5].value = ''
  //console.log(event.value)
  //setNewReview({ id, formdata })
  //setFormdata({ text: '' })
  // const handleDeleteReview = async event => {
  //   event.preventDefault()
  //   try {
  //     const reviewId = event.target.name
  //     await deleteReview(id, reviewId)
  //     //setNewReview({ id, formdata })
  //     // setRefreshData(true)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // console.log(pie)
  return (
    <main className="show-page">
      {pie ?
        
        <section className="box">
          <div className="flex-box">
            <figure>
              <img src={pie.image} alt={pie.name} />
            </figure>
            <div>    
              <h1>{pie.name}</h1>
              <h3>Now only £{pie.price.toFixed(2)}!</h3>
              <p>{pie.description}</p>
              <section className="flex-box align-center space-between">
                {pie.categories && pie.categories.length > 0 ?
                  <ul>
                    {pie.categories.map(category => {
                      return <li key={category.id}><Link 
                        to={'/pies'}>{category.name}
                      </Link></li>
                    })}
                  </ul>
                  :
                  <ul></ul>
                }
                <div className="flex-box justify-center fav-btn">
                  <p onClick={handleAddToWishlist}>
                    <span className="material-icons">
                      favorite_border
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </div>
          <Link to={`/pies/${id}/customise/`}>
            <button className="yellow-background checkout-btn customise-btn">Customise this pie</button>
          </Link>
          <button onClick={handleAddToBasket} className="blue-background checkout-btn">Add to shopping bag</button>
          <h2>What customers are saying about {pie.name}:</h2>
          <div className="showpage-reviews-wrapper">
            <>
              <Comment.Group>
                {pie.reviews && pie.reviews.length > 0 ? 
                  pie.reviews.map(review => (
                    <Comment key={review.id} value={review.id} className="box review">
                      <Comment.Avatar
                        src={review.owner.profileImage} className="avatar" />
                      <Comment.Content>
                        {/* <Comment.Author as='a'>{review.owner.username}</Comment.Author> */}
                        <Comment.Metadata>
                          <h4>{review.owner.username}</h4>
                          <div>{review.createdAt.slice(0, 10)}</div>
                        </Comment.Metadata>
                        <Comment.Text>{review.text}</Comment.Text>
                        <Comment.Text>{'★'.repeat(review.rating)} </Comment.Text>
                        {/* {isOwner(review.owner ? review.owner.id : '') && */}
                        <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                        {/* } */}
                      </Comment.Content>
                    </Comment>
                  ))
                  :
                  <div>
                    Be the first to review this delicious pie!
                  </div>
                }
                {isLoggedIn && 
                <form onClick={handleAddReview} className="review-form">
                  <div>
                    <label>Review our {pie.name}</label>
                  </div>
                  <div>  
                    <textarea
                      onChange={handleChange}
                      name="text"
                      value={formdata.text}
                      placeholder="Leave a review..." /> 
                  </div>
                  <div>
                    <label>Rate from 1 to 5</label>
                  </div>
                  <div>
                    <input 
                      type="number" 
                      onChange={handleChange}
                      name="rating"
                      min="1"
                      max="5"
                      placeholder="★"
                      value={formdata.rating} />
                  </div>
                  
                  <button className="yellow-background">Submit Review</button>
                  {/* <Button content='Add Reply'
                    position='right'
                    labelPosition='left' icon='edit' primary /> */}
                </form>
                }
              </Comment.Group>
            </>
          </div>
            
          
        </section>
        :
        <section>
          <div>Loading...</div>
        </section>
      } 
    </main>
  )
}
export default Show