import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../api/api';
import './MyRoutines.css'

const PostRoutinesComponent = () => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [myRoutinesList, setMyRoutinesList] = useState([]);

    // const history = useHistory();

    const PostRoutine = function(name, goal) {
        const grabTokenFromLocal= localStorage.getItem('token');
        console.log(grabTokenFromLocal)
  
      fetch('https://fitnesstrac-kr.herokuapp.com/api/routines', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${grabTokenFromLocal}`
        },
        body: JSON.stringify({
          
            name,
            goal,
            isPublic: true
          
        })
      }).then(response => response.json())
      .then(result => {
      console.log(result);
      })
      .catch(console.error);
    }
    

    const FetchRoutine = async function(name, goal) {
        const grabTokenFromLocal= localStorage.getItem('token');
        console.log(grabTokenFromLocal)
        

      try {
        const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/users/me', {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${grabTokenFromLocal}`
            }
        })
        const {username} = await response.json()
        console.log(username)
        const URL = `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`
        const routineResponse = await fetch(URL, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const routines = await routineResponse.json()
        setMyRoutinesList(routines)

      } catch(error) {
        console.error
      }
    }

    useEffect(FetchRoutine, [])
    
    const submitButton = async Event => {
        Event.preventDefault();
        console.log(name, goal);
        await PostRoutine(name, goal);
    }

    const routineElements = myRoutinesList.map((routine,i) => 
        <div key={`act-id-${i}`}>  
            <h2>Name: {routine.name} </h2>
            <p>Goal: {routine.goal} </p>
        </div>);
      console.log(routineElements)

    return (
        <div>
            <div className = "RoutineBox">
                <h2>Add New Routine</h2>
                <form onSubmit = {submitButton}>
                    <ul>
                        <li>Name: <input type = "text"  name = "name" id="name" value={name} onChange={(event) => setName(event.currentTarget.value) }></input></li>
                        <li>Goal: <input type = "text" name ="goal" id="goal" value={goal} onChange={(event) => setGoal(event.currentTarget.value) }></input></li>
                    </ul>
                {/* <input  type ="submit" value = "Add New Post" /> */}
                <button>Add New Routine</button>
                </form>
            </div>
            <h1> My Routines </h1>
            {routineElements}
        </div>
    )
}

export default PostRoutinesComponent;