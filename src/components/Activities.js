import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import api from '../api/api';
import './routineactivity.css';

const ActivitiesComponent = ( ) => {
     const [activityList, setActivityList] = useState([]);
     useEffect( async function (){
        try{
            const data = await api.makeApiRequest('activities?limit=10', 'GET');
            console.log(data);
            setActivityList(data)  //the error is coming from here with the 'data' it says jwt is malformed
            
        }catch (error) {
          console.error(error);
        }},[activityList])
        
        
        const activitiesElements = activityList.map((activity,i) => 
        <div key={`act-id-${i}`}>  
        <h1> ACTIVITIES </h1>
        <h2> Name :{activity.name} </h2>
        <p>description:{activity.description} </p>
        </div>);
      console.log(activitiesElements)
    return(
       <div className = 'main-box'>
             {activitiesElements}
             <h1>We are in the Activities page!</h1>
           
       </div>
    )
}

export default ActivitiesComponent;