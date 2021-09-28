import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
import api from '../api/api';

const UsersComponent = () => {

    // const [userList, setUserList] = useState([]);
    useEffect( async function (){
        try{
          const data = await api.makeApiRequest('/activities', 'GET');
          console.log(data);
        }catch (error) {
          console.error(error);
        }})

     return(
        <div>
            <h1>We are in the Users page!</h1>
        </div>
    );
}


export default UsersComponent