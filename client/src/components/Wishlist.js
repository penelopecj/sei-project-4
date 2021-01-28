import React from 'react'
// import { useParams } from 'react-router-dom'
import { getSingleUser } from './lib/api'

function Wishlist() {
  const [user, setUser] = React.useState(null)
  //const [hasError, setHasError] = React.useState(false)

  // const { id } = useParams()

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

  if (user) { 
    console.log(user) 
  }

  return (
    <main>
      <h1>Wishlist</h1>
      <p>Your favourite items here</p>
    </main>
  )
}

export default Wishlist