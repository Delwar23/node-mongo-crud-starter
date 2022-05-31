import React from 'react';
import { useRef } from 'react'

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleAddUser = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const newUser = { name: name, email: email };


        fetch('http://localhost:5000/users',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)

            })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('successfully added user')
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    return (
        <div>
            <h2>Please Add an User</h2>

            <form onSubmit={handleAddUser}>
                <input placeholder='Name' type='text' ref={nameRef}></input>
                <input placeholder='Email' type='email' ref={emailRef}></input>
                <input type='submit' value='Add User'></input>

            </form>
        </div>
    );
};

export default AddUser;