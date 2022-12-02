import React from 'react'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            {props.user ?
              <>
                <li>{props.user.firstName} {props.user.lastName}</li>
                <li><Link to="/signout">Sign Out</Link></li>
              </>
            :
              <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header