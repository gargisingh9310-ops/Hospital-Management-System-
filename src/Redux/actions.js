import {ADD_PATIENT, DELETE_PATIENT} from "./constants"

export const addPatient= (patient)=>{
    return{
type: ADD_PATIENT,
payload: patient,
}};

export const deletePatient= (id)=>{
    return{
    type: DELETE_PATIENT,
    payload: id,
}};