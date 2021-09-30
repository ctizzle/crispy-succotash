import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import api from '../api/api';
import token from '../api/token';


const RegisterComponent = ({setToken}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function Register (username, password) {
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
            // (result.success)? alert("Registered successfully") :alert(" Already have an account")
            localStorage.setItem('token', result.token);
            console.log(token)
            setToken(result.token); 
          })
          .catch(console.error);
    }

    const submitButton = async Event => {
        Event.preventDefault();
        console.log(name, password);
        await Register(name, password);
    }


    return (
        <div className="register">
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

export default RegisterComponent;