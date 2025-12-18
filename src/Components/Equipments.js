import React, { useEffect, useState } from 'react'
import './App.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Equipments = () => {

    const [equipment,setEquipments]=useState([]);

    const navigate=useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3001/api/equipment')
        .then(resp=>setEquipments(resp.data))
        .catch(err=>console.log(err));
    },[]);

    function handleDelete(id){
        axios.delete(`http://localhost:3001/api/deleteequipment/${id}`)
        .then(resp=>{
            console.log(resp);
            navigate("/api/equipment");
        })
        .catch(err=>console.log(err));
    }

  return (
    <div className='equipments'>
        <Link to={'/api/addequipment'}>Add Equipment</Link>
        <table>
             <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Last Cleaned Date</th>
                <th>Action</th>
            </tr>
                {equipment.map((e)=>(
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.type}</td>
                        <td>{e.status}</td>
                        <td>{e.lastcleandate}</td>
                        <div style={{border:"1px solid black",padding:"15px",display:"flex",justifyContent:"space-around"}}>
                            <Link to={`/api/updateequipment/${e.id}`}>Edit</Link>
                            <Link to={`/api/equipment/${e.id}`} onClick={()=>{handleDelete(e.id)}}>Delete</Link>
                        </div>
                    </tr>
                ))}
        </table>
    </div>
  )
}

export default Equipments