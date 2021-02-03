import React from 'react'
// import { isAuthenticated } from './lib/auth'
import { getSingleUser } from './lib/api'
import { Link } from 'react-router-dom'

function Wishlist() {
  // const isLoggedIn = isAuthenticated()
  const [user, setUser] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

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

  console.log(user)

  return (
    <main>
      <h1 className="noto-sans">Wish List</h1>
      <p>Manage your <u>Wish lists</u></p>
      <section className="wishlist">
        {user ?
          <ul>
            {user.favourites.map(fav => {
              return (
                <li key={fav.id} className="box">
                  <Link to={`pies/${fav.id}`} className="flex-box space-between">
                    <figure>
                      <img src={fav.image} alt={fav.name} />
                    </figure>
                    <div>
                      <h3>{fav.name}</h3>
                      <h4>£{fav.price.toFixed(2)}</h4>
                      <p>{fav.description}</p>
                    </div>
                  </Link>
                  
                </li>
              )
            })}
          </ul>
          :
          <p>Loading...</p>
        }
      </section>
    </main>
  )
}

export default Wishlist