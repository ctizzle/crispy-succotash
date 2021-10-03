import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import api from '../api/api';
import './routineactivity.css';
import './loginboxes.css'

const ActivitiesComponent = ( ) => {
     const [activityList, setActivityList] = useState([]);
     const defaultState = {name: '', description: ''};
     const [activity, setActivity] = useState(defaultState);
     const [name, setName] = useState('');
     const [description, setDescription] = useState('');
     useEffect( async function (){
        try{
            const data = await api.makeApiRequest('activities?limit=10', 'GET');
            console.log(data);
            setActivityList(data) 
            
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
      
    function handleChange(e, stateKey) {
      if(stateKey === 'name') {
          setName(e.target.value);
      } else if (stateKey === 'description') {
          setDescription(e.target.value);
      }
      const newState = {...activity};
      let value = e.target.value;
      newState[stateKey] = value;
      setActivity(newState);
      console.log(activity);
  }

  async function onSubmit(e) {
      e.preventDefault();
      await api.makeApiRequest('/activities', 'POST', activity);
      history.push;
      if(!'authorization'){
          alert('you have to be logged in to post!')
      }
  }
  return (<div>
      <div className="activity-form">
          <form onSubmit={onSubmit}>
              <div>
                  <label>Activity Name:</label>
                  <input onChange={e => handleChange(e, 'name')} value={activity.name} type="text" />
              </div>
              <div>
                  <label>Activity Description:</label>
                  <input onChange={e => handleChange(e, 'description')} value={activity.description} type="text" />
              </div>
              <div>
                  <button>Submit</button>
              </div>
          </form>
          </div>
          <div className = 'main-box'>
             {activitiesElements}
             <h1>We are in the Activities page!</h1>
       </div>
      
      </div>
  )
}

export default ActivitiesComponent;
