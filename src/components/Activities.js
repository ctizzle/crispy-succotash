import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import api from '../api/api';

const ActivitiesComponent = ( ) => {
     const [activityList, setActivityList] = useState([]);
     useEffect( async function (){
        try{
            const data = await api.makeApiRequest('/activities', 'GET');
          console.log(data);
        }catch (error) {
          console.error(error);
        }})
        
        
        const activitiesElements = activityList.map((activity,i) => 
        <div key={`act-id-${i}`}>  
        <h1> ACTIVITIES </h1>
        <p> Name :{activity.name} </p>
        <p>description:{activity.description} </p>
        </div>);

    return(
       <div className = 'activities-box'>
             <h1>We are in the Activities page!</h1>
             {activitiesElements}
       </div>
    )
}

export default ActivitiesComponent;