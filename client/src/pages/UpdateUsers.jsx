import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateUsers = () => {
    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        profilepicture:"",
    });

    const navigate = useNavigate()
    const location = useLocation()

    const userId = location.pathname.split("/")[2]

    const handleChange = (e) =>{
        setUser(Prev=>({...Prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/users/" + userId, user);
            navigate("/")
        }catch(err){
            console.log(err)
        }
        
    }

    console.log(user)
  return (
    <div className='form'>
      <h1>Update the User</h1>
      <input type="text" placeholder='username' onChange={handleChange} name="username"/>
      <input type="email" placeholder='email' onChange={handleChange} name="email"/>
      <input type="tel" placeholder='phone' onChange={handleChange} name="phone"/>
      <input type="text" placeholder='profilepicture' onChange={handleChange} name="profilepicture"/>

      <button className="formButton" onClick = {handleClick} >Update</button>
    </div>
  )
}

export default UpdateUsers
