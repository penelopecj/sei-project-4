import React from 'react'
import { Link } from 'react-router-dom'
// import { isAuthenticated } from './lib/auth'
import { getSingleUser } from './lib/api'
// import { getPayload, getToken } from './lib/auth'
import defaultImage from '../images/defaultImage.jpg'

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
    <main className="profile-page">
      <h1 className="noto-sans">My Åccöunt</h1>
      {user ?
        <section className="box">
          <h2>Hello, {user.firstName} {user.lastName}!</h2>
          <figure>
            {user.profileImage ?
              <img src={user.profileImage} alt="profile image" />
              :
              <img src={defaultImage} alt="profile image" />
            }
          </figure>
          <h3>Your details are shown below:</h3>
          <h4>Username: {user.username}</h4>
          <h4>Email address: {user.email}</h4>
          <h4>Address: {user.address}</h4>
          <h4>Phone number: {user.phoneNumber}</h4>
        </section>
        :
        <div>
          <Link to="/register">Register </Link>
          or
          <Link to="/login"> Login </Link> to view your account details.
        </div>
      }
    </main>
  )
}

export default Profile