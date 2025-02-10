import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddUsers = () => {
    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        profilepicture:"",
    });

    const navigate = useNavigate()
    const handleChange = (e) =>{
        setUser(Prev=>({...Prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/users", user);
            navigate("/")
        }catch(err){
            console.log(err)
        }
        
    }

    console.log(user)
  return (
    <div className='form'>
      <h1>Add new User</h1>
      <input type="text" placeholder='username' onChange={handleChange} name="username"/>
      <input type="email" placeholder='email' onChange={handleChange} name="email"/>
      <input type="tel" placeholder='phone' onChange={handleChange} name="phone"/>
      <input type="text" placeholder='profilepicture' onChange={handleChange} name="profilepicture"/>

      <button onClick = {handleClick} >Add</button>
    </div>
  )
}

export default AddUsers
