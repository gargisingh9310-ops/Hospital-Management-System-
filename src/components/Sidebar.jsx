import React from "react";
import "../stylesheet/sidebar.css";

export default function Sidebar({
  setActiveModule,
  activeModule,
  sidebarOpen,
  setSidebarOpen,
}) {
  const handleClick = (module) => {
    setActiveModule(module);
    setSidebarOpen(false); // auto close on mobile
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <h2 className="logo"> HMS</h2>

      <button
        className={activeModule === "patients" ? "active" : ""}
        onClick={() => handleClick("patients")}
      >
        Patients
      </button>

      <button
        className={activeModule === "appointments" ? "active" : ""}
        onClick={() => handleClick("appointments")}
      >
        Appointments
      </button>

      <button
        className={activeModule === "doctors" ? "active" : ""}
        onClick={() => handleClick("doctors")}
      >
        Doctors
      </button>

      <button
        className={activeModule === "inventory" ? "active" : ""}
        onClick={() => handleClick("inventory")}
      >
        Inventory
      </button>

      <button
        className={activeModule === "medicine-shop" ? "active" : ""}
        onClick={() => handleClick("medicine-shop")}
      >
        Medicine Shop
      </button>

      <button
        className={activeModule === "purchase-history" ? "active" : ""}
        onClick={() => handleClick("purchase-history")}
      >
        History
      </button>
    </div>
  );
}