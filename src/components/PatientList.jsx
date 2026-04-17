import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {DELETE_PATIENT} from '../Redux/constants'
import '../stylesheet/patientList.css'

export default function PatientList() {
  const dispatch= useDispatch()
  const patients= useSelector((state) => state.patients)

  const handleDelete= (id)=>{
    dispatch({type: DELETE_PATIENT, payload: id})
  }

  return (
    <div className='patient-list'>
      <h2>Patients List</h2>
      {patients.length === 0? (
        <p>No patient added yet</p>
      ): (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patients)=>(
              <tr key={patients.id}>
                <td>{patients.id}</td>
                <td>{patients.name}</td>
                <td>{patients.age}</td>
                <td>{patients.gender}</td>
                <td>
                  <button className='delete-btn' onClick={()=> handleDelete(patients.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
