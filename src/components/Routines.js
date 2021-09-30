import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import api from '../api/api';

const RoutinesComponent = ( ) => {
    const [routineList, setRoutineList] = useState([]);
    useEffect( async function () {
        try {
            const data = await api.makeApiRequest('/routines', 'GET');
            setRoutineList(data);
        } catch (error) {
            console.error(error);
        }
}, [routineList])

    const routinesElement = routineList.map((routine, i) => 
        <div key={`rou-id-${i}`}>
            <h1> ROUTINES </h1>
            <p>Name: {routine.name}</p>
            <p>Goal: {routine.goal}</p>
            <p>Creator: {routine.creatorName}</p>      
        </div>
    )
    return(
        <div className = 'routines-box'>
            {routinesElement}
            <h1>We are in the Routines page!</h1>
        </div>
    )
}

export default RoutinesComponent;