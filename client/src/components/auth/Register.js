import React from 'react'
import useForm from '../../utils/useForm'
import { registerUser } from '../lib/api'
import { useHistory , Link } from 'react-router-dom'
import { Button, Form, Divider } from 'semantic-ui-react'

function Register() {

  const history = useHistory()
  const { formdata, errors, handleChange, setErrors } = useForm({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      console.log(formdata)
      await registerUser(formdata)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  return (
    <main className="narrow-page box">
      <div className="ui container fly-in">
        <section className={`register-form-container ${errors ? 'register-error-form-container ' : ''}`}>
          <h1 className="noto-sans">Sign Up</h1>
          <div className="form-box ui form error">
            <Form
              onSubmit={handleSubmit}>


              <Divider />

              <Form.Field>
                <label>Username</label>
                <input
                  placeholder="Username"
                  onChange={handleChange}
                  name="username"
                  value={formdata.username}
                />
              </Form.Field>


              {errors && errors.username &&
                <div className="ui error message small">
                  <p>Username is Required</p>
                </div>
              }

              <Form.Group className="name-errors">
                <Form.Field>
                  <label>First Name</label>
                  <input
                    placeholder="First Name"
                    onChange={handleChange}
                    name="firstName"
                    value={formdata.firstName}
                  />
                </Form.Field>


                <Form.Field>
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    onChange={handleChange}
                    name="lastName"
                    value={formdata.lastName}
                  />
                </Form.Field>

              </Form.Group>

              <div className="name-errors-form">

                <div className="first-name">
                  {errors && errors.firstName &&
                    <div className="ui error message small">
                      <p>First Name is Required</p>
                    </div>
                  }
                </div>


                <div className="last-name">
                  {errors && errors.lastName &&
                    <div className="ui error message small">
                      <p>Last Name is Required</p>
                    </div>
                  }
                </div>
              </div>

              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formdata.email}
                />
              </Form.Field>



              {errors && errors.email &&
                <div className="ui error message small">
                  <p>Email is Required</p>
                </div>
              }

              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formdata.password}
                />
              </Form.Field>



              {errors && errors.password &&
                <div className="ui error message small">
                  <p>Password is Required</p>
                </div>
              }

              <Form.Field>
                <label>Password Confirmation</label>
                <input
                  type="password"
                  placeholder="Password Confirmation"
                  onChange={handleChange}
                  name="passwordConfirmation"
                  value={formdata.passwordConfirmation}
                />
              </Form.Field>



              {errors && errors.passWordConfirmation &&
                <div className="ui error message small">
                  <p>The Password doesnt match</p>
                </div>
              }



              <div className="sign-up-button">
                <Button type="submit">
                  Sign Up
                </Button>
              </div>
              <p className="register-link">Already have an account? Login <Link to="/login">here</Link></p>
            </Form>
          </div>
        </section>
      </div>
    </main>
    
  

  // <main>
  //   <h1>Register a New Account</h1>
  //   <form>
  //     <div>
  //       <label>Username</label>
  //     </div>
  //     <div>
  //       <input type="text" placeholder="Username"/>
  //     </div>
  //     <br />
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
  //     <br />
  //     <div>
  //       <label>Password Confirmation</label>
  //     </div>
  //     <div>
  //       <input type="password" placeholder="Password Confirmation"/>
  //     </div>
  //     <br />
  //   </form>
  // </main>
  )
}

export default Register