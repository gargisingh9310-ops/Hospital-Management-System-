import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import AppointmentForm from "./AppointmentForm";
import DoctorList from "./DoctorList";
import Billing from "./Billing";
import Inventory from "./Inventory";
import DoctorFrom from "./DoctorFrom";
import AppointmentList from "./AppointmentList";
import "../stylesheet/Dashboard.css";


export default function Dashboard({activeModule}) {
  if(activeModule ==="patients"){
    return( 
      <div className='dashboard'>
        <PatientForm/>
        <PatientList/>
      </div>
    );
  }
  if(activeModule === "appointments"){
    return(
      <div className='dashboard'>
        <AppointmentForm/>
        <AppointmentList/>
      </div>
    );
  }
  if(activeModule=== "doctors"){
    return(
      <div className='dashboard'>
         <DoctorFrom/>
        <DoctorList/>
      </div>
    );
  }
  if(activeModule=== "billing"){
    return(
      <div className='dashboard'>
        <Billing/>
      </div>
    );
  }
  else{
    return(
      <div className='dashboard'>
        <Inventory/>
      </div>
    );
  }
  }
