import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import useForm from '../../utils/useForm'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'
import { Button, Form } from 'semantic-ui-react'

function Login() {
  const history = useHistory()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)
      history.push('/spaces')
    } catch (err) {
      setError(true)
    }
  }



  const handleFocus = () => {
    setError(false)
  }

  return (
    <div className="ui container slide-in">
      
      <section className="login-form-container">
        <div className="container-for-login">
          <h1>Pie-Kea</h1>
       
          <div className="form-box ui form error">

            <Form
              onSubmit={handleSubmit}
              className="login-form">

              <Form.Field>
                <label>Email</label>
                <input
                  className="login-input"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formdata.email}
                  onFocus={handleFocus}
                />
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formdata.password}
                  onFocus={handleFocus}
                />
              </Form.Field>

              {error &&
          <div className="ui error message small">
            <div className="header">Incorrect Password or Email</div>
            <p>Sorry, your username or password are incorrect.</p>
          </div>
              }


              <div className="login-button">
                <Button type="submit">
            Log In
                </Button>
            
              </div>
              <p className="register-link">Dont have an account? Sign up <Link to="/register">here</Link></p>

            </Form>
          </div>
        </div>
      </section>
    </div>

  // <main>
  //   <h1>Login</h1>
  //   <form>
  //     <div>
  //       <label>Email</label>
  //     </div>
  //     <div>
  //       <input type="text" placeholder="Email"/>
  //     </div>
  //     <br />
  //     <div>
  //       <label>Password</label>
  //     </div>
  //     <div>
  //       <input type="password" placeholder="Password"/>
  //     </div>
  //   </form>
  // </main>
  )
}

export default Login