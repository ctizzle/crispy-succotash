import React from 'react';
import ReactDOM from 'react-dom';
import UsersComponent from './components/Users';
import RoutinesComponent from './components/Routines';
import ActivitiesComponent from './components/Activities';
import HomeComponent from './components/Home';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';


const App = (props) => {
  return (
    <div className="app">
            <div>
                <Router>
                {/* <Header/>  */}
                <main>
                    <Switch>
                        {/* <Route exact path="/"><LoginComponent setToken={setToken}/></Route> */}
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