
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../api/api';
import TokenUtilities from '../api/token'
import './loginboxes.css'

const LoginComponent = ({setToken}) => {
    
    let history = useHistory();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function Login (username, password) {
        fetch('https://fitnesstrac-kr.herokuapp.com/api/users/login', {
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
            localStorage.setItem('token', result.token);
            console.log(result.message);
            alert(result.message)
            
            setToken(result.token); 
            
          })
          .catch(error => {
            console.error;
            alert(error.message);
          })
          .finally(() => {
            history.push('/Home');
          });

        
    }

    const submitButton = async Event => {
        Event.preventDefault();
        console.log(name, password);
        await Login(name, password);
    }


    return (
        <div className="activity-form">
          <h1>Welcome to the Login Page!</h1>
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