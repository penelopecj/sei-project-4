import React from 'react'
// import { useParams } from 'react-router-dom'
// import { isAuthenticated } from './lib/auth'
import { getSingleUser } from './lib/api'
// import { getPayload, getToken } from './lib/auth'

function Profile() {

  // const isLoggedIn = isAuthenticated()
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


  return (
    <main>
      <h1>My Account</h1>
      {user ?
        <section className="box">
          <h2>Hello, {user.username}!</h2>
        </section>
        :
        <p>Loading...</p>
      }
    </main>
  )
}

export default Profile