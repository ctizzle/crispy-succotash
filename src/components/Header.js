import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Header.css'

const Header = ({isLoggedIn, setToken}) => {
  let history = useHistory();

  function handleLogout (event) {
    event.preventDefault();
    localStorage.removeItem('token')
    setToken(null);
    history.push('/Home')
  }
    return (
        <div className = 'header'>
          <header>
            <h1>Fitness track.r</h1>
          </header>
         { 
            isLoggedIn ?
           <nav className ='navigation'>
              <ul>
                  <Link to= {"/MyRoutines"}> My Routines </Link>
                  <Link to= {"/Routines"}> Routines </Link>
                  <Link to={"/"}> Home </Link>
                  <Link to= {"/Activities"}> Activities </Link>
                  <button className='logout' onClick={handleLogout}>Logout</button>
              </ul>
            </nav> :
             <nav className ='navigation'>
             <ul>
                 <Link to= {"/Routines"}> Routines </Link>
                 <Link to={"/"}> Home </Link>
                 <Link to= {"/Activities"}> Activities </Link>
                 <Link to={"/Login"}> Login </Link>
                 <Link to={"/Register"}> Register </Link>
             </ul>
           </nav>
         }
        </div>
  
  )
}

export default Header;