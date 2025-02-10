import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const Users = () => {
    const [users, setUsers] = useState( [])

    useEffect( ()=>{
        const fetchAllUsers = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/users");
                setUsers(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchAllUsers()
    }, [])


  return (
    <div>
      <h1>All Users</h1>
      <div className="Users"> 
        {users.map(user=>(
            <div className="User" key={user.id}>
                { user.profilepicture && <img src={user.profilepicture} alt="" />}
                <h2>{user.username}</h2>
                <h3>{user.phone}</h3>
            </div>    
        ))}
      </div>
      <button>
        <Link to="/add">Add New User</Link>
      </button>
    </div>
  )
}

export default Users
