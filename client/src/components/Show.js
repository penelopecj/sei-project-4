import React from 'react'
import { getSinglePie, createBasketItem, addReview, deleteReview } from './lib/api'
import useForm from '../utils/useForm'
import { isOwner, isAuthenticated } from './lib/auth'
import { useParams, Link, useHistory } from 'react-router-dom'

import {
  Button,
  Comment,
  Form,
  Header
} from 'semantic-ui-react'

function Show() {
  const [pie, setPie] = React.useState(null) 
  const [reviews, setReviews] = React.useState(null)
  const [newReview, setNewReview] = React.useState() 
  //const [user, setUser] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

  const { formdata, setFormdata, handleChange } = useForm({
    text: ''
  })

  const { id } = useParams()
  const history = useHistory()

  const isLoggedIn = isAuthenticated()


  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSinglePie(id)
        setPie(data)
        if (data.comments) {
          setReviews(data.reviews)
        }
      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [id, newReview])


  const handleAddToBasket = async () => {
    try {
      await createBasketItem({
        quantity: 1,
        product: id
      })
      history.push('/basket/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddReview = async event => {
    event.preventDefault()
    try {
      await addReview(id, formdata)
      setNewReview({ id, formdata })
      setFormdata({ text: '' })
      console.log('Add Review')
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteReview = async event => {
    event.preventDefault()
    try {
      const reviewId = event.target.name
      await deleteReview(id, reviewId)
      setNewReview({ id, formdata })
      // setRefreshData(true)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(pie)
  return (
    <main className="show-page">
      {pie ?
        
        <section className="box">
          <h1>{pie.name}</h1>
          <h3>Now only £{pie.price}!</h3>
          <figure>
            <img src={pie.image} alt={pie.name} />
          </figure>
          <p>{pie.description}</p>
          {pie.categories && pie.categories.length > 0 ?
            <ul>
              {pie.categories.map(category => {
                return <li key={category.id}><Link 
                  to={`/pies/${category.name}`}>{category.name}
                </Link></li>
              })}
            </ul>
            :
            <ul></ul>
          }
          <button onClick={handleAddToBasket} className="blue-background checkout-btn">Add to shopping bag</button>
          <h2>What customers are saying about {pie.name}</h2>
          {/* {pie.reviews && pie.reviews.length > 0 ?
            <section>
              {pie.reviews.map(review => {
                return (
                  <div key={review.id} className="box">
                    <h5>{review.rating} ⭐️</h5>
                    <p>{review.text}</p>
                    <p>{review.createdAt.slice(0, 10)}</p>
                  </div>
                )
              })}
            </section> */}
          <div className="showpage-reviews-wrapper">
            <>
              <Comment.Group>
                <Header as='h3' dividing>
            Reviews
                </Header>
                {reviews ? reviews.map(review => (
                  <>
                    <Comment key={review.id} value={review.id}>
                      <Comment.Avatar
                        src={review.owner.profileImage} />
                      <Comment.Content>
                        <Comment.Author as='a'>{review.owner.name}</Comment.Author>
                        <Comment.Metadata>
                          <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>{review.text}</Comment.Text>
                        {isOwner(review.owner ? review.owner.id : '') &&
                    <Comment.Actions>
                      <Comment.Action onClick={handleDeleteReview} name={review.id}>Delete</Comment.Action>
                    </Comment.Actions>
                        }
                      </Comment.Content>
                    </Comment>
                  </>
                ))
                  :
                  <Comment>
                    <Comment.Avatar image="" />
                    <Comment.Content>
                      <Comment.Author as='a'>Caroline</Comment.Author>
                      <Comment.Metadata>
                        <div>Today at 2:30PM</div>
                      </Comment.Metadata>
                      <Comment.Text>So delicious!</Comment.Text>
                      <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                }
                {isLoggedIn && <Form reply>
                  <Form.TextArea
                    onChange={handleChange}
                    name="text"
                    value={formdata.text}
                    placeholder="Leave a review..." />
                  <Button
                    content='Add Reply'
                    position='right'
                    onClick={handleAddReview}
                    labelPosition='left' icon='edit' primary />
                </Form>
                }
              </Comment.Group>
            </>
          </div>
            :
          <section>
            <div>Be the first to review this delicious pie!</div>
          </section>
          
        </section>
        :
        <section>
          Loading...
        </section>
      } 
    </main>
  )
}
export default Show