import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import Basket from './components/Basket'
import Index from './components/Index'
import Show from './components/Show'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/basket" component={Basket} />
        <Route path="/pies" component={Index} />
        <Route path="/pies/:id" component={Show} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
