import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_DOCTOR } from '../Redux/constants';
import "../stylesheet/DoctorForm.css"

export default function DoctorFrom() {
    const dispatch= useDispatch();
    const[form, setForm]= useState({
        name: "",
        specialty: "",
        phone: "",
        email: "",
        startTime: "09:00",
        endTime: "17:00"
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(form.startTime >= form.endTime){
            alert("End time must be after start time")
            return;
        }

        dispatch({
            type: ADD_DOCTOR,
            payload: {id: Date.now(), ...form}
        
    });
    setForm({
        name:"",
        specialty: "",
        phone: "",
        email: "",
        startTime: "9:00",
        endTime: "17:00",
    });
alert("Doctor added successfully")
}
    
  return (
    <form className='doctor-form' onSubmit={handleSubmit}>
        <h2>Add Doctor</h2>
    <div className='form-group'>
        <label htmlFor="">Doctor Name</label>
        <input type="text"
        placeholder='Doctor Name'
        value={form.name}
        onChange={(e)=> setForm({...form, name: e.target.value})}
        required
        />
    </div>

    <div className='form-group'>
        <label htmlFor="">specialty</label>
        <select name="" id="" 
        value={form.specialty}
        onChange={(e)=> setForm({...form, specialty: e.target.value})}
        required
        >
            <option value="">select specialty</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Oryhopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General">General</option>
        </select>
         </div>

        <div className='form-group'>
            <label htmlFor="">Phone</label>
            <input type="tel"
            placeholder='Phone Number'
            value={form.phone}
            onChange={(e)=> setForm({...form, phone: e.target.value})}
            required 
            />
        </div>

        <div className='form-group'>
            <label htmlFor="">Email</label>
            <input type="email"
            placeholder='Email'
            value={form.email}
            onChange={(e)=> setForm({...form, email: e.target.value})} 
            required
            />
        </div>

        <div className='form-group'>
            <label>Working hours Start</label>
            <input type="time" 
            value={form.startTime}
            onChange={(e)=> setForm({...form, startTime: e.target.value})}
            required/>
        </div>

        <div className='form-group'>
            <label >Working hour end</label>
            <input type="time" 
            value={form.endTime}
            onChange={(e)=> setForm({...form, endTime: e.target.value})} />
        </div>

        <button type='submit'>Add Doctor</button>
        

    </form>

  )

}
