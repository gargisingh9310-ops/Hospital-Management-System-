import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPatient } from "../Redux/actions";
import { FiUser, FiHash, FiUsers } from "react-icons/fi";
import "../stylesheet/patientForm.css";

export default function PatientForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addPatient({ id: Date.now(), ...form }));

    setForm({
      name: "",
      age: "",
      gender: "",
    });
  };

  return (
    <div className="patient-wrapper">
      <form className="patient-form" onSubmit={handleSubmit}>
        <h2><FiUsers /> Add Patient</h2>

        <div className="form-grid">

          {/* NAME */}
          <div className="form-group">
            <label><FiUser /> Name</label>
            <input
              type="text"
              placeholder="Enter patient name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </div>

          {/* AGE */}
          <div className="form-group">
            <label><FiHash /> Age</label>
            <input
              type="number"
              placeholder="Enter age"
              value={form.age}
              onChange={(e) =>
                setForm({ ...form, age: e.target.value })
              }
              required
              min="0"
            />
          </div>

          {/* GENDER */}
          <div className="form-group full">
            <label>Gender</label>
            <select
              value={form.gender}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value })
              }
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

        </div>

        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}