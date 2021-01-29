import React from 'react'
// import { isAuthenticated } from './lib/auth'
import { getSingleUser } from './lib/api'

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

  return (
    <main>
      <h1>Wish List</h1>
      <p>Manage your <u>Wish lists</u></p>
      {user ?
        <ul>
          {user.favourites.map(fav => {
            return (<li key={fav.id}>
              <img src={fav.image} alt={fav.name} />
              <h3>{fav.name}</h3>
              <p>£{fav.price}</p>
            </li>)
          })}
        </ul>
        :
        <p>Loading...</p>
      }
    </main>
  )
}

export default Wishlist