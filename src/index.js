import React , {useEffect, useState}from 'react';
import ReactDOM from 'react-dom';
import UsersComponent from './components/Users';
import RoutinesComponent from './components/Routines';
import ActivitiesComponent from './components/Activities';
import HomeComponent from './components/Home';
import Header from './components/Header';
import LoginComponent from './components/Login';
// import RegisterComponent from './components/Register'
import TokenUtilities from './api/token'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';


const App = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token)

  useEffect(function (){
    setIsLoggedIn(!!token);

  }, [token]);

  return (
    <div className="app">
            <div>
                <Router>
                  <Header/>
 <div id="app"></div>
                <main>
                    <Switch>
                        <Route path="/login"><LoginComponent setToken = {setToken}/></Route>
                        {/* <Route path="/register"><RegisterComponent setToken = {setToken}/></Route> */}
                        <Route path="/home"><HomeComponent/></Route>
                        <Route path="/users"><UsersComponent/></Route>
                        <Route path="/routines"><RoutinesComponent/></Route>
                        <Route path="/activities"><ActivitiesComponent/></Route>
                        {/* <Route path="/Logout"><LogoutComponent/></Route> */}
                    </Switch>
        
                </main>
                </Router>
            </div>
    </div>
  )
}

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById('app'),
);
export default App;