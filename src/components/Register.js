import React, {useState, useEffect} from 'react';


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
            console.log(result.message)
            console.log(result.token);
            // (result.success)? alert("Registered successfully") :alert(" Already have an account")
            localStorage.setItem('token', result.token);
            setToken(result.token); 
          })
          .catch(error => {
            console.error;
            alert(error.message);
          });
    }

    const submitButton = async Event => {
        Event.preventDefault();
        console.log(name, password);
        await Register(name, password);
    }


    return (
        <div className="activity-form">
          
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