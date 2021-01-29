import React from 'react'
import { useParams } from 'react-router-dom'
import { isAuthenticated } from './lib/auth'
import { getSingleUser } from './lib/api'

function Wishlist() {
  const isLoggedIn = isAuthenticated()
  const [user, setUser] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

  const { id } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSingleUser(id)
        setUser(data)

      } catch (err) {
        console.log(err)
        //setHasError(true)
      }
    }
    getData()
  }, [id])

  console.log(user) 
  console.log(isLoggedIn) 

  return (
    <main>
      <h1>Wishlist</h1>
      <p>Your favourite items here</p>
    </main>
  )
}

export default Wishlist