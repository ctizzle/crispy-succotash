import React, {useState, useEffect} from 'react';
import api from '../api/api';
import './routineactivity.css';
import './MyRoutines'

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
            {
                routine.activities.map( activity => 
                    <>
                        <p>Activity Name: {activity.name}</p>
                        <ul>Activity Description: {activity.description}</ul>
                        <ul>Activity Duration: {activity.duration}</ul>
                        <ul>Activity Count: {activity.count}</ul>
                    </>
                )
            }
        </div>
    )
    return(
        <div className = 'main-box'>
            {routinesElement}
            <h1>We are in the Routines page!</h1>
        </div>
    )
}

export default RoutinesComponent;