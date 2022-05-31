import React from 'react';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';


const UpdateUser = () => {
    const [user, setUser] = useState({})
    const { id } = useParams()
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id]);


    //update change
    const handleNameChange = e => {
        const updateName = e.target.value;
        const updateUser = { name: updateName, email: user.email }
        setUser(updateUser)
    }

    const handleEmailChange = e => {
        const updateEmail = e.target.value;
        const updateUser = { name: user.name, email: updateEmail }
        setUser(updateUser)
    }

    const handleUpdateUser = e => {
        const url = `http://localhost:5000/users/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }) 
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount){
                    alert('Modify Successfully')
                    setUser({})
                }
            });

        e.preventDefault()
    }
    return (
        <div>
            <h2>Update user: {user.name} {user.email}</h2>

            <h3>Id : {id} </h3>

            <form onSubmit={handleUpdateUser}>
                <input onChange={handleNameChange} value={user.name || ''} type='text'></input>
                <input onChange={handleEmailChange} type='email' value={user.email || ''}></input>
                <input type='submit' value='Update'></input>

            </form>

        </div>
    );
};

export default UpdateUser;