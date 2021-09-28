import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';

const UsersComponent = ( ) => {

    const [userList, setUserList] = useState([]);
    useEffect( async function (){
        try{
          const response = await fetchData('?results=5')
          const data = await response.json();
          console.log(data);
        }catch (error) {
          console.error(error);
        }


    return(
        <div>
            <h1>We are in the Users page!</h1>
        </div>
    )
}
)}

export default UsersComponent;