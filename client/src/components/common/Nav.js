import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { isAuthenticated, logout } from '../lib/auth'
// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
// import 'react-pro-sidebar/dist/css/styles.css'
// import { slide as Menu } from 'react-burger-menu'




function Nav() {
  useLocation()
  const isLoggedIn = isAuthenticated()
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/') // logs out & returns user to homepage
  }

  return (
    // <nav>
    //   {/* <ProSidebar>
    //     <Menu iconShape="square">
    //       <MenuItem >Dashboard</MenuItem>
    //       <SubMenu title="Components" >
    //         <MenuItem>Category 1</MenuItem>
    //         <MenuItem>Category 2</MenuItem>
    //       </SubMenu>
    //     </Menu>
    //   </ProSidebar> */}
    //   {/* <Menu>
    //     <a id="home" className="menu-item" href="/">Home</a>
    //     <a id="about" className="menu-item" href="/category1">Category 1</a>
    //     <a id="contact" className="menu-item" href="/category2">Category 2</a>
    //   </Menu> */}
    // </nav>
    <nav>
      <Link to="/">
        <div className="logo">
          <span>
            <p>PIEKEA</p>
            <small>®</small>
          </span>
        </div>
      </Link>
      <section>
        <Link to="/pies">
          {/* <p>All Pies</p> */}
          <span className="material-icons">
            home_mini
          </span>
        </Link>
        <Link to="/profile">
          {/* <p>My Account</p> */}
          <span className="material-icons">
            person_outline
          </span>
        </Link>
        <Link to="/wishlist">
          {/* <p>Wish List</p> */}
          <span className="material-icons">
            favorite_border
          </span>
        </Link>
        <Link to="/basket">
          {/* <p>Basket</p> */}
          <span className="material-icons">
            work_outline
          </span>
        </Link>
        {!isLoggedIn ? 
          <div className="flex-box">
            <Link to="/register">
              <p className="black-outline">Register</p>
            </Link>
            <Link to="/login">
              <p className="black-outline">Login</p>
            </Link>
          </div>
          :
          <div className="flex-box">
            <Link>
              <p className="black-outline" onClick={handleLogout}>Logout</p>
            </Link>
          </div>
        }
      </section>
    </nav>
  )
}

export default Nav