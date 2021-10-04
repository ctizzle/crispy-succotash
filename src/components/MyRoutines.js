import React, {useState, useEffect} from 'react';
import './MyRoutines.css'

const PostRoutinesComponent = () => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [myRoutinesList, setMyRoutinesList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    // const [buttonText, setButtonText] = useState("Edit Routine")

    /*************************************
    *     For creating a new routine
    **************************************/

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
      .catch(() => {
          console.error
          alert('This routine name is already in use! Try a differnt name')  
        });
    }
    
    /*************************************
    *   For grabbing the users routines
    **************************************/
    
    const FetchRoutine = async function(name, goal) {
        const grabTokenFromLocal= localStorage.getItem('token');
        // console.log(grabTokenFromLocal)
        

      try {
        const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/users/me', {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${grabTokenFromLocal}`
            }
        })
        const {username} = await response.json()
        // console.log(username)
        const URL = `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`
        const routineResponse = await fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${grabTokenFromLocal}`
            }
        })
        const routines = await routineResponse.json()
        setMyRoutinesList(routines)

      } catch(error) {
        console.error
      }
    }

    useEffect(FetchRoutine, [])
    

    /*************************************
    *        For Updating Routine
    **************************************/

    const UpdateRoutine = async function (name, goal, routineId) {
        const grabTokenFromLocal= localStorage.getItem('token');
        try {
            const updateURL = `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`
            await fetch(updateURL, {
                method: "PATCH",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${grabTokenFromLocal}`
                },
                body: JSON.stringify({
                    name,
                    goal
                })   
            })
        } catch (error) {
            console.error
        }
    }

    /*************************************
    *         For Deleting Routine
    **************************************/
    
    const DeleteRoutine = async function(routineId) {
        const grabTokenFromLocal= localStorage.getItem('token');
        console.log(grabTokenFromLocal)

        try {
            const URL = `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`
            const deletedResponse = await fetch(URL, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${grabTokenFromLocal}`
                }
            })
            const deleted = await deletedResponse.json()
            if(deleted.success) {
                alert(`"${deleted.name}" has been successfully deleted"`)
            }
            
        } catch (error) {
            console.error
        }
    }

    /*************************************
    *           Helper Functions
    **************************************/

    const submitButton = async Event => {
        Event.preventDefault();
        console.log(name, goal);
        await PostRoutine(name, goal);
    }

    const updateButton = async Event => {
        if (confirm('Are you sure you want to update this routine?')) {
            Event.preventDefault();
            await UpdateRoutine(name, goal, Event.currentTarget.value);
            window.location.reload();
        }
    }

    const deleteButton = async Event => {
        if (confirm('Are you sure you want to delete this routine?')) {
            Event.preventDefault();
            await DeleteRoutine(Event.currentTarget.value);
            window.location.reload();
        }
    }
     
    const showFormAppear = () => {
        setShowForm(!showForm)
    }


    const routineElements = myRoutinesList.map((routine,i) => 
        <div key={`act-id-${i}`}>  
            <h2>Name: {routine.name} </h2>
            <p>Goal: {routine.goal} </p>
            <button value={routine.id} onClick={showFormAppear}>Edit Routine</button>
            { showForm && (
                <div>
                    <form>
                        <div>
                            <label>Name: </label>
                            <input type='text' 
                                name='routinename' 
                                value={name}
                                onChange={(event) => setName(event.currentTarget.value)} />
                        </div>
                        <div>
                            <label>Goal: </label>
                            <input type='text'
                                name='goal'
                                value={goal}
                                onChange={(event) => setGoal(event.currentTarget.value)} />
                        </div>
                        <div>
                            <button value={routine.id} onClick={updateButton}>Update</button>
                            <button onClick={showFormAppear}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <button value={routine.id} onClick={deleteButton}>Delete Routine</button>
        </div>);

    
    

    return (
        <div>
            <div className = "RoutineBox">
                <h2>Add New Routine</h2>
                <form onSubmit = {submitButton}>
                    <ul>
                        <li>Name: <input type = "text"  name = "name" id="name" value={name} onChange={(event) => setName(event.currentTarget.value) }></input></li>
                        <li>Goal: <input type = "text" name ="goal" id="goal" value={goal} onChange={(event) => setGoal(event.currentTarget.value) }></input></li>
                    </ul>
                <button>Add New Routine</button>
                </form>
            </div>
            <h1> My Routines </h1>
            {routineElements}
        </div>
    )
}

export default PostRoutinesComponent;