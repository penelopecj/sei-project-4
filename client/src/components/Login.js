import React from 'react'

function Login() {
  return (
    <main>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email</label>
        </div>
        <div>
          <input type="text" placeholder="Email"/>
        </div>
        <br />
        <div>
          <label>Password</label>
        </div>
        <div>
          <input type="password" placeholder="Password"/>
        </div>
      </form>
    </main>
  )
}

export default Login