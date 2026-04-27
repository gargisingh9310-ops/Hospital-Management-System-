import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import AppointmentForm from "./AppointmentForm";
import DoctorList from "./DoctorList";
import DoctorForm from "./DoctorForm";
import AppointmentList from "./AppointmentList";
import MedicineForm from "./MedicineForm";
import MedicineList from "./MedicineList";
import PurchaseHistory from "./PurchaseHistory";
import MedicineShop from "./MedicineShop";
import "../stylesheet/Dashboard.css";

export default function Dashboard({ activeModule }) {
  const renderContent = () => {
    switch (activeModule) {
      case "patients":
        return (
          <>
            <div className="dashboard-card"><PatientForm /></div>
            <div className="dashboard-card"><PatientList /></div>
          </>
        );

      case "appointments":
        return (
          <>
            <div className="dashboard-card"><AppointmentForm /></div>
            <div className="dashboard-card"><AppointmentList /></div>
          </>
        );

      case "doctors":
        return (
          <>
            <div className="dashboard-card"><DoctorForm /></div>
            <div className="dashboard-card"><DoctorList /></div>
          </>
        );

      case "inventory":
        return (
          <>
            <div className="dashboard-card"><MedicineForm /></div>
            <div className="dashboard-card"><MedicineList /></div>
          </>
        );

      case "medicine-shop":
        return (
          <div className="dashboard-card full">
            <MedicineShop />
          </div>
        );

      case "purchase-history":
        return (
          <div className="dashboard-card full">
            <PurchaseHistory />
          </div>
        );

      default:
        return <p>Select a module</p>;
    }
  };

  return <div className="dashboard">{renderContent()}</div>;
}