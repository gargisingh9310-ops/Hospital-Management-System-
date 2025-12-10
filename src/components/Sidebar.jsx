import React from 'react'
import "../stylesheet/Sidebar.css"
export default function Sidebar({setActiveModule}) {
  return (
    <div className='sidebar'>
      <button onClick={()=> setActiveModule("patients")}>Patients</button>
      <button onClick={()=> setActiveModule("appointments")}>Appointments</button>
      <button onClick={()=> setActiveModule("doctors")}>Doctors</button>
      <button onClick={()=> setActiveModule("billing")}>Billing</button>
      <button onClick={()=> setActiveModule("inventory")}>Inventory</button>
    </div>
  )
}
