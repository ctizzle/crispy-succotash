import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

const Header = ({isLoggedIn, setToken}) => {
  function handleLogout (event) {
    event.preventDefault();
    localStorage.removeItem('token')
    setToken(null);
  }
    return (
        <div className = 'header'>
     <header>
    <h1>Fitness track.r</h1>
    </header>
    <nav className ='navigation'>
    <ul>
              <Link to= {"/Routines"}> My Routines </Link>
              <Link to= {"/Routines"}> Routines </Link>
              <Link to={"/Home"}> Home </Link>
              <Link to= {"/Activities"}> Activities </Link>
              <Link to={"/Login"}> Login </Link>
    </ul>
    </nav>
        </div>
  
  )
}

export default Header;