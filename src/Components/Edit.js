import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Edit = () => {

  const navigate=useNavigate();

  const { id } =useParams();


  const [equipment, setEquipment] = useState({
        name: "",
        type: "",
        status: "",
        lastcleandate: ""
    });

  useEffect(()=>{
    axios.get(`http://localhost:3001/api/equipment/${id}`)
    .then(resp=>{
      const data=resp.data;
      setEquipment({
        name:data.name,
        type:data.type,
        status:data.status,
        lastcleandate:data.lastcleandate
      })
    })
    .catch(err=>console.log(err));
  },[id])

    const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipment(prev => ({
     ...prev,
    [name]: value
    }));
    };


  function handleSubmit(e){
    e.preventDefault(); 
    axios.put(`http://localhost:3001/api/updateequipment/${id}`,equipment)
    .then(resp=>{
      alert("Equipment Updated Successfully");
      console.log(resp);
      navigate('/api/equipment')
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className='home-div '>
        <form className='form'>
            <label>Name:</label>
            <input type='text' placeholder='Equipment Name' className='input' value={equipment.name} onChange={handleChange}/><br></br>
             <label>Type:</label>
             <select  className='input' value={equipment.type} onChange={handleChange}>
                <option value="">--select--</option>
                <option value="machine">machine</option>
                <option value="vessel">vessel</option>
                <option value="tank">tank</option>
                <option value="mixer">mixer</option>
             </select><br></br>
             <label>Status:</label>
             <select  className='input' value={equipment.status} onChange={handleChange}>
                <option value="">--select--</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="under-maintenance">under-maintenance</option>
             </select><br></br>
             <label>Last Cleaned Date:</label>
             <input type='date' className='input' onChange={handleChange}/>
             <div className='btns'>
                <Link onClick={handleSubmit} style={{backgroundColor:"green",color:"white"}}>Update Equipment</Link>
                <Link to={"/api/equipment"} style={{backgroundColor:"blue",color:"white"}}>View Equipments</Link>
             </div>
        </form>
    </div>
  )
}

export default Edit