import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BILL, UPDATE_APPOINTMENT } from "../Redux/constants";
import { FiX, FiUser, FiFileText } from "react-icons/fi";
import "../stylesheet/BillGeneration.css";

export default function BillGeneration({ appointment, onClose }) {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);
  const doctors = useSelector((state) => state.doctors);
  const patients = useSelector((state) => state.patients);

  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [popup, setPopup] = useState(""); // ✅ custom popup

  const doctor = doctors.find((d) => d.id === appointment.doctorId);
  const patient = patients.find((p) => p.id === appointment.patientId);

  const handleMedicineSelect = (id) => {
    setSelectedMedicines((prev) =>
      prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = doctor?.fee || 0;

    selectedMedicines.forEach((id) => {
      const med = medicines.find((m) => m.id === id);
      if (med) total += Number(med.price);
    });

    return total;
  };

  const handleGenerateBill = () => {
    const billData = {
      id: Date.now(),
      appointmentId: appointment.id,
      patientName: patient?.name,
      patientId: appointment.patientId,
      doctorName: doctor?.name,
      doctorId: appointment.doctorId,
      doctorFee: doctor?.fee || 0,
      medicines: selectedMedicines.map((id) => {
        const m = medicines.find((x) => x.id === id);
        return { id: m.id, name: m.name, price: m.price };
      }),
      totalAmount: calculateTotal(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
    };

    dispatch({ type: ADD_BILL, payload: billData });

    dispatch({
      type: UPDATE_APPOINTMENT,
      payload: { ...appointment, visited: true },
    });

    // ✅ popup instead of alert
    setPopup("Bill generated successfully ✔");

    setTimeout(() => {
      setPopup("");
      onClose();
    }, 1200);
  };

  return (
    <div className="bill-overlay">

      {/* ✅ POPUP */}
      {popup && (
        <div className="custom-popup">
          {popup}
        </div>
      )}

      <div className="bill-modal">

        {/* HEADER */}
        <div className="bill-header">
          <h2>
            <FiFileText /> Generate Bill
          </h2>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* CONTENT */}
        <div className="bill-content">

          {/* INFO */}
          <div className="info-row">
            <div className="info-box">
              <FiUser />
              <span>{patient?.name}</span>
            </div>

            <div className="info-box">
              <FiUser />
              <span>Dr. {doctor?.name}</span>
            </div>
          </div>

          {/* FEE */}
          <div className="section">
            <h3>Consultation Fee</h3>
            <div className="fee">₹{doctor?.fee}</div>
          </div>

          {/* MEDICINES */}
          <div className="section">
            <h3>Select Medicines</h3>

            {medicines.length === 0 ? (
              <p className="empty">No medicines available</p>
            ) : (
              <div className="medicine-list">
                {medicines.map((m) => (
                  <label key={m.id} className="medicine-item">
                    <input
                      type="checkbox"
                      checked={selectedMedicines.includes(m.id)}
                      onChange={() => handleMedicineSelect(m.id)}
                    />
                    <span>{m.name}</span>
                    <span>₹{m.price}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* SUMMARY */}
          <div className="summary">
            <div className="row">
              <span>Doctor Fee</span>
              <span>₹{doctor?.fee}</span>
            </div>

            <div className="row total">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="actions">
            <button className="btn primary" onClick={handleGenerateBill}>
              Generate Bill
            </button>

            <button className="btn secondary" onClick={onClose}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}