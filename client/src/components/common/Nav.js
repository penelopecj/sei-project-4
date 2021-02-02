import React from 'react'
import { Link } from 'react-router-dom'
// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
// import 'react-pro-sidebar/dist/css/styles.css'
import { slide as Menu } from 'react-burger-menu'




function Nav() {


  return (
    <nav>
      {/* <ProSidebar>
        <Menu iconShape="square">
          <MenuItem >Dashboard</MenuItem>
          <SubMenu title="Components" >
            <MenuItem>Category 1</MenuItem>
            <MenuItem>Category 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar> */}
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/category1">Category 1</a>
        <a id="contact" className="menu-item" href="/category2">Category 2</a>
      </Menu>
      <nav>
        <Link to="/">
          <div className="logo">
            <span>
              <p>PIEKEA</p>
              <small>®</small>
            </span>
          </div>
        </Link>
        <Link to="/pies">
          <p>All Pies</p>
        </Link>
        <Link to="/profile">
          <p>My Account</p>
        </Link>
        <Link to="/wishlist">
          <p>Wish List</p>
        </Link>
        <Link to="/basket">
          <p>Basket</p>
        </Link>
        <Link to="/register">
          <p>Register</p>
        </Link>
        <Link to="/login">
          <p>Login</p>
        </Link>
      </nav>
    </nav>
  )
}

export default Nav