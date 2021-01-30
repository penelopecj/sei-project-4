import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import Profile from './components/Profile'
import Wishlist from './components/Wishlist'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Basket from './components/Basket'
import Index from './components/Index'
import Show from './components/Show'
import PieCategories from './components/PieCategories'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/pies/category/:category" component={PieCategories} />
        <Route path="/pies/:id" component={Show} />
        <Route path="/profile" component={Profile} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/basket" component={Basket} />
        <Route path="/pies" component={Index} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
