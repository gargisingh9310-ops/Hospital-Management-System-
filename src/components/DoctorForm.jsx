import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_DOCTOR } from "../Redux/constants";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import "../stylesheet/DoctorForm.css";

export default function DoctorForm() {
  const dispatch = useDispatch();

  const [popup, setPopup] = useState("");

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    startTime: "09:00",
    endTime: "17:00",
    fee: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.startTime >= form.endTime) {
      setPopup("❌ End time must be after start time");
      setTimeout(() => setPopup(""), 1500);
      return;
    }

    dispatch({
      type: ADD_DOCTOR,
      payload: { id: Date.now(), ...form },
    });

    setForm({
      name: "",
      specialty: "",
      phone: "",
      email: "",
      startTime: "09:00",
      endTime: "17:00",
      fee: "",
    });

    setPopup("✔ Doctor added successfully");

    setTimeout(() => setPopup(""), 1500);
  };

  return (
    <div className="doctor-wrapper">

      {/* POPUP */}
      {popup && <div className="custom-popup">{popup}</div>}

      <form className="doctor-form" onSubmit={handleSubmit}>
        <h2>Add Doctor</h2>

        <div className="form-grid">

          {/* NAME */}
          <div className="form-group">
            <label><FiUser /> Name</label>
            <input
              type="text"
              placeholder="Doctor Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </div>

          {/* SPECIALTY */}
          <div className="form-group">
            <label>Specialty</label>
            <select
              value={form.specialty}
              onChange={(e) =>
                setForm({ ...form, specialty: e.target.value })
              }
              required
            >
              <option value="">Select specialty</option>
              <option>Cardiology</option>
              <option>Dermatology</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
              <option>Pediatrics</option>
              <option>General</option>
            </select>
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label><FiPhone /> Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label><FiMail /> Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          {/* TIME */}
          <div className="form-group">
            <label><FiClock /> Start Time</label>
            <input
              type="time"
              value={form.startTime}
              onChange={(e) =>
                setForm({ ...form, startTime: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label><FiClock /> End Time</label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) =>
                setForm({ ...form, endTime: e.target.value })
              }
              required
            />
          </div>

        </div>

        {/* FEE */}
        <div className="form-group full">
          <label><FiDollarSign /> Fee</label>
          <input
            type="number"
            value={form.fee}
            onChange={(e) =>
              setForm({ ...form, fee: Number(e.target.value) })
            }
            min="0"
            required
          />
        </div>

        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
}