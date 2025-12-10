import { ADD_PATIENT, DELETE_PATIENT, ADD_APPOINTMENT, DELETE_APPOINTMENT, ADD_DOCTOR, DELETE_DOCTOR } from './constants'
import { initialState } from './initialState';

export default function reducerfn(state= initialState, action) {
    switch(action.type){

            case ADD_PATIENT:
            const added = [...state.patients, action.payload];
            localStorage.setItem("patients", JSON.stringify(added));
            return{...state, patients:added };
      
            case DELETE_PATIENT:
            const filteredPatients= state.patients.filter((p)=> p.id !== action.payload);
            const filteredAppointmentsByPatient= state.appointments.filter((a)=> a.patientId !== action.payload);
            localStorage.setItem("patients", JSON.stringify(filteredPatients));
            localStorage.setItem("appointments", JSON.stringify(filteredAppointmentsByPatient))
            return {...state, patients: filteredPatients, appointments: filteredAppointmentsByPatient};
      
            case ADD_APPOINTMENT:
            const appointmentAdded= [...state.appointments, action.payload];
            localStorage.setItem("appointments", JSON.stringify(appointmentAdded));
            return{...state, appointments: appointmentAdded};
      
            case DELETE_APPOINTMENT:
            const appointmentFiltered= state.appointments.filter((a)=> a.id !== action.payload);
            localStorage.setItem("appointments", JSON.stringify(appointmentFiltered));
            return{...state, appointments: appointmentFiltered};
      
            case ADD_DOCTOR:
            const doctorAdded= [...state.doctors, action.payload]; 
            localStorage.setItem("doctors", JSON.stringify(doctorAdded));
            return{...state, doctors: doctorAdded};
      
            case DELETE_DOCTOR:
            const doctorFiltered= state.doctors.filter((d)=> d.id !== action.payload);
            localStorage.setItem("doctors", JSON.stringify(doctorFiltered));
            return{...state, doctors: doctorFiltered}
      
            default: return state;
    }
}
