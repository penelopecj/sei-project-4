import React from 'react'
import { getSinglePie } from './lib/api'
import { useParams, Link } from 'react-router-dom'

function Show() {
  const [pie, setPie] = React.useState(null)  //const [hasError, setHasError] = React.useState(false)

  const { id } = useParams()


  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSinglePie(id)
        setPie(data)

      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [id])


  return (
    <main>
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
                return <li key={category.id}><Link to="/pies">{category.name}
                </Link></li>
              })}
            </ul>
            :
            <ul></ul>
          }
          <h2>What customers are saying about {pie.name}</h2>
          {pie.reviews && pie.reviews.length > 0 ?
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
            </section>
            :
            <section>
              <div>Be the first to review this delicious pie!</div>
            </section>
          }
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