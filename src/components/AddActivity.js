import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../api/api';

const AddActivityComponent = () => {
    const defaultState = {name: '', description: ''};
    const [activity, setActivity] = useState(defaultState);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    let history = useHistory();

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
        history.push('/activities');
    }
    return (
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
    )
}

export default AddActivityComponent;