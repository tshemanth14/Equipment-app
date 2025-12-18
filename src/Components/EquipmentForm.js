import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import axios from 'axios';

const EquipmentForm = () => {

    const [name,setName]=useState("");
    const [type,setType]=useState("");
    const [status,setStatus]=useState("");
    const [lastcleandate,setLastCleandate]=useState("");

    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/api/addequipment',{
            name,type,status,lastcleandate
        })
        .then(resp=>{
            console.log(resp);
            alert("Added Succesfully");
            navigate("/api/equipment");
        })
        .catch(err=>console.log(err));
        setName("");
        setType("");
        setStatus("");
        setLastCleandate("");
    };

  return (
    <div className='home-div '>
        <form className='form'>
            <label>Name:</label>
            <input type='text' placeholder='Equipment Name' className='input' onChange={(e)=>setName(e.target.value)}/><br></br>
             <label>Type:</label>
             <select  className='input' onChange={(e)=>setType(e.target.value)}>
                <option value="">--select--</option>
                <option value="machine">machine</option>
                <option value="vessel">vessel</option>
                <option value="tank">tank</option>
                <option value="mixer">mixer</option>
             </select><br></br>
             <label>Type:</label>
             <select  className='input' onChange={(e)=>setStatus(e.target.value)}>
                <option value="">--select--</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="under-maintenance">under-maintenance</option>
             </select><br></br>
             <label>Last Cleaned Date:</label>
             <input type='date' className='input' onChange={(e)=>setLastCleandate(e.target.value)}/>
             <div className='btns'>
                <Link to={"/api/addequipment"} onClick={handleSubmit} style={{backgroundColor:"green",color:"white"}}>Add Equipment</Link>
                <Link to={"/api/equipment"} style={{backgroundColor:"blue",color:"white"}}>View Equipments</Link>
             </div>
        </form>
    </div>
  )
}

export default EquipmentForm