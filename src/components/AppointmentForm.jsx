import React, { useState } from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { ADD_APPOINTMENT } from "../Redux/constants";
import { FiUser, FiCalendar, FiClock, FiFileText } from "react-icons/fi";
import "../stylesheet/Appointmentform.css";

export default function AppointmentForm() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const doctors = useSelector((state) => state.doctors);
  const appointments = useSelector((state) => state.appointments);

  const [popup, setPopup] = useState(null);   // ✅ POPUP STATE

  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  });

  const [error, setError] = useState("");

  const handlePatientChange = (e) => {
    const id = Number(e.target.value);
    const patient = patients.find((p) => p.id === id);
    setForm({ ...form, patientId: id, patientName: patient?.name || "" });
  };

  const handleDoctorChange = (e) => {
    const id = Number(e.target.value);
    const doctor = doctors.find((d) => d.id === id);
    setForm({ ...form, doctorId: id, doctorName: doctor?.name || "" });
    setError("");
  };

  const isSlotBooked = () =>
    appointments.some(
      (a) =>
        a.doctorId === form.doctorId &&
        a.date === form.date &&
        a.time === form.time
    );

  const isDoctorAvailable = () => {
    const doctor = doctors.find((d) => d.id === form.doctorId);
    if (!doctor) return false;
    return form.time >= doctor.startTime && form.time <= doctor.endTime;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.patientId) return setError("Select patient");
    if (!form.doctorId) return setError("Select doctor");
    if (!form.date || !form.time) return setError("Select date & time");

    if (!isDoctorAvailable()) {
      const doc = doctors.find((d) => d.id === form.doctorId);
      return setError(`Available: ${doc.startTime} - ${doc.endTime}`);
    }

    if (isSlotBooked()) {
      return setError("Slot already booked");
    }

    dispatch({
      type: ADD_APPOINTMENT,
      payload: { id: Date.now(), ...form },
    });

    setForm({
      patientId: "",
      patientName: "",
      doctorId: "",
      doctorName: "",
      date: "",
      time: "",
      reason: "",
    });

    setError("");

    // ✅ POPUP SUCCESS
    setPopup("Appointment booked successfully!");
  };

  return (
    <div className="appointment-wrapper">

      <form className="appointment-form" onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-grid">

          <div className="form-group">
            <label><FiUser /> Patient</label>
            <select value={form.patientId} onChange={handlePatientChange}>
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.age})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label><FiUser /> Doctor</label>
            <select value={form.doctorId} onChange={handleDoctorChange}>
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  Dr. {d.name} ({d.specialty})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label><FiCalendar /> Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label><FiClock /> Time</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group full">
          <label><FiFileText /> Reason</label>
          <textarea
            rows="3"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />
        </div>

        <button type="submit">Book Appointment</button>
      </form>

      {/* ✅ POPUP COMPONENT */}
      {popup && (
        <Popup
          message={popup}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}