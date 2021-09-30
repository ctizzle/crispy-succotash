import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import api from '../api/api';
import TokenUtilities from '../api/token'

const LoginComponent = ({setToken}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function Login (username, password) {
        fetch('https://fitnesstrac-kr.herokuapp.com/api/users/register', {
        method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            
            username,
            password
            
          })
        }).then(response => response.json())
          .then(result => {
            // console.log(result.password);
            console.log(result.token);
            localStorage.setItem('token', result.token);
            setToken(result.token); 
            //  history.push('/Profiles')// <== i changed this from 'Profile' to 'Profiles' just to get it to render on the first try since we havent added a welcome screen yet.use history.push('/')to go back to welcome page if we decide to put a welcome page
          })
          .catch(console.error);

        
    }

    const submitButton = async Event => {
        Event.preventDefault();
        console.log(name, password);
        await Login(name, password);
    }


    return (
        <div className="login">
            <form onSubmit={submitButton} >
                <input type='text'
                       required
                       name='username'
                       value={name}
                       onChange={(event) => setName(event.currentTarget.value) }
                       placeholder='username'/>
                <input type='password'
                        required
                        name='password'
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value) }
                        placeholder='password'/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default LoginComponent;