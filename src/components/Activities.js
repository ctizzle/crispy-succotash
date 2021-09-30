import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import api from '../api/api';

const ActivitiesComponent = ( ) => {
     const [activityList, setActivityList] = useState([]);
     useEffect( async function (){
        try{
            const data = await api.makeApiRequest('/activities', 'GET');
            setActivityList(data)
            console.log(data);
        }catch (error) {
          console.error(error);
        }},[activityList]);
        
        
        const activitiesElements = activityList.map((activity,i) => 
        <div key={`act-id-${i}`}>  
        <h1> ACTIVITIES </h1>
        <p> Name :{activity.name} </p>
        <p>description:{activity.description} </p>
        </div>);
      console.log(activitiesElements)
    return(
       <div className = 'activities-box'>
             {activitiesElements}
             <h1>We are in the Activities page!</h1>
           
       </div>
    )
}

export default ActivitiesComponent;

// {
//   routine.activities.map( activity => 
//       <>
//           <p>Activity Name: {activity.name}</p>
//           <ul>Activity Description: {activity.description}</ul>
//           <ul>Activity Duration: {activity.duration}</ul>
//           <ul>Activity Count: {activity.count}</ul>
//       </>
//   )
// } <== this was in our routine function for some reason